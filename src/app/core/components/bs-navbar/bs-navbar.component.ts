import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'shared/services/auth.service'; 
import { AppUser } from 'shared/models/AppUser';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})
export class BsNavbarComponent implements OnInit  {
 
  appUser: AppUser; 
  cart$: Observable<ShoppingCart>;

  constructor(
      private auth: AuthService,
      private shoppingCartService: ShoppingCartService 
      ) { }

  async ngOnInit()  { 
    this.cart$ = await this.shoppingCartService.getCart();
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }
 

  logout(){
    this.auth.logout(); 
  }

}
