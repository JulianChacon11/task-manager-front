import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../../Core/constants/api-endpoints';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

/*login(username: string, password: string): Observable<any> {
  // Simulación de login exitoso
  const fakeToken = 'fake-jwt-token';
  localStorage.setItem('token', fakeToken);
  return of({ token: fakeToken });
}*/
  login(correo: string, password: string): Observable<any> {
    const credentials = { correo, password };
    return this.http.post<{ token: string, id: string }>(API_ENDPOINTS.auth.login, credentials).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.id);
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');    
    localStorage.removeItem('userId');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
