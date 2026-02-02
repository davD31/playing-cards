import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';
import { Login as LoginService, Credentials } from '../../services/login/login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,      
    MatFormFieldModule,       
    MatInputModule,           
    MatButtonModule           
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnDestroy {

  private formBuilder = inject(FormBuilder);
  private loginService = inject(LoginService);
  private router = inject(Router);

  private loginSubscription: Subscription | null = null;

  loginFormGroup = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  invalidCredentials = false;

  login(event: Event) {
    event.preventDefault();

    if (this.loginFormGroup.valid) {
      this.loginSubscription = this.loginService.login(this.loginFormGroup.value as Credentials).subscribe({
        next: () => {  
          this.navigateHome();
        },
        error: error => {
          console.error('Erreur de connexion:', error);
          this.invalidCredentials = true;
        }
      });
    }
  }

  navigateHome() {
    this.router.navigate(['/home']);
  }

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
  }
}