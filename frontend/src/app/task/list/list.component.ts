import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';
import {MatCard, MatCardActions, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    MatCardTitle,
    MatCardContent,
    MatCard,
    MatCardActions,
    MatButton,
    CommonModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
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
    console.log(id);
    this.taskService.delete(id)
      .subscribe(() => {
        this.tasks = this.tasks.filter(task => task.id !== id);
      });
  }

  editTask(task: Task): void {
    this.taskService.update(task.id, task)
      .subscribe(() => {
        this.getTasks();
      });
  }
}
