import { InvoiceService } from './invoice.service';
import { InvoiceDetailService } from './invoice-detail.service';

export const services = [InvoiceService, InvoiceDetailService];

export * from './invoice.service';
export * from './invoice-detail.service';