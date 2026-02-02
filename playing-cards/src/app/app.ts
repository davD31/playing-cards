import { Component, inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { Login as LoginService } from './services/login/login';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Navbar } from './components/navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    MatButtonModule, 
    MatIconModule, 
    MatToolbarModule,
    Navbar
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class App {

  private router = inject(Router);
  loginService = inject(LoginService); 

  logout() {
    this.loginService.logout().subscribe({
      next: () => {
        this.navigateToLogin();
      },
      error: (error) => {
        this.navigateToLogin();
      }
    });
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateHome() {
    this.router.navigate(['/home']);
  }
}