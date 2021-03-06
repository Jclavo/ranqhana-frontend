import { Component, OnInit, Input, ChangeDetectionStrategy, KeyValueDiffer, KeyValueDiffers } from '@angular/core';

@Component({
  selector: 'sb-card-view-value',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './card-view-value.component.html',
  styleUrls: ['./card-view-value.component.scss']
})
export class CardViewValueComponent implements OnInit {

  @Input() background!: string;
  @Input() title!: string;
  @Input() data = {value: '-'};
  // @Input() color!: string;

  // public value: string = '-';

  customClasses: string[] = [];

  // private graphicDataDiffersx: KeyValueDiffer<string, any>;

  constructor(
    // private differs: KeyValueDiffers, // to get changes in a object
  ) {
    // this.graphicDataDiffersx = this.differs.find(this.data).create();

  }


  // ngDoCheck(): void {

  //   // const changes = this.graphicDataDiffersx.diff(this.data);
  //   // if (changes) {
  //   //   this.value =  this.data?.value ?? '-';
  //   //   console.log(' entrou ',  this.value );
  //   // }
    
    
  // }

  ngOnInit() {
    if (this.background) {
      this.customClasses.push(this.background);
    }
    // if (this.color) {
    //     this.customClasses.push(this.color);
    // }
  }

}
