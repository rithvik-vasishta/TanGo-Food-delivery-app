import { Component, OnInit } from '@angular/core';
import { ProductDataService } from '@core/products/product-data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'sw-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Observable<any>;

  constructor(private ProductDataService: ProductDataService) { }

  ngOnInit(): void {
    this.products = this.ProductDataService.getAllProducts();
  }

}
