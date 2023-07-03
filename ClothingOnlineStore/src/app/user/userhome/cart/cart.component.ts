import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';
import { Cart } from './cart-model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit,OnDestroy {
  public products : Cart[] = new Array<Cart>();
  public productItems : Cart[] = new Array<Cart>();
  public grandTotal !: number;
  public removeProductItem  : Cart[] = new Array<Cart>();
  constructor(private cartService : CartService,
    private snackBar: MatSnackBar,private router:Router,) { }

  ngOnInit(): void {
    this.getAllCartItems();
  }

  removeItem(id: any) {
    this.cartService.removeCartItem(id).subscribe(res => {
      this.snackBar.open(`Item removed from the cart`, 'Ok', { duration: 3000 });
      this.cartService.getCartTotal();
      this.getAllCartItems();
    });
  }

  getAllCartItems(){
    this.cartService.getProductAddedInCart().subscribe((carts: Cart[]) =>{
      this.removeProductItem = [];
      this.products = carts;
      if (this.products && this.products.length > 0) {
        this.products.forEach((x) => {
          if (this.removeProductItem && this.removeProductItem.length > 0) {
            let index = this.removeProductItem.findIndex(y => y.productId == x.productId);
            if (index == -1) {
              this.removeProductItem.push(x)
            }
          }
          else {
            this.removeProductItem.push(x)
          }
        });
        this.products = this.removeProductItem;
      }
      else{
        this.products = [];
      }
    });
  }

  emptycart(){
    if(this.products && this.products.length > 0){
      this.products.forEach(x=>{
        if(x.id){
          this.cartService.removeCartItem(x.id).subscribe(res =>{
            this.snackBar.open(`Cart Cleared`,'Ok',{duration: 3000});
            this.cartService.getCartTotal();
            this.getAllCartItems();
          });
        }
      });
    }

    this.cartService.removeAllCart();
  }

  ngOnDestroy(){
    this.products = [];
    this.removeProductItem = [];
  }

}
