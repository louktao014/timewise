import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { PermissionComponent } from './permission/permission';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.html',
  styleUrls: ['./settings.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PermissionComponent]
})
export class SettingsComponent {
  public activeTab = signal('permission');
}
