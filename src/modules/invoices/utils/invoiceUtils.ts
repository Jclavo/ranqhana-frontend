import { OnInit, Component, Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

//MODELS
import { Item } from '@modules/items/models';
import { Order } from '@modules/orders/models';
import { OrderStage } from '@modules/order-stages/models';
import { InvoiceDetail, SearchItem, Invoice } from '../models';

//SERVICES
import { NotificationService, LanguageService } from '@modules/utility/services';
import { AuthService } from "@modules/auth/services";
import { OrderService } from "@modules/orders/services";
import { InvoiceService, InvoiceDetailService } from '../services';


// COMPONENT 
import { AddAditionalInfoComponent } from "../components/add-aditional-info/add-aditional-info.component";
import { MadePaymentModalComponent } from "@modules/payments/components/made-payment-modal/made-payment-modal.component";
import { ConfirmModalComponent } from '@modules/utility/components';

//Utilities
import { CustomValidator } from "@modules/utility/utils";
import { Response } from '@modules/utility/models';

@Injectable({
    providedIn: 'root'
})

export class InvoiceUtils implements OnInit {

    public ORDER_STAGE_NEW = OrderStage.getStageNew();

    // private invoice_id = 0;
    public isOrder: boolean = false;
    private hasInvoice: boolean = false;
    public invoiceDetails: Array<InvoiceDetail> = [];
    public invoice = new Invoice();
    public order = new Order();


    constructor(
        private notificationService: NotificationService,
        private invoiceService: InvoiceService,
        private invoiceDetailService: InvoiceDetailService,
        private authService: AuthService,
        private modalService: NgbModal,
        private router: Router,
        private languageService: LanguageService,
        private orderService: OrderService
    ) { }


    ngOnInit(): void {

    }

    getInvoiceID() {
        return this.invoice.id
    }

    setInvoiceID(invoice_id: number) {
        this.invoice.id = invoice_id;
    }

    checkIsOrder(){

        if(this.router.url?.trim()?.toLowerCase()?.includes('order')){
            this.isOrder = true;
        }
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

    calculateInvoice() {

        // this.invoice = new Invoice();

        this.invoice.subtotal = 0.0;
        this.invoice.taxes = 0.0;
        this.invoice.total = 0.0;
        
        for (let index = 0; index < this.invoiceDetails.length; index++) {
            this.invoice.subtotal += Number(this.invoiceDetails[index].total);
        }

        //Get total
        // this.invoice.total = this.invoice.subtotal + invoice.taxes - invoice.discount;
        this.invoice.total = this.invoice.subtotal - this.invoice.discount;
        this.invoice.discount = this.invoice.discount;
        this.invoice.taxes = this.invoice.total * (this.authService.getStoreTax() / 100);
        if (this.invoice.total < 0) {
            this.invoice.total = this.invoice.subtotal;
            this.invoice.discount = 0;
        }

        // return this.invoice;
    }

    calculateDiscount() {

        if (this.invoice.discount != 0) {
            if (this.invoice.discount < 0) {
                this.notificationService.error(this.languageService.getI18n('invoice.message.negativeDiscount'));
                this.invoice.discount = 0.0;
                return;
            }

            if (!CustomValidator.validDecimalNumbers.test(this.invoice.discount.toString())) {
                this.notificationService.error(this.languageService.getI18n('form.invalidDecimalNumber'));
                return;
            }

            if (this.invoice.discount > this.invoice.subtotal) {
                this.notificationService.error(this.languageService.getI18n('invoice.message.discountGTsubtotal'));
                this.invoice.discount = 0.0;
                return;
            }
        }

        // invoice.total = invoice.subtotal + invoice.taxes - invoice.discount;
        this.invoice.total = this.invoice.subtotal - this.invoice.discount;
        this.invoice.taxes = this.invoice.total * (this.authService.getStoreTax() / 100);

    }

    async create(type_id: number, item: SearchItem) {

        if (this.getInvoiceID() == 0 && !this.hasInvoice) {

            this.hasInvoice = true;

            let invoice = new Invoice();

            //assign fields
            invoice.type_id = type_id;

            //Create Invoice with draf stage
            await this.createInvoice(invoice);
        }

        if (this.getInvoiceID() > 0) {

            let invoiceDetail = new InvoiceDetail();

            //assign fields
            invoiceDetail.item_id = item.id;
            invoiceDetail.quantity = item.quantity;
            invoiceDetail.price = item.price;
            invoiceDetail.invoice_id = this.getInvoiceID();

            await this.addDetail(invoiceDetail);
        }

        this.getInvoiceDetails(this.getInvoiceID());
    }

    async createInvoice(invoice: Invoice) {

        await this.invoiceService.create(invoice).toPromise().then(response => {
            if (response.status) {
                this.setInvoiceID(response.result?.id);
                this.getOrder(response.result?.order_id);
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
                this.notificationService.success(response.message);
            }
            else {
                this.notificationService.error(response.message);
            }

        }, (error: string) => {
            this.notificationService.error(error);
            this.authService.raiseError();
        });
    }

    getInvoice(invoice_id: number) {
        this.invoiceService.getById(invoice_id).subscribe(async response => {

            if (response.status) {
                this.invoice = response.result;
                this.hasInvoice = true;
            } else {
                this.notificationService.error(response.message);
            }

        }, error => {
            this.notificationService.error(error);
            this.authService.raiseError();
        });
    }

    getInvoiceDetails(invoice_id: number) {
        this.invoiceDetailService.getById(invoice_id).subscribe(async response => {

            if (response.status) {
                this.invoiceDetails = response.result;
                this.calculateInvoice();
            } else {
                this.notificationService.error(response.message);
            }

        }, error => {
            this.notificationService.error(error);
            this.authService.raiseError();
        });
    }

    getOrder(order_id: number) {
        this.orderService.getById(order_id).subscribe(async response => {
            if (response.status) {
                this.order = response.result;
                // this.calculateInvoice();
            } else {
                this.notificationService.error(response.message);
            }

        }, error => {
            this.notificationService.error(error);
            this.authService.raiseError();
        });
    }

    deleteInvoiceDetail(invoice_id: number) {
        this.invoiceDetailService.delete(invoice_id).subscribe(async response => {

            if (response.status) {
                this.notificationService.success(response.message);
                this.getInvoiceDetails(this.getInvoiceID());
            } else {
                this.notificationService.error(response.message);
            }

        }, error => {
            this.notificationService.error(error);
            this.authService.raiseError();
        });
    }

    setOrderRequested(){
        this.setOrderStatus(OrderStage.getStageRequested());
    }

    setOrderStatus(status_id: number){
        let order = new Order();
        order.id = this.order.id;
        order.stage_id = status_id;
        this.changeStatus(order);
    }

    changeStatus(order: Order) {
        this.orderService.changeStatus(order).subscribe(async response => {

            if (response.status) {
                this.notificationService.success(response.message);
                if(this.isOrder){
                    this.router.navigate(['/orders']);
                }
                
            } else {
                this.notificationService.error(response.message);
            }

        }, error => {
            this.notificationService.error(error);
            this.authService.raiseError();
        });
    }

    saveInvoice() {

        if(!this.isOrder){
            this.setOrderStatus(OrderStage.getStageAutomatic());
        }
        this.generate(this.invoice);

    }

    generate(invoice: Invoice) {
        this.invoiceService.generate(invoice).subscribe(async response => {

            if (response.status) {
                this.notificationService.success(response.message);
                this.openModalAdditionalInfo(invoice, 0);
            } else {
                this.notificationService.error(response.message);
            }

        }, error => {
            this.notificationService.error(error);
            this.authService.raiseError();
        });
    }

    

    modalDelete(id: number, name: string) {
    
        const modalRef = this.modalService.open(ConfirmModalComponent, { centered: true, backdrop: 'static' });
    
        modalRef.componentInstance.title = this.languageService.getI18n('invoice.page.title');
        modalRef.componentInstance.action = this.languageService.getI18n('button.delete');
        modalRef.componentInstance.value = name;
    
        modalRef.result.then((result) => {
          result ? this.deleteInvoiceDetail(id) : null;
        });
    
      }


    openModalAdditionalInfo(invoice: Invoice, payment_id: number) {
        const modalRef = this.modalService.open(AddAditionalInfoComponent, { centered: true, backdrop: 'static' });

        modalRef.componentInstance.invoice_id = invoice.id;
        modalRef.componentInstance.payment_id = payment_id;

        modalRef.result.then((result: Response) => {

            if (!result.status) {
                this.notificationService.error(this.languageService.getI18n('invoice.message.notCreated'));
                return;
            }

            if (result?.result) {
                if (result?.result?.credit) {
                    this.router.navigate(['/payments', invoice.id]);
                } else {
                    if (payment_id == 0) {
                        payment_id = result?.result?.payment_id;
                    }
                    this.openModalMadePayment(invoice, payment_id);
                }
            }
        });
    }


    openModalMadePayment(invoice: Invoice, payment_id: number) {
        const modalRef = this.modalService.open(MadePaymentModalComponent, { centered: true, backdrop: 'static' });

        modalRef.componentInstance.payment_id = payment_id;

        modalRef.result.then((result: Response) => {

            if (result.status) {
                this.router.navigate(['/invoices', invoice.getType()]);
            } else {
                this.openModalAdditionalInfo(invoice, payment_id);
            }


        });
    }

}