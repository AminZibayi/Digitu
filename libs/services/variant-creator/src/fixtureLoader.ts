import fs from 'fs';
import path from 'path';

export function listFixtures(fixturesDir: string): string[] {
  if (!fs.existsSync(fixturesDir)) return [];
  return fs.readdirSync(fixturesDir)
    .filter(f => f.endsWith('.json'))
    .map(f => f.replace(/\.json$/, '').replace(/\.products$/, ''));
}

export function loadFixture(fixturesDir: string, name: string): any[] {
  const p1 = path.join(fixturesDir, `${name}.products.json`);
  const p2 = path.join(fixturesDir, `${name}.json`);
  
  if (fs.existsSync(p1)) return JSON.parse(fs.readFileSync(p1, 'utf-8'));
  if (fs.existsSync(p2)) return JSON.parse(fs.readFileSync(p2, 'utf-8'));
  throw new Error(`Fixture ${name} not found`);
}

export function saveFixture(fixturesDir: string, name: string, content: any[]) {
  if (!fs.existsSync(fixturesDir)) fs.mkdirSync(fixturesDir, { recursive: true });
  fs.writeFileSync(path.join(fixturesDir, `${name}.json`), JSON.stringify(content, null, 2));
}

export function deleteFixture(fixturesDir: string, name: string) {
  const p1 = path.join(fixturesDir, `${name}.products.json`);
  const p2 = path.join(fixturesDir, `${name}.json`);
  if (fs.existsSync(p1)) fs.unlinkSync(p1);
  if (fs.existsSync(p2)) fs.unlinkSync(p2);
}

export function parseCSVToFixture(csvData: string): any[] {
  const lines = csvData.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  const productIdIdx = headers.indexOf('productId');
  const productTitleIdx = headers.indexOf('productTitle');
  
  if (productIdIdx === -1 || productTitleIdx === -1) {
    throw new Error('CSV must contain productId and productTitle columns');
  }

  return lines.slice(1).map(line => {
    const cols = line.split(',');
    return {
      productId: parseInt(cols[productIdIdx].trim(), 10),
      productTitle: cols[productTitleIdx].trim()
    };
  }).filter(item => !isNaN(item.productId));
}