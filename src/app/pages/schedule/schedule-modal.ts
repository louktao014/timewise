import { ChangeDetectionStrategy, Component, input, output, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface WorkTime {
  startTime: string;
  endTime: string;
  employee: string;
  type: 'work' | 'leave';
  reason: string;
}

@Component({
  selector: 'app-schedule-modal',
  templateUrl: './schedule-modal.html',
  styleUrls: ['./schedule-modal.css'],
  imports: [FormsModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleModal implements OnInit {
  public day = input.required<any>();
  public initialWorkTimes = input.required<WorkTime[]>({ alias: 'workTimes' });
  public save = output<WorkTime[]>();
  public closeModal = output<void>();

  public workTimes = signal<WorkTime[]>([]);

  public mode = signal<'view' | 'add'>('view');
  public newWorkTime = signal<WorkTime>({
    startTime: '',
    endTime: '',
    employee: '',
    type: 'work',
    reason: '',
  });
  public editIndex = signal<number | null>(null);

  ngOnInit(): void {
    this.workTimes.set(this.initialWorkTimes().map((wt) => ({ ...wt })));
  }

  public setType(type: 'work' | 'leave'): void {
    this.newWorkTime.update((current) => ({ ...current, type }));
  }

  public onSave(): void {
    this.save.emit(this.workTimes());
    this.close();
  }

  public addOrUpdateWorkTime(): void {
    const workTime = this.newWorkTime();
    if (this.editIndex() !== null) {
      this.workTimes.update((currentWorkTimes) => {
        const updated = [...currentWorkTimes];
        updated[this.editIndex()!] = workTime;
        return updated;
      });
    } else {
      this.workTimes.update((currentWorkTimes) => [...currentWorkTimes, workTime]);
    }
    this.resetFormAndSwitchToView();
  }

  public editWorkTime(index: number): void {
    this.editIndex.set(index);
    this.newWorkTime.set({ ...this.workTimes()[index] });
    this.mode.set('add');
  }

  public deleteWorkTime(index: number): void {
    this.workTimes.update((currentWorkTimes) => {
      const updated = [...currentWorkTimes];
      updated.splice(index, 1);
      return updated;
    });
  }

  public get isEditing(): boolean {
    return this.editIndex() !== null;
  }

  public switchToAddMode(): void {
    this.editIndex.set(null);
    this.newWorkTime.set({ startTime: '', endTime: '', employee: '', type: 'work', reason: '' });
    this.mode.set('add');
  }

  private resetFormAndSwitchToView(): void {
    this.newWorkTime.set({
      startTime: '',
      endTime: '',
      employee: '',
      type: 'work',
      reason: '',
    });
    this.editIndex.set(null);
    this.mode.set('view');
  }

  public close(): void {
    this.closeModal.emit();
  }
}
