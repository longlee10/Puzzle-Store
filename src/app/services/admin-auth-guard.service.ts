import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { map, switchMap, Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuardService {
  constructor(
    private auth: AuthenticationService,
    private userService: UserService
  ) {}

  canActivate(): Observable<boolean> {
    return this.auth.appUser$.pipe(map((appUser) => appUser.isAdmin));
  }
}
