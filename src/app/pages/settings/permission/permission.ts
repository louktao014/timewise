import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

interface Permissions {
  dashboard: boolean;
  employees: boolean;
  schedule: boolean;
  payroll: boolean;
  timeOff: boolean;
  settings: boolean;
}

interface Role {
  name: string;
  permissions: Permissions;
}

@Component({
  selector: 'app-permission',
  templateUrl: './permission.html',
  styleUrls: ['./permission.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PermissionComponent {
  public roles = signal<Role[]>([
    { 
      name: 'Admin', 
      permissions: { 
        dashboard: true, 
        employees: true, 
        schedule: true, 
        payroll: true, 
        timeOff: true, 
        settings: true 
      } 
    },
    { 
      name: 'Manager', 
      permissions: { 
        dashboard: true, 
        employees: true, 
        schedule: true, 
        payroll: false, 
        timeOff: true, 
        settings: false 
      } 
    },
    { 
      name: 'Employee', 
      permissions: { 
        dashboard: true, 
        employees: false, 
        schedule: true, 
        payroll: false, 
        timeOff: true, 
        settings: false 
      } 
    },
  ]);

  public permissionKeys = Object.keys(this.roles()[0].permissions) as (keyof Permissions)[];

  public togglePermission(roleName: string, permissionKey: keyof Permissions): void {
    this.roles.update(roles => {
      const role = roles.find(r => r.name === roleName);
      if (role) {
        role.permissions[permissionKey] = !role.permissions[permissionKey];
      }
      return roles;
    });
  }
}
