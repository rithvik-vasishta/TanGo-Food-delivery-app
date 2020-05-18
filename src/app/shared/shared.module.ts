import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout'
import { SharedRoutingModule } from './shared-routing.module';
import { RouterModule } from '@angular/router';
import { SwigMaterialModule } from './material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartItemsCountComponent } from './cart/cart-items-count/cart-items-count.component';


@NgModule({
  declarations: [CartItemsCountComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    RouterModule,
    SwigMaterialModule
  ],
  exports:[
    SwigMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FlexLayoutModule,
    CartItemsCountComponent
  ]
})
export class SharedModule { }
