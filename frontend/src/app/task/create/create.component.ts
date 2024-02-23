import { Component } from '@angular/core';
import { TaskService } from '../task.service';
import {Router, RouterLink} from '@angular/router';
import {Task} from "../task";

@Component({
  selector: 'app-create',
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
