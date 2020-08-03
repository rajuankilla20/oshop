import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service'; 
import { AppUser } from '../models/AppUser';
import { ShoppingCartService } from '../shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';

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
