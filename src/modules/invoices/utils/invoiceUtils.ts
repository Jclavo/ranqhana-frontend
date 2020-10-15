import { OnInit, Component, Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

//MODELS
import { Item } from '@modules/items/models';
import { InvoiceDetail, SearchItem, Invoice } from '../models';

//SERVICES
import { NotificationService, LanguageService } from '@modules/utility/services';
import { AuthService } from "@modules/auth/services";
import { InvoiceService, InvoiceDetailService } from '../services';


// COMPONENT 
import { AddAditionalInfoComponent } from "../components/add-aditional-info/add-aditional-info.component";
import { MadePaymentModalComponent } from "@modules/payments/components/made-payment-modal/made-payment-modal.component";

//Utilities
import { CustomValidator } from "@modules/utility/utils";
import { Response } from '@modules/utility/models';

@Injectable({
    providedIn: 'root'
})

export class InvoiceUtils implements OnInit {

    public invoiceDetailTotalItems: number = 0;
    public invoiceDetailTotalItemsOK: number = 0;

    constructor(
        private notificationService: NotificationService,
        private invoiceService: InvoiceService,
        private invoiceDetailService: InvoiceDetailService,
        private authService: AuthService,
        private modalService: NgbModal,
        private router: Router,
        private languageService: LanguageService
    ) { }


    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }

    hasStock(item: SearchItem): boolean {
        if (item.stocked && item.quantity > item.stock) {
            this.notificationService.error(this.languageService.getI18n('invoice.message.nostock'));
            return false;
        }
        return true;
    }

    unitAllowDecimal(item: SearchItem): boolean {
        if (!item.fractioned || item.type_id == Item.getTypeService()) {
            if (!Number.isInteger(item.quantity)) {
                this.notificationService.error(this.languageService.getI18n('invoice.message.quantityInteger'));
                return false;
            }
        }
        return true;
    }


    addInvoiceDetail(item: SearchItem, invoiceDetails: Array<InvoiceDetail>): Array<InvoiceDetail> {

        //Check if the item has already exist in the list
        let indexSellItem = invoiceDetails.findIndex(value => value.item_id == item.id);

        if (indexSellItem < 0) {
            let invoiceDetail = new InvoiceDetail();
            invoiceDetail.item_id = item.id;
            invoiceDetail.item = item.name;
            invoiceDetail.unit = item.unit;
            invoiceDetail.quantity = item.quantity;
            invoiceDetail.price = item.price;
            invoiceDetail.total = invoiceDetail.quantity * invoiceDetail.price;
            invoiceDetails.push(invoiceDetail);
        }
        else {

            invoiceDetails[indexSellItem].quantity = Number(invoiceDetails[indexSellItem].quantity) + Number(item.quantity);
            invoiceDetails[indexSellItem].price = item.price;
            invoiceDetails[indexSellItem].total = invoiceDetails[indexSellItem].quantity * invoiceDetails[indexSellItem].price;

        }
        // invoiceDetail.total = invoiceDetail.total.toPrecision(2)

        return invoiceDetails;
    }

    calculateInvoice(invoice: Invoice, invoiceDetails: Array<InvoiceDetail>): Invoice {

        let newInvoice = new Invoice();

        for (let index = 0; index < invoiceDetails.length; index++) {
            newInvoice.subtotal = newInvoice.subtotal + invoiceDetails[index].total
        }

        //Get total
        // newInvoice.total = newInvoice.subtotal + invoice.taxes - invoice.discount;
        newInvoice.total = newInvoice.subtotal - invoice.discount;
        newInvoice.discount = invoice.discount;
        newInvoice.taxes = newInvoice.total * (this.authService.getStoreTax() / 100);
        if(newInvoice.total < 0){
            newInvoice.total = newInvoice.subtotal;
            newInvoice.discount = 0;
        }

        return newInvoice;
    }

    calculateDiscount(invoice: Invoice): Invoice {

        if (invoice.discount != 0) {
            if (invoice.discount < 0) {
                this.notificationService.error(this.languageService.getI18n('invoice.message.negativeDiscount'));
                invoice.discount = 0.0;
                return invoice;
            }

            if (!CustomValidator.validDecimalNumbers.test(invoice.discount.toString())) {
                this.notificationService.error(this.languageService.getI18n('form.invalidDecimalNumber'));
                return invoice;
            }

            if (invoice.discount > invoice.subtotal) {
                this.notificationService.error(this.languageService.getI18n('invoice.message.discountGTsubtotal'));
                invoice.discount = 0.0;
                return invoice;
            }
        }

        // invoice.total = invoice.subtotal + invoice.taxes - invoice.discount;
        invoice.total = invoice.subtotal - invoice.discount;
        invoice.taxes = invoice.total * (this.authService.getStoreTax() / 100);

        return invoice;

    }

    create(invoice: Invoice, invoiceDetails: Array<InvoiceDetail>) {

        this.invoiceService.create(invoice).subscribe(async response => {

            if (response.status) {
                invoice.id = response.result.id;

                if (invoice.id) {
                    // Add Details

                    this.invoiceDetailTotalItems = invoiceDetails.length;
                    this.invoiceDetailTotalItemsOK = 0;
                    for (let index = 0; index < this.invoiceDetailTotalItems; index++) {
                        invoiceDetails[index].invoice_id = invoice.id;
                        this.invoiceDetailTotalItemsOK >= 0 ? await this.addDetail(invoiceDetails[index]) : null;
                    }

                    if (this.invoiceDetailTotalItems == this.invoiceDetailTotalItemsOK) {
                        this.notificationService.success(response.message);
                        this.openModalAdditionalInfo(invoice, 0);
                    }
                }
            }
            else {
                this.notificationService.error(response.message);
            }

        }, error => {
            this.notificationService.error(error);
            this.authService.raiseError();
        });
    }


    async addDetail(invoiceDetail: InvoiceDetail) {

        // this.invoiceDetailService.create(invoiceDetail).subscribe(response => {
        await this.invoiceDetailService.create(invoiceDetail).toPromise().then(response => {

            if (response.status) {
                // this.notificationService.success(response.message);
                console.log(response.message);
                this.invoiceDetailTotalItemsOK = this.invoiceDetailTotalItemsOK + 1;
            }
            else {
                this.notificationService.error(response.message);
                this.invoiceDetailTotalItemsOK = -1;
            }

        }, (error: string) => {
            this.notificationService.error(error);
            this.authService.raiseError();
        });
    }

    openModalAdditionalInfo(invoice: Invoice, payment_id: number) {
        const modalRef = this.modalService.open(AddAditionalInfoComponent, { centered: true, backdrop: 'static' });

        modalRef.componentInstance.invoice_id = invoice.id;
        modalRef.componentInstance.payment_id = payment_id;

        modalRef.result.then((result: Response) => {

            if(!result.status){
                this.notificationService.error('The process to create the invoice was not complete.');
                return;
            }

            if(result?.result){
                if(result?.result?.credit){
                    this.router.navigate(['/payments', invoice.id]);
                }else{
                    if(payment_id == 0){
                        payment_id = result?.result?.payment_id;
                    }
                    this.openModalMadePayment(invoice, payment_id);
                }
            }
        });
    }

    delete(index: number, invoiceDetails: Array<InvoiceDetail>): Array<InvoiceDetail> {

        invoiceDetails.splice(index, 1);

        return invoiceDetails;

    }


    openModalMadePayment(invoice: Invoice,payment_id: number) {
        const modalRef = this.modalService.open(MadePaymentModalComponent, { centered: true, backdrop: 'static' });

        modalRef.componentInstance.payment_id = payment_id;

        modalRef.result.then((result: Response) => {

            if(result.status){
                this.router.navigate(['/invoices', invoice.getType()]);
            }else{
                this.openModalAdditionalInfo(invoice, payment_id);
            }

            
        });
    }

}