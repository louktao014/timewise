import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { PermissionService } from '../../../core/services/permission.service';

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
  public permissionService = inject(PermissionService);
  public roles = this.permissionService.roles;

  public permissionKeys = Object.keys(this.roles()[0].permissions) as (keyof Permissions)[];

  public togglePermission(roleName: string, permissionKey: keyof Permissions): void {
    this.roles.update((roles) =>
      roles.map((role) =>
        role.name === roleName
          ? {
              ...role,
              permissions: {
                ...role.permissions,
                [permissionKey]: !role.permissions[permissionKey],
              },
            }
          : role
      )
    );
  }
}
