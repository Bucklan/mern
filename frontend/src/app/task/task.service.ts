import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpError } from 'http-errors';
import { Observable, catchError, throwError } from 'rxjs';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
private apiUrl = 'http://localhost:4000/tasks';

httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}
  constructor(private httpClient : HttpClient) {}
    getAll():Observable<any> 
    {
      return this.httpClient.get(this.apiUrl).pipe(catchError((error: HttpErrorResponse) => {
        return throwError(error);
      }));
    }

    create(task: Task): Observable<any> {
      return this.httpClient.post(this.apiUrl, JSON.stringify(task), this.httpOptions).pipe(catchError((error: HttpErrorResponse) => {
        return throwError(error);
      }));
    }
   

    find(id: number): Observable<any> {
      return this.httpClient.get(`${this.apiUrl}/${id}`).pipe(catchError((error: HttpErrorResponse) => {
        return throwError(error);
      }));
    }

    update(id: number, task: Task): Observable<any> {
      return this.httpClient.put(`${this.apiUrl}/${id}`, JSON.stringify(task), this.httpOptions).pipe(catchError((error: HttpErrorResponse) => {
        return throwError(error);
      }));
    }
    delete(id: number): Observable<any> {
      return this.httpClient.delete(`${this.apiUrl}/${id}`).pipe(catchError((error: HttpErrorResponse) => {
        return throwError(error);
      }));
    }
}
