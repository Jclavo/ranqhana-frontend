import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    Input,
    KeyValueDiffer,
    KeyValueDiffers,
} from '@angular/core';
import { Chart } from 'chart.js';

@Component({
    selector: 'sb-charts-bar',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './charts-bar.component.html',
    styleUrls: ['charts-bar.component.scss'],
})
export class ChartsBarComponent implements OnInit, AfterViewInit {
    @ViewChild('myBarChart') myBarChart!: ElementRef<HTMLCanvasElement>;
    chart!: Chart;
    @Input() graphicData: Array<any> = [];
    @Input() labelX: string = '';
    @Input() labelY: string = '';

    private graphicDataDiffers: KeyValueDiffer<string, any>;

    constructor(
        private differs: KeyValueDiffers, // to get changes in a object
    ) {
        this.graphicDataDiffers = this.differs.find(this.graphicData).create();

    }
    ngOnInit() {
    }

    ngDoCheck(): void {

        if (!this.myBarChart) return;

        const changes = this.graphicDataDiffers.diff(this.graphicData);
        if (changes) {
            this.loadChart();
        }
    }

    ngAfterViewInit() {
        this.loadChart();
    }

    loadChart() {

        let myLabels = [];
        let myData = [];

        let myMin = 0;
        let myMax = 500;

        for (let index = 0; index < this.graphicData.length; index++) {
            myLabels.push(this.graphicData[index].X);
            myData.push(this.graphicData[index].Y);

            //logic to get max value
            if (index == 0) {
                myMax = this.graphicData[index].Y;
            }
            else if (myMax < this.graphicData[index].Y) {
                myMax = this.graphicData[index].Y;
            }

            if(index == this.graphicData.length - 1){
                myMax = Math.round(myMax + (myMax * 0.3));
            }
        }

        //destroy chart if it exist
        if (this.chart !== undefined) {
            this.chart.destroy();
        }

        //start loading chart

        this.chart = new Chart(this.myBarChart.nativeElement, {
            type: 'bar',
            data: {
                // labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                labels: myLabels,
                datasets: [
                    {
                        label: '$',
                        backgroundColor: 'rgba(2,117,216,1)',
                        borderColor: 'rgba(2,117,216,1)',
                        // data: [4215, 5312, 6251, 7841, 9821, 14984],
                        data: myData
                    },
                ],
            },
            options: {
                scales: {
                    xAxes: [
                        {
                            time: {
                                unit: 'month',
                            },
                            gridLines: {
                                display: false,
                            },
                            ticks: {
                                maxTicksLimit: 6,
                            },
                        },
                    ],
                    yAxes: [
                        {
                            ticks: {
                                min: myMin,
                                max: myMax,
                                maxTicksLimit: 5,
                            },
                            gridLines: {
                                display: true,
                            },
                        },
                    ],
                },
                legend: {
                    display: false,
                },
            },
        });

        this.chart.update();
    }
}
