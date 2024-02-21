import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../task';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
id!: number;
task!: Task;
form!: FormGroup;
constructor(public taskService: TaskService,private router: Router,
  private route: ActivatedRoute){}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['taskId'];
    this.taskService.find(this.id).subscribe((data: Task) => {
      this.task = data;
    });


  this.form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });
}
  get f(){
    return this.form.controls;
  }

  submit(){
    this.taskService.update(this.id, this.form.value).subscribe(res => {
      console.log('Task updated successfully!');
     alert('Task updated successfully!');
     this.router.navigateByUrl('task/index');
    });
  }
}
