import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { LoginComponent } from './components/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuardService } from './services/auth-guard.service';
import { ManageProductsComponent } from './components/admin/manage-products/manage-products.component';
import { ManagerOrdersComponent } from './components/admin/manager-orders/manager-orders.component';
import { UserService } from './services/user.service';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { ProductFormComponent } from './components/admin/product-form/product-form.component';
import { CategoriesService } from './services/categories.service';
import { ProductService } from './services/product.service';
import { ProductFilterComponent } from './components/product-filter/product-filter.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ShoppingCartService } from './services/shopping-cart.service';
import { HeartComponent } from './components/heart/heart.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { CustomProductsComponent } from './components/custom-products/custom-products.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    LoginComponent,
    ManageProductsComponent,
    ManagerOrdersComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent,
    HeartComponent,
    WishListComponent,
    CustomProductsComponent,
    ProductQuantityComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    Ng2SearchPipeModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot([
      { path: '', component: ProductsComponent },
      {
        path: 'products',
        component: ProductsComponent,
      },
      { path: 'custom-puzzle', component: CustomProductsComponent },
      {
        path: 'shopping-cart',
        component: ShoppingCartComponent,
      },
      {
        path: 'wish-list',
        component: WishListComponent,
        canActivate: [AuthGuardService],
      },
      { path: 'login', component: LoginComponent },
      {
        path: 'check-out',
        component: CheckOutComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'order-success',
        component: OrderSuccessComponent,
        canActivate: [AuthGuardService],
      },

      {
        path: 'my-orders',
        component: MyOrdersComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'admin/manage-orders',
        component: ManagerOrdersComponent,
        canActivate: [AuthGuardService, AdminAuthGuardService],
      },
      {
        path: 'admin/manage-products/new',
        component: ProductFormComponent,
        canActivate: [AuthGuardService, AdminAuthGuardService],
      },
      {
        path: 'admin/manage-products/:key',
        component: ProductFormComponent,
        canActivate: [AuthGuardService, AdminAuthGuardService],
      },
      {
        path: 'admin/manage-products',
        component: ManageProductsComponent,
        canActivate: [AuthGuardService, AdminAuthGuardService],
      },
    ]),
    NgbModule,
  ],
  providers: [
    AuthenticationService,
    AuthGuardService,
    AdminAuthGuardService,
    UserService,
    CategoriesService,
    ProductService,
    ShoppingCartService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
