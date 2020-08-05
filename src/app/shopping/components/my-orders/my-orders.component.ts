import { Component, OnInit } from '@angular/core';
import { OrderService } from 'shared/services/order.service';
import { AuthService } from 'shared/services/auth.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

  order$:any;
  constructor(
    private orderService: OrderService,
    private authService: AuthService) { 
     this.order$= this.authService.user$.pipe(switchMap(user => {
      if(user)
        return this.orderService.getOrdersByUserId(user.uid);
      else 
        return of(null);
     }));
    }

  ngOnInit(): void {
  }

}
