import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../../Core/constants/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  constructor(private http: HttpClient) {}

  getProjects(): Observable<any> {
    return this.http.get(API_ENDPOINTS.projects.list);
  }

  createProject(project: any): Observable<any> {
    return this.http.post(API_ENDPOINTS.projects.create, project);
  }

  getProjectById(id: string): Observable<any> {
    return this.http.get(API_ENDPOINTS.projects.detail(id));
  }

  updateProject(id: string, project: any): Observable<any> {
    return this.http.put(API_ENDPOINTS.projects.update(id), project);
  }

  deleteProject(id: string): Observable<any> {
    return this.http.delete(API_ENDPOINTS.projects.delete(id));
  }

  getProjectTasks(id: string): Observable<any> {
    return this.http.get(API_ENDPOINTS.projects.tasks(id));
  }

  createProjectTask(id: string, task: any): Observable<any> {
    return this.http.post(API_ENDPOINTS.projects.create_task(id), task);
  }
}
