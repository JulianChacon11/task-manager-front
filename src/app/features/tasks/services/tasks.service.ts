import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../../Core/constants/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor(private http: HttpClient) {}

  updateTask(id: string, task: any): Observable<any> {
    return this.http.put(API_ENDPOINTS.tasks.update(id), task);
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete(API_ENDPOINTS.tasks.delete(id));
  }
}
