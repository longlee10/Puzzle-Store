import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUser } from 'src/app/models/app-user';
import { ShoppingCart } from 'src/app/models/shopping-cart';
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
  //cart$;

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

    // Displaying number of items in cart on the nav bar
    let cart$ = (await this.cartService.getCart())
      .valueChanges()
      .subscribe((cart: any) => {
        this.itemCount = 0;
        for (let productId in cart.items)
          this.itemCount += cart.items[productId].quantity;
      });

    // this.cart$ = await this.cartService.getCart();
    // console.log(this.cart$);
  }

  logout() {
    this.auth.logout();
  }
}
