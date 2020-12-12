import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GlobalGuard } from '@modules/utility/guards';

const routes: Routes = [
    // {
    //     path: '',
    //     pathMatch: 'full',
    //     redirectTo: '/login',
    // },
    {
        // path: 'login',
        path: '',
        loadChildren: () =>
            import('modules/auth/auth-routing.module').then(m => m.AuthRoutingModule),
    },
    {
        path: 'charts',
        loadChildren: () =>
            import('modules/charts/charts-routing.module').then(m => m.ChartsRoutingModule),
    },
    {
        path: 'dashboard',
        loadChildren: () =>
            import('modules/dashboard/dashboard-routing.module').then(
                m => m.DashboardRoutingModule
            ),
        canActivate: [GlobalGuard]
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('modules/auth/auth-routing.module').then(m => m.AuthRoutingModule),
    },
    {
        path: 'error',
        loadChildren: () =>
            import('modules/error/error-routing.module').then(m => m.ErrorRoutingModule),
    },
    {
        path: 'tables',
        loadChildren: () =>
            import('modules/tables/tables-routing.module').then(m => m.TablesRoutingModule),
    },
    {
        path: 'items',
        loadChildren: () =>
            import('modules/items/items-routing.module').then(m => m.ItemsRoutingModule),
        canActivate: [GlobalGuard]
    },
    {
        path: 'services',
        loadChildren: () =>
            import('modules/services/services-routing.module').then(m => m.ServicesRoutingModule),
        canActivate: [GlobalGuard]
    },
    {
        path: 'invoices',
        loadChildren: () =>
            import('modules/invoices/invoices-routing.module').then(m => m.InvoicesRoutingModule),
        canActivate: [GlobalGuard]
    },
    // {
    //     path: 'orders',
    //     loadChildren: () =>
    //         import('modules/invoices/invoices-routing.module').then(m => m.InvoicesRoutingModule),
    //     canActivate: [GlobalGuard]
    // },
    {
        path: 'units',
        loadChildren: () =>
            import('modules/units/units-routing.module').then(m => m.UnitsRoutingModule),
        canActivate: [GlobalGuard]
    },
    {
        path: 'users',
        loadChildren: () =>
            import('modules/users/users-routing.module').then(m => m.UsersRoutingModule),
        canActivate: [GlobalGuard]
    },
    {
        path: 'persons',
        loadChildren: () =>
            import('modules/persons/persons-routing.module').then(m => m.PersonsRoutingModule),
        canActivate: [GlobalGuard]
    },
    {
        path: 'stores',
        loadChildren: () =>
            import('modules/stores/stores-routing.module').then(m => m.StoresRoutingModule),
        canActivate: [GlobalGuard]
    },
    {
        path: 'payments',
        loadChildren: () =>
            import('modules/payments/payments-routing.module').then(m => m.PaymentsRoutingModule),
        canActivate: [GlobalGuard]
    },
    {
        path: 'orders',
        loadChildren: () =>
            import('modules/orders/orders-routing.module').then(m => m.OrdersRoutingModule),
        canActivate: [GlobalGuard]
    },
    {
        path: 'version',
        loadChildren: () =>
            import('modules/utility/utility-routing.module').then(m => m.UtilityRoutingModule),
    },
    {
        path: '**',
        pathMatch: 'full',
        loadChildren: () =>
            import('modules/error/error-routing.module').then(m => m.ErrorRoutingModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
