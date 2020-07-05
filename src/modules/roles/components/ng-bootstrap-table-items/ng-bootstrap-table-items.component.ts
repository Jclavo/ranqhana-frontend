import { Component, OnInit, Input, ViewChildren, QueryList, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';

import { SBSortableHeaderDirective, SortEvent } from '@modules/items/directives';
import { ItemService } from '@modules/items/services';
import { Item } from '@modules/items/models';

@Component({
  selector: 'sb-ng-bootstrap-table-items',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ng-bootstrap-table-items.component.html',
  styleUrls: ['./ng-bootstrap-table-items.component.scss']
})
export class NgBootstrapTableItemsComponent implements OnInit {

  @Input() pageSize = 4;

  items$!: Observable<Item[]>;
  total$!: Observable<number>;
  sortedColumn!: string;
  sortedDirection!: string;

  @ViewChildren(SBSortableHeaderDirective) headers!: QueryList<SBSortableHeaderDirective>;

  constructor(
    private itemService: ItemService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    // console.log('this.items$',this.items$);
    this.itemService.pageSize = this.pageSize;
    this.items$ = this.itemService.items$;
    this.total$ = this.itemService.total$;
  }

  onSort({ column, direction }: SortEvent) {
    this.sortedColumn = column;
    this.sortedDirection = direction;
    this.itemService.sortColumn = column;
    this.itemService.sortDirection = direction;
    this.changeDetectorRef.detectChanges();
  }

}
