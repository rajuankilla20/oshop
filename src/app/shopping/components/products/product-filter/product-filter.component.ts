import { Component, OnInit, Input } from '@angular/core'; 
import { CategoryService } from 'shared/services/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent implements OnInit {
  categories$;
  @Input('category') category;

  constructor( categoriesService: CategoryService) {
    this.categories$ = categoriesService.getCategories().snapshotChanges();
   }

  ngOnInit(): void {
  }

}
