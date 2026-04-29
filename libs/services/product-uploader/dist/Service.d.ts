import { DigikalaClient, Database } from '@digikala/core';
export declare class ProductUploaderService {
    private client;
    private db;
    constructor(client: DigikalaClient, db: Database);
    runUpload(csvPath: string, onProgress?: (index: number, total: number, productTitle: string, status: string) => void): Promise<{
        status: string;
        title: string;
        productId?: number;
        error?: string;
    }[]>;
    private parseRow;
    private saveBasicInfo;
    private addArrayAttr;
    private addStringAttr;
    private saveAttributes;
    private saveTitle;
    private uploadImage;
    private uploadImages;
    private finalizeProduct;
}
