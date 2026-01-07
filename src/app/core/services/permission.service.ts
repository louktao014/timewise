import { Injectable, signal } from '@angular/core';

export interface Permissions {
  dashboard: boolean;
  employees: boolean;
  schedule: boolean;
  payroll: boolean;
  timeOff: boolean;
  settings: boolean;
}

export interface Role {
  name: string;
  permissions: Permissions;
}
@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  public roles = signal<Role[]>([
    {
      name: 'Admin',
      permissions: {
        dashboard: true,
        employees: true,
        schedule: true,
        payroll: true,
        timeOff: true,
        settings: true,
      },
    },
    {
      name: 'Manager',
      permissions: {
        dashboard: true,
        employees: true,
        schedule: true,
        payroll: false,
        timeOff: true,
        settings: false,
      },
    },
    {
      name: 'Employee',
      permissions: {
        dashboard: true,
        employees: false,
        schedule: false,
        payroll: false,
        timeOff: true,
        settings: false,
      },
    },
  ]);
}
