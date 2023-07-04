import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product:any;
  @Output() updateProductList = new EventEmitter<boolean>();

  constructor(public router:Router,public route:ActivatedRoute,
    private productService: ProductService,
    private snackBar: MatSnackBar,
    public userService: UserService) { }

  ngOnInit(): void {
  }

   changeRoute(){
     this.router.navigate(['details'],{relativeTo:this.route,state:this.product});
   }

   deleteProduct(id){
      this.productService.deleteProduct(id).subscribe(res =>{
         this.snackBar.open(`Product with Id-${id} id deleted`,'Ok',{duration: 3000});
         this.updateProductList.emit(true);
      });
   }
}
