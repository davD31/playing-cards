import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model';
import { map, Observable, tap } from 'rxjs';

export interface Credentials {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class Login {

  private http = inject(HttpClient);
  private BASE_URL = 'http://localhost:8000';

  user = signal<User | null | undefined>(undefined);

  login(credentials: Credentials): Observable<{ token: string }> {
    console.log('URL appelée:', `${this.BASE_URL}/api/login`);
    return this.http.post<{ token: string }>(`${this.BASE_URL}/api/login`, credentials)
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
          this.getUser().subscribe(user => this.user.set(user));
        })
      );
  }

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.BASE_URL}/api/me`);
  }

  logout(): Observable<void> {
    
    localStorage.removeItem('token');
    
    this.user.set(null);
    
    return this.http.post<void>(`${this.BASE_URL}/api/logout`, {});
  }
}