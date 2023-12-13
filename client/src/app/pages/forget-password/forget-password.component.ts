import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit{
  forgetForm !: FormGroup;

  fb = inject(FormBuilder);

  ngOnInit() {
    this.forgetForm = this.fb.group({
        email: ['', Validators.compose([Validators.required, Validators.email])],
      }
    );
  }
  submit() {
    console.log(this.forgetForm.value);
  }

}
