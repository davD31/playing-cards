import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { authTokenInterceptor } from './intercerptors/auth-token-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),       
    provideAnimations(),           
    provideHttpClient(withInterceptors([authTokenInterceptor]))
  ]
};