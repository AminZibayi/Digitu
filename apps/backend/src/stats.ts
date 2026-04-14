const DatabaseConstructor = require('better-sqlite3');

export interface StatsPayload {
  productsUploaded: number;
  variantsCreated: number;
  lastRunAt: string | null;
}

interface StatsRow {
  productsUploaded: number;
  variantsCreated: number;
  lastRunAt: string | null;
}

export function buildStatsPayload(input: { productsUploaded: number; variantsCreated: number; lastRunAt: string | null }) {
  return input;
}

export function loadStatsPayload(dbPath: string): StatsPayload {
  const sqlite = new DatabaseConstructor(dbPath, { readonly: true });
  try {
    const row = sqlite.prepare(`
      SELECT
        (SELECT COUNT(*) FROM products) AS productsUploaded,
        (SELECT COUNT(*) FROM variant_state) AS variantsCreated,
        (
          SELECT MAX(createdAt)
          FROM (
            SELECT createdAt FROM products
            UNION ALL
            SELECT createdAt FROM variant_state
          )
        ) AS lastRunAt
    `).get() as StatsRow | undefined;

    return buildStatsPayload({
      productsUploaded: Number(row?.productsUploaded ?? 0),
      variantsCreated: Number(row?.variantsCreated ?? 0),
      lastRunAt: row?.lastRunAt ?? null,
    });
  } finally {
    sqlite.close();
  }
}
