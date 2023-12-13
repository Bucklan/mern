import {Component, inject, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {confirmPasswordValidator} from "../../validators/confirm-password.validator";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  fb = inject(FormBuilder);
  authService = inject(AuthService);
  registerForm !: FormGroup;

  ngOnInit() {
    this.registerForm = this.fb.group({
        email: ['', Validators.compose([Validators.required, Validators.email])],
        password: ['', Validators.required],
        fullName: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        birthdate: ['', Validators.required],
      },
      {
        validator: confirmPasswordValidator('password', 'confirmPassword')
      }
    );
  }

  register() {
    this.authService.registerService(this.registerForm.value)
      .subscribe({
        next: (result: any) => {
          alert('user created successfully');
        },
        error: (error: any) => {
          console.log(error);
        },
      });
  }
}
