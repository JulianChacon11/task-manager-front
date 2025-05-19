import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private baseUrl = 'http://localhost:4200/api/projects';

  constructor(private http: HttpClient) { }

  getProjects(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getProjectById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createProject(project: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, project);
  }

  updateProject(id: number, project: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, project);
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getProjectTasks(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}/tasks`);
  }

  createProjectTask(id: number, task: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${id}/tasks`, task);
  }
}
