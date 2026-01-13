import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnInit,
  viewChild,
} from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements AfterViewInit, OnInit {
  private doughnutChartRef = viewChild<ElementRef>('doughnutChart');
  private barChartRef = viewChild<ElementRef>('barChart');
  private http = inject(HttpClient);

  doughnutChart: any;
  barChart: any;
  ngOnInit(): void {
    this.createDoughnutChart();
    this.createBarChart();
    this.testGet();
  }

  testGet() {
    this.http.get<any[]>('http://localhost:3000/').subscribe({
      next: (res) => {
        console.log('testGet', res);
      },
      error: (err) => {
        console.log('ERROR', err);
      },
    });
  }

  ngAfterViewInit(): void {
    this.createDoughnutChart();
    this.createBarChart();
  }

  private createDoughnutChart(): void {
    const doughnutChart = this.doughnutChartRef();
    if (doughnutChart) {
      new Chart(doughnutChart.nativeElement, {
        type: 'doughnut',
        data: {
          labels: ['Red', 'Blue', 'Yellow'],
          datasets: [
            {
              label: 'My First Dataset',
              data: [300, 50, 100],
              backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
              // hoverOffset: 4,
            },
          ],
        },
        options: {
          responsive: false,
          scales: {
            x: { display: false },
            y: { display: false },
          },
        },
      });
    }
  }
  private createBarChart(): void {
    const barChart = this.barChartRef();
    if (barChart) {
      new Chart(barChart.nativeElement, {
        type: 'bar',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
            {
              label: 'My First Dataset',
              data: [65, 59, 80, 81, 56, 55, 40],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)',
              ],
              borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)',
              ],
              borderWidth: 1,
            },
          ],
        },
      });
    }
  }
}
