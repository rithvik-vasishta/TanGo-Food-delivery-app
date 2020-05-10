import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products/products.component';
import { ProductDataService } from './product-data.service';
import { HttpClientModule } from '@angular/common/http';
import { SwigMaterialModule } from '../material-module';


@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    HttpClientModule,
    SwigMaterialModule
  ],
  providers:[ ProductDataService]
})
export class ProductsModule { }
