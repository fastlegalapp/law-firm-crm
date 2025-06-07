
import { type Invoice } from '../schema';

export declare function getInvoicesByClient(clientId: number): Promise<Invoice[]>;
