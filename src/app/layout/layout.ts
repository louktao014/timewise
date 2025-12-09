import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-layout',
  imports: [RouterModule],
  templateUrl: './layout.html',
  styleUrls: ['./layout.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  public pageTitle = signal('Dashboard');
  public userService = inject(UserService);
  public isCollapsed = signal(true);

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let route = this.activatedRoute.firstChild;
        while (route?.firstChild) {
          route = route.firstChild;
        }
        return route?.snapshot.data['title'] || 'Dashboard';
      })
    ).subscribe(title => this.pageTitle.set(title));
  }

  logout() {
    this.userService.clearSession();
    this.router.navigate(['/login']);
  }

  toggleSidebar() {
    this.isCollapsed.update(value => !value);
  }
}
