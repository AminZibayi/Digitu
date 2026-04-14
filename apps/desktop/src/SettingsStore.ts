import { safeStorage } from 'electron';
import fs from 'fs';
import path from 'path';
import { DigikalaSettings, DigikalaSettingsInput, normalizeDigikalaSettings } from '@digikala/core';

interface EncryptedSettingsPayload {
  version: 1;
  encrypted: string;
}

export class SettingsStore {
  constructor(private filePath: string) {}

  public load(): DigikalaSettings | null {
    if (!fs.existsSync(this.filePath)) {
      return null;
    }
    if (!safeStorage.isEncryptionAvailable()) {
      throw new Error('OS keychain encryption is not available on this machine.');
    }

    const payload = JSON.parse(fs.readFileSync(this.filePath, 'utf-8')) as EncryptedSettingsPayload;
    const decrypted = safeStorage.decryptString(Buffer.from(payload.encrypted, 'base64'));
    return normalizeDigikalaSettings(JSON.parse(decrypted) as DigikalaSettingsInput);
  }

  public save(input: DigikalaSettingsInput): DigikalaSettings {
    if (!safeStorage.isEncryptionAvailable()) {
      throw new Error('OS keychain encryption is not available on this machine.');
    }
    const normalized = normalizeDigikalaSettings(input);
    const encrypted = safeStorage.encryptString(JSON.stringify(normalized));
    const dir = path.dirname(this.filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(
      this.filePath,
      JSON.stringify({ version: 1, encrypted: encrypted.toString('base64') }, null, 2),
      'utf-8',
    );
    return normalized;
  }
}
