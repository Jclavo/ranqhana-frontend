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

        for (let index = 0; index < this.graphicData.length; index++) {
            myLabels.push(this.graphicData[index].X);
            myData.push(this.graphicData[index].Y);

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
                        label: 'Revenue',
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
                                min: 0,
                                max: 15000,
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
