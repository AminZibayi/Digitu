import DatabaseConstructor, { Database as SQLiteDatabase } from 'better-sqlite3';
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
  private db: SQLiteDatabase;

  constructor(dbPath: string) {
    const dir = path.dirname(dbPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    this.db = new DatabaseConstructor(dbPath);
    this.initSchema();
  }

  private initSchema() {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        productId INTEGER NOT NULL UNIQUE,
        title TEXT NOT NULL,
        model TEXT,
        sourceFile TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS variant_state (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fingerprint TEXT NOT NULL UNIQUE,
        productId INTEGER NOT NULL,
        variantId INTEGER NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);
    logger.debug('Database schema initialized');
  }

  // --- Products API ---

  addProduct(productId: number, title: string, model: string | null = null, sourceFile: string | null = null): number {
    const stmt = this.db.prepare(`
      INSERT INTO products (productId, title, model, sourceFile) 
      VALUES (?, ?, ?, ?)
      ON CONFLICT(productId) DO UPDATE SET 
        title=excluded.title, 
        model=excluded.model, 
        sourceFile=excluded.sourceFile
    `);
    const info = stmt.run(productId, title, model, sourceFile);
    return info.lastInsertRowid as number;
  }

  getProduct(productId: number): ProductRecord | undefined {
    const stmt = this.db.prepare('SELECT * FROM products WHERE productId = ?');
    return stmt.get(productId) as ProductRecord | undefined;
  }

  getAllProducts(): ProductRecord[] {
    const stmt = this.db.prepare('SELECT * FROM products ORDER BY createdAt DESC');
    return stmt.all() as ProductRecord[];
  }

  // --- Variant State API (Idempotency) ---

  /** Fingerprint format: `${productId}|${themeValueId}|${price}|${warranty_id}|${site}` */
  addVariantState(fingerprint: string, productId: number, variantId: number): number {
    const stmt = this.db.prepare(`
      INSERT INTO variant_state (fingerprint, productId, variantId) 
      VALUES (?, ?, ?)
      ON CONFLICT(fingerprint) DO NOTHING
    `);
    const info = stmt.run(fingerprint, productId, variantId);
    return info.lastInsertRowid as number;
  }

  getVariantState(fingerprint: string): VariantStateRecord | undefined {
    const stmt = this.db.prepare('SELECT * FROM variant_state WHERE fingerprint = ?');
    return stmt.get(fingerprint) as VariantStateRecord | undefined;
  }

  hasVariantState(fingerprint: string): boolean {
    const stmt = this.db.prepare('SELECT 1 FROM variant_state WHERE fingerprint = ?');
    return stmt.get(fingerprint) !== undefined;
  }

  close() {
    this.db.close();
  }
}
