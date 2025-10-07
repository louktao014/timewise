import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.html',
  styleUrls: ['./employees.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesComponent {}
