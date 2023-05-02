import { Component } from '@angular/core';
import { AppUser } from 'src/app/models/app-user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  appUser: AppUser;
  isAdmin: boolean;

  constructor(public auth: AuthenticationService) {
    // afAuth.authState.subscribe((user) => {
    //   this.user = user;
    // });
    auth.appUser$.subscribe((appUser) => {
      if (appUser) {
        this.appUser = appUser;
        this.isAdmin = this.appUser.isAdmin;
      }
    });
  }
  logout() {
    this.auth.logout();
  }
}
