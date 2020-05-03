import { OnInit, Component, Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

//MODELS
// import { SearchOptions } from '@modules/items/models';
import { InvoiceDetail, SearchItem, Invoice } from '../models';

//SERVICES
import { NotificationService } from '@modules/utility/services';
import { AuthService } from "@modules/auth/services";
import { InvoiceService, InvoiceDetailService } from '../services';


// COMPONENT 
import { AddAditionalInfoComponent } from "../components/add-aditional-info/add-aditional-info.component";

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
    ) { }


    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }

    hasStock(item: SearchItem): boolean {
        if (item.stocked && item.quantity > item.stock) {
            this.notificationService.error("There is not stock for this quantity");
            return false;
        }
        return true;
    }

    unitAllowDecimal(item: SearchItem): boolean {
        if (!item.fractioned) {
            if (!Number.isInteger(item.quantity)) {
                this.notificationService.error("The quantity should be an integer");
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

            invoiceDetails[indexSellItem].quantity = invoiceDetails[indexSellItem].quantity + item.quantity;
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
        newInvoice.total = newInvoice.subtotal + invoice.taxes - invoice.discount;

        return newInvoice;
    }

    calculateDiscount(invoice: Invoice): Invoice {

        if (invoice.discount < 0) {
            this.notificationService.error("The discount is a negative number");
            invoice.discount = 0.0;
            return invoice;
        }

        if (invoice.discount > invoice.subtotal) {
            this.notificationService.error("The discount is great than the subtotal");
            invoice.discount = 0.0;
            return invoice;
        }

        invoice.total = invoice.subtotal + invoice.taxes - invoice.discount;

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


                    console.log('this.invoiceDetailTotalItemsOK', this.invoiceDetailTotalItemsOK);

                    if (this.invoiceDetailTotalItems == this.invoiceDetailTotalItemsOK) {
                        this.notificationService.success(response.message);
                        this.openModalAdditionalInfo(invoice);
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

    openModalAdditionalInfo(invoice: Invoice) {
        const modalRef = this.modalService.open(AddAditionalInfoComponent, { centered: true, backdrop: 'static' });

        modalRef.componentInstance.invoice_id = invoice.id;
        // modalRef.componentInstance.value = name;

        modalRef.result.then((result) => {
            result ? this.router.navigate(['/invoices']) : this.notificationService.error('error');
        });
    }

    delete(index: number, invoiceDetails: Array<InvoiceDetail>): Array<InvoiceDetail> {
        
        invoiceDetails.splice(index, 1);

        return invoiceDetails;

    }

}