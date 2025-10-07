import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  private router = inject(Router);
  private userService = inject(UserService);

  public username = signal('');
  public password = signal('');
  public errorMessage = signal<string | null>(null);

  login() {
    if (this.username() === 'dev' && this.password() === '1') {
      const user = { name: 'Admin User', email: 'admin@example.com' };
      this.userService.setSession(user);
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage.set('Invalid username or password');
    }
  }
}
