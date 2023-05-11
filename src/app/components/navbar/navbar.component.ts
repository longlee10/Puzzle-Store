import { Component } from '@angular/core';
import { AppUser } from 'src/app/models/app-user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  appUser: AppUser;
  isAdmin: boolean;
  itemCount: number;

  constructor(
    private auth: AuthenticationService,
    private cartService: ShoppingCartService
  ) {}
  // afAuth.authState.subscribe((user) => {
  //   this.user = user;
  // });

  async ngOnInit() {
    this.auth.appUser$.subscribe((appUser) => {
      if (appUser) {
        this.appUser = appUser;
        this.isAdmin = this.appUser.isAdmin;
      }
    });

    //Displaying number of items in cart on the nav bar
    let cart$ = (await this.cartService.getCart())
      .valueChanges()
      .subscribe((cart: any) => {
        this.itemCount = 0;
        for (let productId in cart.items)
          this.itemCount += cart.items[productId].quantity;
      });
  }

  logout() {
    this.auth.logout();
  }
}
