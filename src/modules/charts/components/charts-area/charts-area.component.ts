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
    selector: 'sb-charts-area',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './charts-area.component.html',
    styleUrls: ['charts-area.component.scss'],
})
export class ChartsAreaComponent implements OnInit, AfterViewInit {
    @ViewChild('myAreaChart') myAreaChart!: ElementRef<HTMLCanvasElement>;
    chart!: Chart;
    @Input() graphicData: Array<any> = [];
    @Input() gg: string = '';

    private graphicDataDiffers: KeyValueDiffer<string, any>;

    constructor(
        private differs: KeyValueDiffers, // to get changes in a object
    ) {
        this.graphicDataDiffers = this.differs.find(this.graphicData).create();

    }
    ngOnInit() {
    }

    ngDoCheck(): void {

        if (!this.myAreaChart) return;

        const changes = this.graphicDataDiffers.diff(this.graphicData);
        if (changes) {
            this.loadChart();
        }
    }

    ngAfterViewInit() {
        this.loadChart();
    }

    loadChart() {

        let _labels = [];
        let _data = [];

        for (let index = 0; index < this.graphicData.length; index++) {
            _labels.push(this.graphicData[index].X);
            _data.push(this.graphicData[index].Y);

        }

        //start loading chart
        this.chart = new Chart(this.myAreaChart.nativeElement, {
            type: 'line',
            data: {
                labels: _labels,
                datasets: [
                    {
                        label: 'Sessions',
                        lineTension: 0.3,
                        backgroundColor: 'rgba(2,117,216,0.2)',
                        borderColor: 'rgba(2,117,216,1)',
                        pointRadius: 5,
                        pointBackgroundColor: 'rgba(2,117,216,1)',
                        pointBorderColor: 'rgba(255,255,255,0.8)',
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(2,117,216,1)',
                        pointHitRadius: 50,
                        pointBorderWidth: 2,
                        data: _data,
                    },
                ],
            },
            options: {
                scales: {
                    xAxes: [
                        {
                            time: {
                                unit: 'day',
                            },
                            gridLines: {
                                display: false,
                            },
                            ticks: {
                                maxTicksLimit: 7,
                            },
                        },
                    ],
                    yAxes: [
                        {
                            ticks: {
                                maxTicksLimit: 5,
                            },
                            gridLines: {
                                color: 'rgba(0, 0, 0, .125)',
                            },
                        },
                    ],
                },
                legend: {
                    display: false,
                },
            },
        });
    }
}
