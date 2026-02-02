import { HttpInterceptorFn } from '@angular/common/http';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem('token');

  let requestTosend = req;

  if (token) {
    const headers = req.headers.set('Authorization', 'Bearer ' + token);
    requestTosend = req.clone({
      headers: headers,
    })
  }

  return next(requestTosend);
};