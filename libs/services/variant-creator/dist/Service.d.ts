import { DigikalaClient, Database } from '@digikala/core';
export declare class VariantCreatorService {
    private client;
    private db;
    constructor(client: DigikalaClient, db: Database);
    runCreation(products: any[], config: any, dryRun: boolean, onProgress?: (index: number, total: number, productTitle: string, status: string) => void): Promise<{
        status: string;
        title: string;
        created?: number;
        skipped?: number;
        error?: string;
    }[]>;
    private parseProducts;
    private parseConfig;
    private buildVariantDrafts;
    private variantFingerprint;
    private loadExistingFingerprints;
}
