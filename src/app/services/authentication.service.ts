import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from '@firebase/auth';
import { Observable, switchMap, of } from 'rxjs';
import { AppUser } from '../models/app-user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  user$: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.user$ = afAuth.authState;
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.signInWithRedirect(new firebase.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.signOut();
    this.router.navigate(['/']);
  }

  get appUser$(): Observable<AppUser> {
    return this.user$.pipe(
      switchMap((user) => {
        if (user) return this.userService.get(user.uid).valueChanges();

        return of(null);
      })
    );
  }
}
