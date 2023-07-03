import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Product } from './product-model';
import { ProductService } from 'src/app/shared/services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit,OnDestroy {
  CheckBtnLabel:boolean= true;
  types=[
    "Women",
    "Men",
    "Kid"
  ]
  model: Product = new Product();


  constructor(private productService: ProductService,
    private snackbar: MatSnackBar,
    private route: Router, private CartService:CartService) {    }

  ngOnInit() {
    if(this.CartService.editProduct && this.CartService.checkButtons){
      this.CheckBtnLabel = false;
      this.CartService.setFocus("fname");
      let editItem = new Product();
      editItem.name = this.CartService.editProduct['name']
      editItem.type = this.CartService.editProduct['type']
      editItem.price = this.CartService.editProduct['price']
      editItem.image = this.CartService.editProduct['image']
      editItem.description = this.CartService.editProduct['description']
      editItem.quantity = this.CartService.editProduct['quantity'];
      editItem.id = this.CartService.editProduct['id'];
      this.model = editItem;   
    }
    else{
      this.CheckBtnLabel = true;
      this.CartService.setFocus("fname");
    }
    
  }

  ngOnDestroy(){
    this.CartService.editProduct = null;
    this.CartService.checkButtons = false;
  }

  onSubmit(data){
    if(this.CartService.checkButtons){
      this.productService.updateProduct(this.model,this.model.id).subscribe(res => {
        this.snackbar.open("Updated Successfully","Ok",{duration: 2000});
        this.route.navigate(['/user/home'])
      });
    }
    else{
      this.productService.addProduct({model: data.value}).subscribe(res => {
        this.snackbar.open("Dress Added Successfully","Ok",{duration: 2000});
        this.route.navigate(['/user/home'])
      });
    }
  }
}
