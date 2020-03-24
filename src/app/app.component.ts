import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Observable } from 'rxjs';
import { Link } from './shared/models/link';
import { User } from './shared/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'to-do-angular';
  links$: Observable<Link[]>;
  user$: Observable<User>;
  constructor(
    private auth: AuthService
  ) {
    this.links$ = this.auth.getLinks();
    this.user$ = this.auth.getUser();
  }

  onLogout() {
    this.auth.logout();
  }
}
