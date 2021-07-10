import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, tap, take } from 'rxjs/operators';

@Injectable({providedIn:'root'})
export class AuthGurd implements CanActivate{

  constructor(
    private authservice: AuthService,
    private router: Router) {}

canActivate
(
  route: ActivatedRouteSnapshot,
  router: RouterStateSnapshot
): boolean | UrlTree | Promise<boolean> | Observable<boolean | UrlTree>{
    return this.authservice.user.pipe(
      take(1),
      map(user => {
      const isAuth = !!user;
      if (isAuth) {
        return true;
      }
      return this.router.createUrlTree(['auth']);
      // anyone approch we can go
  //   }), tap(isAuth =>{
  //     if (!isAuth)
  //     {
  //       this.router.navigate(['/auth']);
  //     }
  // })
    }));
  }
}
