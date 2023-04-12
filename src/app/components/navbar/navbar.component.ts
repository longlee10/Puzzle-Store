import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(public auth: AuthenticationService) {
    // afAuth.authState.subscribe((user) => {
    //   this.user = user;
    // });
  }
  logout() {
    this.auth.logout();
  }
}
