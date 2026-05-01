import { PGlite } from '@electric-sql/pglite';
import path from 'path';
import fs from 'fs';
import { logger } from './Logger';

export interface ProductRecord {
  id?: number;
  productId: number;
  title: string;
  model: string | null;
  sourceFile: string | null;
  createdAt: string;
}

export interface VariantStateRecord {
  id?: number;
  fingerprint: string;
  productId: number;
  variantId: number;
  createdAt: string;
}

export class Database {
  private db: PGlite;

  private constructor(db: PGlite) {
    this.db = db;
  }

  static async create(dbPath: string): Promise<Database> {
    const dir = path.dirname(dbPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const db = new PGlite(dbPath);
    const instance = new Database(db);
    await instance.initSchema();
    return instance;
  }

  private async initSchema() {
    await this.db.exec(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        productId INTEGER NOT NULL UNIQUE,
        title TEXT NOT NULL,
        model TEXT,
        sourceFile TEXT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS variant_state (
        id SERIAL PRIMARY KEY,
        fingerprint TEXT NOT NULL UNIQUE,
        productId INTEGER NOT NULL,
        variantId INTEGER NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    logger.debug('Database schema initialized');
  }

  // --- Products API ---

  async addProduct(productId: number, title: string, model: string | null = null, sourceFile: string | null = null): Promise<number> {
    const res = await this.db.query<{ id: number }>(
      `INSERT INTO products (productId, title, model, sourceFile) 
       VALUES ($1, $2, $3, $4)
       ON CONFLICT(productId) DO UPDATE SET 
         title=EXCLUDED.title, 
         model=EXCLUDED.model, 
         sourceFile=EXCLUDED.sourceFile
       RETURNING id`,
      [productId, title, model, sourceFile]
    );
    return res.rows[0].id;
  }

  async getProduct(productId: number): Promise<ProductRecord | undefined> {
    const res = await this.db.query('SELECT * FROM products WHERE productId = $1', [productId]);
    return res.rows[0] as ProductRecord | undefined;
  }

  async getAllProducts(): Promise<ProductRecord[]> {
    const res = await this.db.query('SELECT * FROM products ORDER BY createdAt DESC');
    return res.rows as ProductRecord[];
  }

  // --- Variant State API (Idempotency) ---

  /** Fingerprint format: \`${productId}|${themeValueId}|${price}|${warranty_id}|${site}\` */
  async addVariantState(fingerprint: string, productId: number, variantId: number): Promise<number | undefined> {
    const res = await this.db.query<{ id: number }>(
      `INSERT INTO variant_state (fingerprint, productId, variantId) 
       VALUES ($1, $2, $3)
       ON CONFLICT(fingerprint) DO NOTHING
       RETURNING id`,
      [fingerprint, productId, variantId]
    );
    return res.rows[0]?.id ?? undefined;
  }

  async getVariantState(fingerprint: string): Promise<VariantStateRecord | undefined> {
    const res = await this.db.query('SELECT * FROM variant_state WHERE fingerprint = $1', [fingerprint]);
    return res.rows[0] as VariantStateRecord | undefined;
  }

  async hasVariantState(fingerprint: string): Promise<boolean> {
    const res = await this.db.query('SELECT 1 FROM variant_state WHERE fingerprint = $1', [fingerprint]);
    return res.rows.length > 0;
  }

  async close() {
    await this.db.close();
  }
}
