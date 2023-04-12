import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import * as firebase from '@firebase/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.user$ = afAuth.authState;
  }

  login() {
    this.afAuth.signInWithRedirect(new firebase.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.signOut();
    this.router.navigate(['/']);
  }
}
