
import { type Invoice } from '../schema';

export declare function getInvoicesByCase(caseId: number): Promise<Invoice[]>;
