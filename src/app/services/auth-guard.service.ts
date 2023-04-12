import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(private auth: AuthenticationService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.auth.user$.pipe(
      map((user) => {
        if (user) return true;
        else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
