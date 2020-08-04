import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/order.service';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/order';

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
