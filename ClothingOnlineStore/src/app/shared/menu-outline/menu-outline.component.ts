import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LogService } from 'src/app/services/log.service';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { TranslateService } from '../services/translate.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-menu-outline',
  templateUrl: './menu-outline.component.html',
  styleUrls: ['./menu-outline.component.css']
})
export class MenuOutlineComponent implements OnInit {

  selected="All";
  prodlist:any;


cartshow:boolean=true;
cartCount:number=1;
username:any=""
  constructor(private log:LogService,private router:Router,private route:ActivatedRoute,ps:ProductService,
    public cartSerive: CartService,
    private translateService: TranslateService,
    public userService: UserService) {
    ps.getProducts().subscribe(
      {
        next: (data:any) => this.prodlist = data,
        error:()=>this.prodlist = []
      }
    )

    this.cartSerive.getCartTotal();
  }

  ngOnInit(): void {
    let usertype=sessionStorage.getItem("usertype");
    this.username=sessionStorage.getItem("username");
    if(usertype=="admin")
     this.cartshow=false;
    let cart=localStorage.getItem("cart");
    if(cart)
       this.cartCount=JSON.parse(cart).length;
    else
       this.cartCount=0;
  }

  navigate(url:string){

    if(url=="")
    window.location.reload()
    else
    this.router.navigate([url], {relativeTo:this.route});
  }
  logout(){
    this.log.logout();
    window.location.reload();
  }

  setLanguage(lang: string){
    this.translateService.language = lang;
    this.translateService.refreshMessageBundle();
  }
}
