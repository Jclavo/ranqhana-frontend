import { SideNavItems, SideNavSection } from '@modules/navigation/models';

export const sideNavSections: SideNavSection[] = [
    {
        text: 'CORE',
        items: ['dashboard'],
    },
    {
        text: 'INTERFACE',
        items: ['layouts', 'pages'],
    },
    {
        text: 'ADDONS',
        items: ['charts', 'tables', 'invoices', 'items', 'units', 'users'],
    },
];

export const sideNavItems: SideNavItems = {
    dashboard: {
        icon: 'tachometer-alt',
        text: 'Dashboard',
        link: '/dashboard',
    },
    layouts: {
        icon: 'columns',
        text: 'Layouts',
        submenu: [
            {
                text: 'Static Navigation',
                link: '/dashboard/static',
            },
            {
                text: 'Light Sidenav',
                link: '/dashboard/light',
            },
        ],
    },
    pages: {
        icon: 'book-open',
        text: 'Pages',
        submenu: [
            {
                text: 'Authentication',
                submenu: [
                    {
                        text: 'Login',
                        link: '/auth/login',
                    },
                    {
                        text: 'Register',
                        link: '/auth/register',
                    },
                    {
                        text: 'Forgot Password',
                        link: '/auth/forgot-password',
                    },
                ],
            },
            {
                text: 'Error',
                submenu: [
                    {
                        text: '401 Page',
                        link: '/error/401',
                    },
                    {
                        text: '404 Page',
                        link: '/error/404',
                    },
                    {
                        text: '500 Page',
                        link: '/error/500',
                    },
                ],
            },
        ],
    },
    charts: {
        icon: 'chart-area',
        text: 'Charts',
        link: '/charts',
    },
    tables: {
        icon: 'table',
        text: 'Tables',
        link: '/tables',
    },
    items: {
        icon: 'table',
        text: 'Items',
        submenu: [
            {
                text: 'Item List',
                link: '/items',
            },
            {
                text: 'Item',
                link: '/items/item',
            },
        ],
    },
    invoices: {
        icon: 'table',
        text: 'Invoices',
        submenu: [
            {
                text: 'Sell Invoice',
                link: '/invoices/sell',
            },
            {
                text: 'Invoices List',
                link: '/invoices/',
            },
            {
                text: 'Purcharse Invoice',
                link: '/invoices/purchase',
            },
            {
                text: 'Charts',
                link: '/invoices/chart',
            },
        ],
    },
    units: {
        icon: 'table',
        text: 'Units',
        link: '/units',
    },
    users: {
        icon: 'user',
        text: 'Users',
        link: '/users',
    },
};
