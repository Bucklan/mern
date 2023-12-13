import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {confirmPasswordValidator} from "../../validators/confirm-password.validator";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
fb = inject(FormBuilder);
authService = inject(AuthService);
router = inject(Router);

loginForm !: FormGroup;

  ngOnInit() {
    this.loginForm = this.fb.group({
        email: ['', Validators.compose([Validators.required, Validators.email])],
        password: ['', Validators.required],
      }
    );
  }

  login() {
    this.authService.loginService(this.loginForm.value)
      .subscribe({
        next: (result: any) => {
          localStorage.setItem('token', result.token);
          this.router.navigate(['/home']);
        },
        error: (error: any) => {
          console.log(error);
        },
      });
  }
}
