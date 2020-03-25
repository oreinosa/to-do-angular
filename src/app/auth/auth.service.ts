import { Injectable } from '@angular/core';
import { User } from '../shared/models/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Link } from '../shared/models/link';
import { Login } from '../shared/models/login';
import { Register } from '../shared/models/register';
import { map, catchError, tap, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = environment.api;
  private defaultLinks = [
    { path: "login", label: "Login", },
    { path: "register", label: "Register" }
  ];
  private userLinks = [
    { path: "profile", label: "Profile", },
  ];

  private links = new BehaviorSubject(this.defaultLinks);

  private userSubject = new BehaviorSubject<User>(null);

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.initUser();
  }

  setup(user: User) {
    this.userSubject.next(user);
    if (user) {
      this.links.next(this.userLinks);
    } else {
      this.links.next(this.defaultLinks);
    }
  }

  getCurrentUser(): User {
    return this.userSubject.getValue();
  }

  getUser(): Observable<User> {
    return this.userSubject
      .asObservable()
      .pipe(
        shareReplay(),
      );
  }

  getLinks(): Observable<Link[]> {
    return this.links.asObservable();
  }

  login(login: Login) {
    return this.http
      .post(`${this.api}/auth/login`, login)
      .pipe(
        tap((res: any) => this.setToken(res.data.token)),
        map((res: any) => res.data.user as User),
        tap(user => this.setup(user))
      )
      .toPromise();
  }

  logout() {
    this.setToken(null);
    this.setup(null);
  }

  register(register: Register) {
    return this.http
      .post(`${this.api}/auth/register`, register)
      .pipe(
        map((res: any) => res.data as User),
      )
      .toPromise();
  }

  getToken() {
    return localStorage.getItem('token');
  }

  setToken(token) {
    localStorage.setItem('token', token);
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  private async initUser() {
    try {
      const user = await this.http
        .get(`${this.api}/auth/current`)
        .pipe(
          map((res: any) => res.data as User)
        )
        .toPromise();
      this.setup(user);
      this.router.navigate(['/']);
    } catch (e) {
      console.log('Please login to have access');
      // this.router.navigate(['login']);
    }
  }
}
