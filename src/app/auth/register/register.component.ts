import { Component, OnInit } from '@angular/core';
import { Register } from 'src/app/shared/models/register';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  register: Register = {};
  loading = false;
  errorMessage = "";
  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  async onSubmit(register: Register) {
    try {
      this.loading = true;
      const user = await this.auth.register(register);
      this.router.navigate(['/login']);
    } catch (e) {
      this.errorMessage = e.message;
    } finally {
      this.loading = false;
    }
  }

}
