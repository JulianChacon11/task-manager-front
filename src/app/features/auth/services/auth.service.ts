import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../../Core/constants/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

login(username: string, password: string): Observable<any> {
  const credentials = { username, password };
  return this.http.post<{ token: string }>(API_ENDPOINTS.auth.login, credentials).pipe(
    tap(response => localStorage.setItem('token', response.token))
  );
}

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
