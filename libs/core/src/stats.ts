import { PGlite } from '@electric-sql/pglite';

export interface StatsPayload {
  productsUploaded: number;
  variantsCreated: number;
  lastRunAt: string | null;
}

export function buildStatsPayload(input: StatsPayload): StatsPayload {
  return input;
}

export async function loadStatsPayload(dbPath: string): Promise<StatsPayload> {
  const pglite = new PGlite(`file://${dbPath}`);
  try {
    const res = await pglite.query(`
      SELECT
        (SELECT COUNT(*) FROM products) AS "productsUploaded",
        (SELECT COUNT(*) FROM variant_state) AS "variantsCreated",
        (
          SELECT MAX(createdAt)
          FROM (
            SELECT createdAt FROM products
            UNION ALL
            SELECT createdAt FROM variant_state
          ) t
        ) AS "lastRunAt"
    `);

    const row = res.rows[0] as any;

    return buildStatsPayload({
      productsUploaded: Number(row?.productsUploaded ?? 0),
      variantsCreated: Number(row?.variantsCreated ?? 0),
      lastRunAt: row?.lastRunAt ?? null,
    });
  } catch (error: any) {
    if (error.message?.includes('relation "products" does not exist')) {
        // Table doesn't exist yet, return empty stats
        return buildStatsPayload({
            productsUploaded: 0,
            variantsCreated: 0,
            lastRunAt: null,
        });
    }
    throw error;
  } finally {
    await pglite.close();
  }
}
