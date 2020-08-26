import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { SBRouteData, SideNavItem } from '@modules/navigation/models';
import { Router } from '@angular/router';

//MODELS
import { Module } from '@modules/modules/models';

@Component({
    selector: 'sb-side-nav-item',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './side-nav-item.component.html',
    styleUrls: ['side-nav-item.component.scss'],
})
export class SideNavItemComponent implements OnInit {
    @Input() sideNavItem!: Module;
    @Input() isActive!: boolean;

    expanded = false;
    routeData!: SBRouteData;
    

    constructor(private router: Router) {
       
    }
    ngOnInit() {
        if(this.sideNavItem.labeled){
            if(this.router.url?.trim()?.toLowerCase()?.includes(this.sideNavItem.name?.trim()?.slice(0, -1)?.toLowerCase())){
                this.sideNavItem.open = true;
            }
        }else{
            if(this.sideNavItem.url == this.router.url){
                this.sideNavItem.open = true;
            }
        }
    }
}
