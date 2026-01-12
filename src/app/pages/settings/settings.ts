import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { PermissionComponent } from './permission/permission';
import { DocumentManagementComponent } from './document-management/document-management';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.html',
  styleUrls: ['./settings.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PermissionComponent, DocumentManagementComponent],
})
export class SettingsComponent {
  public activeTab = signal('documents');
}
