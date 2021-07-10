import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import {throwError, BehaviorSubject} from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root'})
export class AuthService {

  // diffrence btw BehaviorSubject vs Subject
  user = new BehaviorSubject<User>(null);
  // token: string = null;
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router ) {}


signup(email: string, password: string) {
 return this.http
  .post<AuthResponseData>(
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseApikEY,
    {
      email: email,
      password: password,
      returnSecureToken: true
     }
  ).pipe(catchError(this.handelError),
  tap(resData => {
    // +resData.expiresIn treat as a string
    this.handelAuthentication(
      resData.email,
      resData.localId,
      resData.idToken,
      +resData.expiresIn
      );
  }));
 }

 login(email: string, password: string) {

  return this.http.post<AuthResponseData>(
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseApikEY,
    {
      email: email,
      password: password,
      returnSecureToken: true
     }
    ).pipe(
      catchError(this.handelError),
      tap( resData => {
      this.handelAuthentication(
        resData.email,
        resData.localId,
        resData.idToken,
        +resData.expiresIn
        );
      })
    );
 }

autoLogin() {
  const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string

  } = JSON.parse(localStorage.getItem('userData'));
  if(!userData){
    return;
  }
  const loadedUser = new User(
    userData.email,
    userData.id,
    userData._token,
    new Date(userData._tokenExpirationDate)
    );

    if(loadedUser.token){
     this.user.next(loadedUser);
     const expirationDurations = new Date(
       userData._tokenExpirationDate).getTime()
     - new Date().getTime();
     this.autoLogout(expirationDurations);
    }
}

logout() {
  this.user.next(null);
  this.router.navigate(['/auth']);
  localStorage.removeItem('userData');
  if (this.tokenExpirationTimer) {
   clearTimeout(this.tokenExpirationTimer);
  }
  this.tokenExpirationTimer = null;
}

autoLogout(expirationDuration: number) {
  console.log(expirationDuration);
  this.tokenExpirationTimer = setTimeout(() => {
    this.logout();
  }, expirationDuration);
}

private handelAuthentication(email: string, userId: string, token: string, expiresIn: number) {
  const expirationDate = new Date(
    new Date().getTime() + expiresIn + 1000);
  const user = new User( email, userId, token, expirationDate );
  this.user.next(user);
  this.autoLogout(expiresIn * 1000);
  localStorage.setItem('userData', JSON.stringify(user));
 }


 private handelError(errorRes: HttpErrorResponse) {

  let errorMessage = 'An unknown error occurred!';
  if (!errorRes.error || !errorRes.error.error) {
    return throwError(errorMessage);
  }
  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'This email exists already';
      break;
    case 'EMAIL_NOT_FOUND':
        errorMessage = 'No record Found';
        break;
    case 'INVALID_PASSWORD':
        errorMessage = 'The password is invalid';
        break;
  }
  return throwError(errorMessage);
 }
}
