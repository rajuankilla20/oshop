  import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ProductFilterComponent } from './components/products/product-filter/product-filter.component';
import { ShoppingCartSummaryComponent } from './components/shopping-cart-summary/shopping-cart-summary.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { SharedModule } from 'shared/shared.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';



@NgModule({
  declarations: [
    ProductsComponent,    
    ShoppingCartComponent,
    CheckOutComponent,
    MyOrdersComponent, 
    OrderSuccessComponent, 
    ProductFilterComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    RouterModule.forChild([
      { 
        path: 'products', 
        component: ProductsComponent
      },
      { 
        path: 'shopping-cart', 
        component: ShoppingCartComponent
      },
      { 
        path: 'check-out', 
        component: CheckOutComponent, 
        canActivate: [AuthGuard] 
      },
      { 
        path: 'order-success/:id', 
        component: OrderSuccessComponent, 
        canActivate: [AuthGuard]
      },
      { 
        path: 'my/orders', 
        component: MyOrdersComponent, 
        canActivate: [AuthGuard]
      }, 
    ])
  ]
})
export class ShoppingModule { }
