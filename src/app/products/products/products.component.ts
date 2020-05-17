import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ProductDataService } from '@core/products/product-data.service';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '@core/products/product';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'sw-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource<Product>();
  loading: boolean= true;
  subscriptions =[];
  displayedColumns = ['imgUrl', 'name', 'price', 'action'];
  
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(private productDataService: ProductDataService) { }
  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  ngOnInit(): void {
    this.subscriptions.push
    (this.productDataService
      .getAllProducts()
      .subscribe(products => this.onDataLoad(products)))
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  onDataLoad(products){
    this.loading = false;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = products;
    
  }

}
