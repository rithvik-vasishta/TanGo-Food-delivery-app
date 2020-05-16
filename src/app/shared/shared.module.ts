import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout'
import { SharedRoutingModule } from './shared-routing.module';
import { RouterModule } from '@angular/router';
import { SwigMaterialModule } from './material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
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
  ]
})
export class SharedModule { }
