import { Component, OnInit } from '@angular/core';   
import { OrderService } from 'shared/services/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {

  order$:any;
  constructor(private orderService: OrderService) { 
    let x = this.orderService.getOrders();
    console.log(x);
    this.order$ =  x;
  }

  ngOnInit(): void {
  }

}
