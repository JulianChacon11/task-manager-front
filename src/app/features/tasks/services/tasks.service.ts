import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { API_ENDPOINTS } from '../../../Core/constants/api-endpoints';
import { Task } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private http = inject(HttpClient);


  deleteTask(id: string): Observable<any> {
    return this.http.delete(API_ENDPOINTS.tasks.delete(id));
  }

  createTask( task: Task) {
    return this.http.post<Task>(API_ENDPOINTS.tasks.create, task).pipe(
      catchError((error) => {
        console.error('Error creating task:', error);
        return of(null);
      })
    );
  }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(API_ENDPOINTS.tasks.getAll).pipe(
      catchError((error) => {
        console.error('Error fetching tasks:', error);
        return of([]);
      })
    );
  }

  getProjectTasks(id: string): Observable<Task[]> {
    return this.http.get<Task[]>(API_ENDPOINTS.projects.tasks(id)).pipe(
      catchError((error) => {
        console.error('Error fetching project tasks:', error);
        return of([]);
      })
    );
  }

  updateTask( task: Task ) {
    return this.http.put<Task>(API_ENDPOINTS.tasks.update(), task).pipe(
      catchError((error) => {
        console.error('Error updating task:', error);
        return of(null);
      })
    );
  }
}
