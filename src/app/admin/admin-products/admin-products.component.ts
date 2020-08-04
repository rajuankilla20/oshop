import { Component, OnDestroy, ViewChild, OnInit } from '@angular/core'; 
import { Subscription } from 'rxjs'; 
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort'; 
import { Product } from 'app/models/Products';
import { ProductService } from 'app/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnDestroy , OnInit{

  displayedColumns = ['title', 'price', 'key'];
  dataSource: MatTableDataSource<Product>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  products: Product[]=[];  
  subscription: Subscription;  

  constructor(private productService: ProductService) {
     this.subscription=this.productService.getAll<Product>().subscribe(products =>
     { 
      this.products = products;  
      this.initializeTable(this.products);
     } );
   }
 
   ngOnInit(){ 
   }

    private initializeTable(products: Product[]) {
        this.dataSource = new MatTableDataSource(products); 
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    

   filter(query: string){
     let filterdProducts = (query)? 
          this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
          this.products;

          this.dataSource.data = filterdProducts;

          if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
          }
   }

   ngOnDestroy(){
     this.subscription.unsubscribe();
   }
 
}
