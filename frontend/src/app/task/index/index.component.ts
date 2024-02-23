import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getAll()
      .subscribe(tasks => this.tasks = tasks);
  }

  deleteTask(id: number): void {
    this.taskService.delete(id)
      .subscribe(() => {
        this.tasks = this.tasks.filter(task => task._id !== id);
      });
  }

  editTask(task: Task): void {
    this.taskService.update(task._id, task)
      .subscribe(() => {
        this.getTasks();
      });
  }
}
