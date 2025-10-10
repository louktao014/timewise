import { ChangeDetectionStrategy, Component, signal, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { UserService } from '../../core/services/user.service';

interface TimeOffRequest {
  id: number;
  employeeName: string;
  startDate: Date;
  endDate: Date;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

@Component({
  selector: 'app-time-off',
  templateUrl: './time-off.html',
  styleUrls: ['./time-off.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, DatePipe]
})
export class TimeOffComponent {
  private userService = inject(UserService);

  public timeOffRequests = signal<TimeOffRequest[]>([
    {
      id: 1,
      employeeName: 'John Doe',
      startDate: new Date('2025-10-20'),
      endDate: new Date('2025-10-25'),
      reason: 'Vacation',
      status: 'Approved',
    },
    {
      id: 2,
      employeeName: 'Jane Smith',
      startDate: new Date('2025-11-01'),
      endDate: new Date('2025-11-03'),
      reason: 'Sick Leave',
      status: 'Pending',
    },
    {
      id: 3,
      employeeName: 'Peter Jones',
      startDate: new Date('2025-12-10'),
      endDate: new Date('2025-12-12'),
      reason: 'Personal',
      status: 'Rejected',
    },
  ]);

  public newRequest = signal<Partial<TimeOffRequest>>({});

  public pendingRequests = computed(() => {
    return this.timeOffRequests().filter((r) => r.status === 'Pending');
  });

  public approvedRequests = computed(() => {
    return this.timeOffRequests().filter((r) => r.status === 'Approved');
  });

  public rejectedRequests = computed(() => {
    return this.timeOffRequests().filter((r) => r.status === 'Rejected');
  });

  public addRequest(): void {
    const newId = Math.max(...this.timeOffRequests().map(r => r.id)) + 1;
    const currentUser = this.userService.currentUser();
    const request: TimeOffRequest = {
      id: newId,
      employeeName: currentUser ? currentUser.name : 'New Employee',
      startDate: new Date(this.newRequest().startDate!),
      endDate: new Date(this.newRequest().endDate!),
      reason: this.newRequest().reason!,
      status: 'Pending',
    };
    this.timeOffRequests.update(requests => [...requests, request]);
    this.newRequest.set({});
  }

  public approveRequest(id: number): void {
    this.timeOffRequests.update(requests => 
      requests.map(r => r.id === id ? { ...r, status: 'Approved' } : r)
    );
  }

  public rejectRequest(id: number): void {
    this.timeOffRequests.update(requests => 
      requests.map(r => r.id === id ? { ...r, status: 'Rejected' } : r)
    );
  }
}
