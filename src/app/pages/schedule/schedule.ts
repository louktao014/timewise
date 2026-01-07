import { ChangeDetectionStrategy, Component, signal, computed } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as XLSX from 'xlsx';
import { ScheduleModal, WorkTime } from './schedule-modal';

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  workTimes: WorkTime[];
}

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.html',
  styleUrls: ['./schedule.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe, ScheduleModal],
})
export class ScheduleComponent {
  public daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  public currentMonth = signal(new Date());

  private scheduleData = signal<Map<string, WorkTime[]>>(new Map());
  public selectedDay = signal<CalendarDay | null>(null);

  public calendarDays = computed(() => {
    return this.generateCalendarDays(this.currentMonth());
  });

  public onFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (!target.files || target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary', cellDates: true });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      const data: any[] = XLSX.utils.sheet_to_json(ws);

      const newSchedule = new Map<string, WorkTime[]>();
      data.forEach(row => {
        if (row.Date && row.Employee && row.StartTime && row.EndTime) {
            const date = new Date(row.Date);
            const adjustedDate = new Date(date.valueOf() + date.getTimezoneOffset() * 60 * 1000);
            const dateString = this.formatDate(adjustedDate);

            const workTimes = newSchedule.get(dateString) || [];
            workTimes.push({ startTime: row.StartTime, endTime: row.EndTime, employee: row.Employee ,type:row.Type, reason:row.Reason});
            newSchedule.set(dateString, workTimes);
        }
      });
      this.scheduleData.set(newSchedule);
    };
    reader.readAsBinaryString(target.files[0]);
  }

  public exportSchedule(): void {
    const data: any[] = [];
    this.scheduleData().forEach((workTimes, date) => {
        workTimes.forEach(workTime => {
            data.push({ Date: date, StartTime: workTime.startTime, EndTime: workTime.endTime, Employee: workTime.employee });
        });
    });

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Schedule');
    XLSX.writeFile(wb, 'schedule.xlsx');
  }

  public openAddWorkTimeModal(day: CalendarDay): void {
    this.selectedDay.set(day);
  }

  public closeWorkTimeModal(): void {
    this.selectedDay.set(null);
  }

  public saveWorkTimes(workTimes: WorkTime[]): void {
    const day = this.selectedDay();
    if (day) {
      const dateString = this.formatDate(day.date);
      this.scheduleData.update(currentSchedule => {
        const newSchedule = new Map(currentSchedule);
        newSchedule.set(dateString, workTimes);
        return newSchedule;
      });
    }
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private generateCalendarDays(date: Date): CalendarDay[] {
    const days: CalendarDay[] = [];
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const startDate = new Date(firstDayOfMonth);
    startDate.setDate(startDate.getDate() - startDate.getDay());

    const endDate = new Date(lastDayOfMonth);
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      days.push({
        date: new Date(currentDate),
        isCurrentMonth: currentDate.getMonth() === month,
        workTimes: this.getWorkTimesForDate(currentDate),
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
  }

  private getWorkTimesForDate(date: Date): WorkTime[] {
    const dateString = this.formatDate(date);
    return this.scheduleData().get(dateString) || [];
  }

  public previousMonth(): void {
    this.currentMonth.update(
      (d) => new Date(d.getFullYear(), d.getMonth() - 1, 1)
    );
  }

  public nextMonth(): void {
    this.currentMonth.update(
      (d) => new Date(d.getFullYear(), d.getMonth() + 1, 1)
    );
  }
}
