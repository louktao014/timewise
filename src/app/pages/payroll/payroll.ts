import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';

interface Employee {
  id: number;
  name: string;
  position: string;
  salary: number;
  overtime: number;
  deductions: number;
}

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.html',
  styleUrls: ['./payroll.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DecimalPipe]
})
export class PayrollComponent {
  public employees = signal<Employee[]>([
    {
      id: 1,
      name: 'John Doe',
      position: 'Developer',
      salary: 60000,
      overtime: 0,
      deductions: 0,
    },
    {
      id: 2,
      name: 'Jane Smith',
      position: 'Designer',
      salary: 55000,
      overtime: 0,
      deductions: 0,
    },
    {
      id: 3,
      name: 'Peter Jones',
      position: 'Manager',
      salary: 75000,
      overtime: 0,
      deductions: 0,
    },
  ]);

  public totalNetSalary = computed(() => {
    return this.employees().reduce((total, employee) => {
      const hourlyRate = employee.salary / 2080;
      const overtimePay = employee.overtime * hourlyRate * 1.5;
      return total + (employee.salary + overtimePay - employee.deductions);
    }, 0);
  });

  public updateOvertime(employee: Employee, event: Event): void {
    const input = event.target as HTMLInputElement;
    const overtime = Number(input.value);
    this.employees.update((employees) =>
      employees.map((emp) =>
        emp.id === employee.id ? { ...emp, overtime } : emp
      )
    );
  }

  public updateDeductions(employee: Employee, event: Event): void {
    const input = event.target as HTMLInputElement;
    const deductions = Number(input.value);
    this.employees.update((employees) =>
      employees.map((emp) =>
        emp.id === employee.id ? { ...emp, deductions } : emp
      )
    );
  }
}
