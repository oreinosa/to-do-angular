import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Observable } from 'rxjs';
import { Link } from './shared/models/link';
import { User } from './shared/models/user';
import { NotesService } from './notes/notes.service';
import { ListsService } from './lists/lists.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'to-do-angular';
  links$: Observable<Link[]>;
  user$: Observable<User>;
  constructor(
    private auth: AuthService,
    private notes: NotesService,
    private lists: ListsService
  ) {

  }

  ngOnInit() {
    this.links$ = this.auth.getLinks();
    this.user$ = this.auth.getUser()
      .pipe(
        tap(async user => {
          if (user) {
            const promises = [this.notes.getAll(), this.lists.getAll()];
            await Promise.all(promises);
          }
        }));
  }

  onLogout() {
    this.auth.logout();
  }
}
