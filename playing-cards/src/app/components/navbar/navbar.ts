import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { Login } from '../../services/login/login';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  imports: [MatToolbar, RouterLink, MatButton],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  user;

  constructor(
    private router: Router,
    private loginService: Login
  ) {
    this.user = this.loginService.user;
  }

  logout() {
    this.loginService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      }
    });
  }
}