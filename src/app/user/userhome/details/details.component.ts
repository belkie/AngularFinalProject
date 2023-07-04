import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from 'src/app/models/types';
import { ApiService } from 'src/app/shared/services/api.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { Cart } from '../cart/cart-model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  state?:any;
  qty:any='';
  buttonstatus:string="Add to the Cart";
  active:boolean=true;
  products: any;
  searchKey: any;
  filterCategory: any;
  cart: Cart = new Cart();
  public checkItem : Cart[] = new Array<Cart>();
  CheckDuplicateDateItem:boolean=false;

   constructor(private route:ActivatedRoute,
    private router:Router,
     private api : ApiService ,
    private cartService: CartService,
    private _snackBar: MatSnackBar) {
     this.state=this.router.getCurrentNavigation()?.extras.state;
     if(this.state){
      this.cart.productId = this.state.id;
      this.cart.description = this.state.description;
      this.cart.image = this.state.image;
      this.cart.name = this.state.name;
      this.cart.price = this.state.price;
      this.cart.quantity = 1;
      this.cart.type = this.state.type;
     }
   }

  ngOnInit(): void {
    this.api.getProduct()
    .subscribe(res=>{
      this.products = res;
      this.filterCategory = res;
      this.products.forEach((a:any) => {
        if(a.category ==="men" || a.category ==="women"){
          a.category ="kid"
        }
        Object.assign(a,{quantity:1,total:a.price});
      });
      console.log(this.products)
    });

    this.cartService.search.subscribe((val:any)=>{
      this.searchKey = val;
    })
  }

  filter(category:string){
    this.filterCategory = this.products
    .filter((a:any)=>{
      if(a.category == category || category==''){
        return a;
      }
    })
  }

  addtocart(){
    if(!this.cart.quantity) {
      this._snackBar.open("Please enter quantity",'Ok',{duration: 2 * 1000});
      return ;
    }
    this.cartService.getProductAddedInCart().subscribe((res: Cart[]) =>{
      if(res && res.length > 0){
        res.forEach((x)=>{
          if(x.productId == this.cart.productId){
            x.quantity = x.quantity + this.cart.quantity;
            x.price = (this.cart.price*x.quantity );
            this.cartService.updateCart(x,x.id).subscribe(res=>{
              this.CheckDuplicateDateItem = true;
              this._snackBar.open(`${this.cart.name} is added to cart`,'Ok',{duration: 2 * 1000});
              this.router.navigate(['/user/home'])
              
            })
          }
        });
        if(this.cart && !this.CheckDuplicateDateItem){

          this.cartService.addToCart({model: this.cart}).subscribe(res => {
            this._snackBar.open(`${this.cart.name} is added to cart`,'Ok',{duration: 2 * 1000});
            this.router.navigate(['/user/home'])
          });
        }
      }
      else{
        this.cart.price = this.cart.price * this.cart.quantity;
        this.cartService.addToCart({model: this.cart}).subscribe(res => {
          this._snackBar.open(`${this.cart.name} is added to cart`,'Ok',{duration: 2 * 1000});
          this.router.navigate(['/user/home'])
        });
      }
    });
  
  }
}
