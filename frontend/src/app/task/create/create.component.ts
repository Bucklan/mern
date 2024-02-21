import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { TaskService } from '../task.service';
import {Router, RouterLink} from '@angular/router';
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatButton} from "@angular/material/button";
import {Task} from "../task";

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, MatFormField, MatInput, MatCheckbox, MatButton, FormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  title: string = '';
  description: string = '';
  status: boolean = false;

  constructor(private taskService: TaskService,private router: Router) {}

  onSubmit(): void {
    const newTask = {
      title: this.title,
      description: this.description,
      status: this.status
    };
    this.taskService.create(newTask as Task)
      .subscribe(() => {
        this.title = '';
        this.description = '';
        this.status = false;
        this.router.navigate(['/other-component']);
      });
  }
}
