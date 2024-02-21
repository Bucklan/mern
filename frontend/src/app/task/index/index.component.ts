import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';
import {MatCheckbox} from "@angular/material/checkbox";
import {MatList, MatListItem} from "@angular/material/list";
import {MatLine} from "@angular/material/core";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    MatList,
    MatListItem,
    MatCheckbox,
    MatLine,
    NgForOf,
    NgIf
  ],
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
