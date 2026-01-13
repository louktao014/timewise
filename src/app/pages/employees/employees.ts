import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee, EmployeeDetailComponent } from './employee-detail/employee-detail';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.html',
  styleUrls: ['./employees.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, EmployeeDetailComponent, FormsModule]
})
export class EmployeesComponent {
  employees = signal<Employee[]>([
    {
      id: 1,
      name: 'John',
      surname: 'Doe',
      tel: '123-456-7890',
      address: '123 Main St',
      status: 'active'
    },
    {
      id: 2,
      name: 'Jane',
      surname: 'Smith',
      tel: '098-765-4321',
      address: '456 Oak Ave',
      status: 'inactive'
    }
  ]);

  selectedEmployee = signal<Employee | null>(null);

  saveEmployee(employee: Employee) {
    this.employees.update(employees => 
      employees.map(e => e.id === employee.id ? employee : e)
    );
    this.selectedEmployee.set(null);
  }
}
