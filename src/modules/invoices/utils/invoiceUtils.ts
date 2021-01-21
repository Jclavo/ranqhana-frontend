import { OnInit, Component, Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

//MODELS
import { InvoiceDetail, SearchItem, Invoice } from '../models';
import { ItemType } from '@modules/item-types/models';
import { Order } from '@modules/orders/models';
import { OrderStage } from '@modules/order-stages/models';
import { PaymentType } from '@modules/payment-types/models';
import { Payment } from '@modules/payments/models';

//SERVICES
import { NotificationService, LanguageService } from '@modules/utility/services';
import { AuthService } from "@modules/auth/services";
import { OrderService } from "@modules/orders/services";
import { InvoiceService, InvoiceDetailService } from '../services';
import { PaymentService } from "@modules/payments/services";


// COMPONENT 
import { AddAditionalInfoComponent, ShowInvoiceComponent } from "../components";
import { MadePaymentModalComponent } from "@modules/payments/components/made-payment-modal/made-payment-modal.component";
import { ConfirmModalComponent, LoginModalComponent } from '@modules/utility/components';

//Utilities
import { CustomValidator } from "@modules/utility/utils";
import { Response } from '@modules/utility/models';

@Injectable({
    providedIn: 'root'
})

export class InvoiceUtils implements OnInit {

    public ORDER_STAGE_NEW = OrderStage.getForNew();

    private hasInvoice: boolean = false;
    private type_id: number = 0;
    public invoiceDetails: Array<InvoiceDetail> = [];
    public invoice = new Invoice();
    public order = new Order();
    public isOrder: boolean = false;
    public disabledButtonAdd: boolean = false;


    constructor(
        private notificationService: NotificationService,
        private invoiceService: InvoiceService,
        private invoiceDetailService: InvoiceDetailService,
        private authService: AuthService,
        private modalService: NgbModal,
        private router: Router,
        private languageService: LanguageService,
        private orderService: OrderService,
        private paymentService: PaymentService
    ) { }


    ngOnInit(): void {
    }

    getInvoiceID() {
        return this.invoice.id
    }

    setInvoiceID(invoice_id: number) {
        this.invoice.id = invoice_id;
    }

    setHasInvoice(value: boolean) {
        this.hasInvoice = value;
    }

    checkIsOrder() {

        if (this.router.url?.trim()?.toLowerCase()?.includes('order')) {
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
        if (!item.fractioned || item.type_id == ItemType.getForService()) {
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
        this.invoice.taxes = this.invoice.total * (this.authService.getCompanyTax() / 100);
        if (this.invoice.total < 0) {
            this.invoice.total = this.invoice.subtotal;
            this.invoice.discount = 0;
        }

        // return this.invoice;
    }

    calculateDiscount() {

        if (!this.invoice.discount) {
            this.invoice.discount = 0.0;
        }

        if (this.invoice.discount < 0) {
            this.notificationService.error(this.languageService.getI18n('invoice.message.negativeDiscount'));
            this.invoice.discount = 0.0;
            return;
        }

        if (this.invoice.discount_percent) {

            if (this.invoice.discount < 0 || this.invoice.discount > 100) {
                this.notificationService.error(this.languageService.getI18n('invoice.message.invalidDiscountPercent'));
                return;
            }

            //calculate total
            this.invoice.total = this.invoice.subtotal - ((this.invoice.subtotal / 100) * this.invoice.discount);

        } else {

            if (!CustomValidator.validDecimalNumbers.test(this.invoice.discount.toString())) {
                this.notificationService.error(this.languageService.getI18n('form.invalidDecimalNumber'));
                return;
            }

            if (this.invoice.discount > this.invoice.subtotal) {
                this.notificationService.error(this.languageService.getI18n('invoice.message.discountGTsubtotal'));
                this.invoice.discount = 0.0;
                return;
            }

            //calculate total
            this.invoice.total = this.invoice.subtotal - this.invoice.discount;

        }

        this.invoice.taxes = this.invoice.total * (this.authService.getCompanyTax() / 100);

    }

    create(type_id: number, item: SearchItem) {

        this.disabledButtonAdd = true;

        let invoiceDetail = new InvoiceDetail();

        invoiceDetail.item_id = item.id;
        invoiceDetail.quantity = item.quantity;
        invoiceDetail.price = item.price;

        invoiceDetail.invoice_id = this.getInvoiceID();
        invoiceDetail.type_id = type_id;

        this.addDetail(invoiceDetail);
    }

    addDetail(invoiceDetail: InvoiceDetail) {

        this.invoiceDetailService.create(invoiceDetail).subscribe(response => {
            // await this.invoiceDetailService.create(invoiceDetail).toPromise().then(response => {

            if (response.status) {

                this.setInvoiceID(response.result?.id);
                // this.invoice = response.result;

                this.invoiceDetails = response.result?.details;

                this.order = response.result?.order;

                this.calculateInvoice();
            }
            else {
                this.notificationService.error(response.message);
            }

            this.disabledButtonAdd = false;

        }, (error: string) => {
            this.notificationService.error(error);
            this.authService.raiseError();
            this.disabledButtonAdd = false;
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
            } else {
                this.invoiceDetails = [];
            }
            this.calculateInvoice();

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

    setOrderRequested(type_id: number) {
        this.type_id = type_id;
        this.setOrderStatus(OrderStage.getForRequested());
    }

    setOrderStatus(status_id: number) {
        let order = new Order();
        order.id = this.order.id;
        order.stage_id = status_id;
        this.updateStage(order);
    }

    updateStage(order: Order) {
        this.orderService.updateStage(order).subscribe(async response => {

            if (response.status) {
                // this.notificationService.success(response.message);
                if (this.isOrder) {
                    this.router.navigate(['/orders', this.type_id]);
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

        if (!this.isOrder) {
            this.setOrderStatus(OrderStage.getForAutomatic());
        }

        if (!this.authService.getUserIsAdmin() && this.invoice.discount > 0) {
            this.openModalLogin();
        } else {
            this.generate(this.invoice);
        }
    }

    /**
     * 
     * this function increase/decrease the stock
     */
    generate(invoice: Invoice) {
        this.invoiceService.generate(invoice).subscribe(response => {

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

        modalRef.componentInstance.title = 'Item';
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

        modalRef.result.then((response: Response) => {

            if (!response.status) {
                this.notificationService.error(this.languageService.getI18n('invoice.message.notCreated'));
                return;
            }

            if (response?.result) {

                if (this.authService.getCompanySettingHasCashier()) {
                    this.router.navigate(['/invoices', invoice.getType()]);
                } else {

                    let type_id = response?.result?.type_id
                    if (payment_id == 0) {
                        payment_id = response?.result?.payment_id;
                    }

                    if (type_id == PaymentType.getForInternalCredit()) {
                        this.router.navigate(['/payments', invoice.id]);
                    } else if (type_id == PaymentType.getForCash()) {
                        this.openModalMadePayment(invoice, payment_id);
                    } else {
                        this.getPaymentById(payment_id);
                    }
                }


            }
        });
    }

    getPaymentById(id: number) {
        this.paymentService.getById(id).subscribe(response => {
            if (response.status) {
                this.savePayment(response.result);
            }
            else {
                this.notificationService.error(response.message);
            }

        }, error => {
            this.notificationService.error(error);
            this.authService.raiseError();
        });
    }


    savePayment(payment: Payment) {

        this.paymentService.save(payment).subscribe(response => {
            if (response.status) {
                if (this.authService.getCompanyPrinterWorkflowForInvoice()) {
                    this.OpenModalShowInvoice(this.invoice.id);
                }
                this.router.navigate(['/invoices', this.invoice.getType()]);
            }
            else {
                this.notificationService.error(response.message);
            }

        }, error => {
            this.notificationService.error(error);
            this.authService.raiseError();
        });
    }


    OpenModalShowInvoice(id: number) {

        const modalRef = this.modalService.open(ShowInvoiceComponent, { centered: true, backdrop: 'static' });
        modalRef.componentInstance.invoice_id = id;

    }

    openModalMadePayment(invoice: Invoice, payment_id: number) {
        const modalRef = this.modalService.open(MadePaymentModalComponent, { centered: true, backdrop: 'static' });

        modalRef.componentInstance.payment_id = payment_id;

        modalRef.result.then((result: Response) => {

            if (result.status) {
                if (this.authService.getCompanyPrinterWorkflowForInvoice()) {
                    this.OpenModalShowInvoice(this.invoice.id);
                }
                this.router.navigate(['/invoices', invoice.getType()]);
            } else {
                this.openModalAdditionalInfo(invoice, payment_id);
            }
        });
    }

    openModalLogin() {

        const modalRef = this.modalService.open(LoginModalComponent, { centered: true, backdrop: 'static' });

        modalRef.result.then((response: Response) => {

            if (response.status) {
                this.invoice.api_token = response.result?.api_token;
                this.generate(this.invoice);
            }
        });
    }

}