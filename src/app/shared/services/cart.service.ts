import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from 'src/app/user/userhome/cart/cart-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  public cartItemList : any =[]
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");
  public cartItemsTotal: number = 0;
  public editProduct = new BehaviorSubject<any>([]);
  public checkButtons:boolean = false;

  constructor(private http: HttpClient) { }
  getProducts(){
    return this.productList.asObservable();
  }

  getProductAddedInCart(){
    return this.http.get<Cart[]>(`${environment.apiUrl}/carts`);
  }

  getCartTotal(){
    this.http.get<Cart[]>(`${environment.apiUrl}/carts`).subscribe(res =>{
      if(res && res.length > 0) 
        this.cartItemsTotal = res.length;
      else this.cartItemsTotal = 0;
    });
  }

  addToCart<T>({ model }: { model: T; headers?: HttpHeaders; }): Observable<T> {

    return this.http.post<T>(`${environment.apiUrl}/carts`, JSON.stringify(model), { headers: this.headers });
  }

  public updateCart(product: any,id: any):Observable<any>{

    return this.http.put(`${environment.apiUrl}/carts/${id}`,product,{ headers: this.headers });
  }


  setProduct(product : any){
    this.cartItemList.push(...product);
    this.productList.next(product);
  }
  
  getTotalPrice() : number{
    let grandTotal = 0;
    this.cartItemList.map((a:any)=>{
      grandTotal += a.total;
    })
    return grandTotal;
  }

   removeCartItem<T>(id): Observable<T>{
     return this.http.delete<T>(`${environment.apiUrl}/carts/${id}`, { headers: this.headers });
  }


  removeAllCart(){
    this.cartItemList = []
    this.productList.next(this.cartItemList);
  }

  setFocus(id){
    var element=window.document.getElementById(id);
    if(element)
      return element.focus();
  }
}
