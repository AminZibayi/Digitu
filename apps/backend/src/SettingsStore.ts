import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { DigikalaSettings, DigikalaSettingsInput, normalizeDigikalaSettings } from '@digikala/core';

interface StoredSettingsPayload {
  version: 1;
  iv: string;
  tag: string;
  data: string;
}

export class SettingsStore {
  constructor(
    private filePath: string,
    private secret: string,
  ) {}

  public load(): DigikalaSettings | null {
    if (!fs.existsSync(this.filePath)) {
      return null;
    }
    const payload = JSON.parse(fs.readFileSync(this.filePath, 'utf-8')) as StoredSettingsPayload;
    const decrypted = this.decrypt(payload);
    return normalizeDigikalaSettings(JSON.parse(decrypted) as DigikalaSettingsInput);
  }

  public save(input: DigikalaSettingsInput): DigikalaSettings {
    const normalized = normalizeDigikalaSettings(input);
    const encrypted = this.encrypt(JSON.stringify(normalized));
    const dir = path.dirname(this.filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(this.filePath, JSON.stringify(encrypted, null, 2), 'utf-8');
    return normalized;
  }

  private getKey(): Buffer {
    if (!this.secret || this.secret.trim().length < 16) {
      throw new Error('DIGIKALA_SETTINGS_SECRET must be set and at least 16 characters.');
    }
    return crypto.createHash('sha256').update(this.secret).digest();
  }

  private encrypt(value: string): StoredSettingsPayload {
    const key = this.getKey();
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    const encrypted = Buffer.concat([cipher.update(value, 'utf8'), cipher.final()]);
    const tag = cipher.getAuthTag();
    return {
      version: 1,
      iv: iv.toString('base64'),
      tag: tag.toString('base64'),
      data: encrypted.toString('base64'),
    };
  }

  private decrypt(payload: StoredSettingsPayload): string {
    const key = this.getKey();
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, Buffer.from(payload.iv, 'base64'));
    decipher.setAuthTag(Buffer.from(payload.tag, 'base64'));
    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(payload.data, 'base64')),
      decipher.final(),
    ]);
    return decrypted.toString('utf8');
  }
}
