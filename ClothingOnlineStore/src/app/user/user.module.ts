import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { UserhomeComponent } from './userhome/userhome.component';
import { ProductComponent } from './userhome/product/product.component';
import { DetailsComponent } from './userhome/details/details.component';
import { FormsModule } from '@angular/forms';
import { AppModule } from '../app.module';
import { MaterialModule } from '../material/material.module';
import { TypefilterPipe } from '../pipes/typefilter.pipe';
import { CartComponent } from './userhome/cart/cart.component';
import { AddProductComponent } from './userhome/add-product/add-product.component';
import { ProductGridComponent } from './userhome/product-grid/product-grid.component';
import { MatIconModule } from '@angular/material/icon';

const route:Routes=[

  {
  path:"home",
  component: HomeComponent,
  children: [
    {
      path: "",
      component: UserhomeComponent
    },
    {
      path:"details",
      component: DetailsComponent
    },
    {
      path:"add-product",
      component: AddProductComponent
    }

  ]
}

]

@NgModule({
  declarations: [
    HomeComponent,
    UserhomeComponent,
    ProductComponent,
    DetailsComponent,
    TypefilterPipe,
    CartComponent,
    AddProductComponent,
    ProductGridComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    SharedModule,
    FormsModule,
    MaterialModule,
    MatIconModule

  ]
})
export class UserModule { }
