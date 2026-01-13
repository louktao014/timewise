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

  doughnutChartInstance: Chart | null = null;
  barChartInstance: Chart | null = null;

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
    const canvas = this.doughnutChartRef();

    if (!canvas) return;

    if (this.doughnutChartInstance) {
      this.doughnutChartInstance = this.destroyChart(this.doughnutChartInstance);
    }

    this.doughnutChartInstance = new Chart(canvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [
          {
            label: 'My First Dataset',
            data: [300, 50, 100],
            backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
          },
        ],
      },
      options: {
        responsive: false,
        plugins: {
          legend: { display: false },
        },
      },
    });
  }

  private createBarChart(): void {
    const canvas = this.barChartRef();

    if (!canvas) return;

    if (this.barChartInstance) {
      this.barChartInstance = this.destroyChart(this.barChartInstance);
    }

    this.barChartInstance = new Chart(canvas.nativeElement, {
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

  destroyChart(chart: Chart | null): Chart | null {
    chart?.destroy();
    return null;
  }
}
