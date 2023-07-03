import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { product } from 'src/app/models/types';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.css']
})
export class ProductGridComponent implements OnInit {

  @Input() filter: string;
  
  displayedColumns: string[] = ['id', 'name', 'type', 'price','description','edit','delete'];
  products: product[];

  dataSource = new MatTableDataSource<product>([]);

  constructor(private prodcutService: ProductService,private router:Router, private CartService:CartService,
    private snackBar: MatSnackBar,private productservice:ProductService) { }

  ngOnChanges(changes: SimpleChanges){
    if(changes["filter"]){
      let value = changes["filter"].currentValue;
      if(this.products){
        if(!value || value == "All") this.dataSource = new MatTableDataSource(this.products);
        else {
          let filteredProducts = this.products.filter(x => x.type == value);
          this.dataSource = new MatTableDataSource(filteredProducts);
        }
      }
    }
  }
  
  ngOnInit() {

    this.getProducts();
  }
  edit(e){
    this.CartService.editProduct = e;
    this.CartService.checkButtons = true;
    this.router.navigate(['/user/home/add-product']);
  }

  delete(e){
      if(e.id){
        this.productservice.deleteProduct(e.id).subscribe(res =>{
          this.snackBar.open(`One Item Deleted`,'Ok',{duration: 3000});
          this.getProducts();
        });
      }
  }


  getProducts(){
    this.prodcutService.getProducts().subscribe( {
      next: (data:product[])=>{
        this.products = data;
        this.dataSource = new MatTableDataSource(data);
      },
      error: ()=> this.products = []
     }
     )
  }

}
