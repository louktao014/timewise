import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Employee {
  id: number;
  name: string;
  surname: string;
  tel: string;
  address: string;
  status: 'active' | 'inactive';
}

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.html',
  styleUrls: ['./employee-detail.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule],
})
export class EmployeeDetailComponent {
  employee = input<Employee | null>();
  close = output<void>();
  save = output<Employee>();

  editingEmployee = signal<Employee | null>(null);

  dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  constructor() {
    effect(() => {
      const employee = this.employee();
      if (employee) {
        this.editingEmployee.set({ ...employee });
        this.dialog().nativeElement.showModal();
      } else {
        this.dialog().nativeElement.close();
        this.editingEmployee.set(null);
      }
    });
  }

  onClose() {
    this.close.emit();
  }

  onSave() {
    const employee = this.editingEmployee();
    if (employee) {
      this.save.emit(employee);
    }
  }
}
