import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

export function getMasterKey(dataDir: string): string {
  const keyPath = path.join(dataDir, '.master-key');

  if (fs.existsSync(keyPath)) {
    return fs.readFileSync(keyPath, 'utf-8').trim();
  }

  const secret = crypto.randomBytes(32).toString('hex');

  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  fs.writeFileSync(keyPath, secret, 'utf-8');
  return secret;
}