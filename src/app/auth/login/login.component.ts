import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/shared/models/login';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login: Login = {
    email: "test@test.com",
    password: "password123"
  };
  errorMessage = "";
  loading = false;
  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  async onSubmit(login: Login) {
    try {
      this.loading = true;
      const user = await this.auth.login(login);
      this.router.navigate(['/']);
    } catch (e) {
      this.errorMessage = e.message;
    } finally {
      this.loading = false;
    }
  }

}
