import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product/product.component';
import { ServiceListComponent } from './service-list/service-list.component';
import { ServiceComponent } from './service/service.component';
import { ItemI18nComponent } from './item-i18n/item-i18n.component';

export const containers = [ProductListComponent, ProductComponent, 
                           ServiceListComponent, ServiceComponent,
                           ItemI18nComponent];

export * from './product-list/product-list.component';
export * from './product/product.component';
export * from './service-list/service-list.component';
export * from './service/service.component';
export * from './item-i18n/item-i18n.component';

