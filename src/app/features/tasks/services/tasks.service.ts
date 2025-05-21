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

  updateTask(id: string, task: any): Observable<any> {
    return this.http.put(API_ENDPOINTS.tasks.update(id), task);
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete(API_ENDPOINTS.tasks.delete(id));
  }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(API_ENDPOINTS.tasks.getAll).pipe(
      catchError((error) => {
        console.error('Error fetching tasks:', error);
        return of([]);
      })
    );
  }
}
