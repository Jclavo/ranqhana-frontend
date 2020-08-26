export class Module{
    id: number = 0;
    name: string = '';
    url: string = '';
    icon: string = 'table';
    project_id: number = 0;
    parent_id: number = 0;
    labeled: boolean = false;

    children: Array<Module> = [];
    open: boolean = false;
}