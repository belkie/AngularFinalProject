import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  postIdea(temp: any) {
    throw new Error('Method not implemented.');
  }
httpOptions:any;
  constructor(private http:HttpClient
    ) {

      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': "Bearer "+sessionStorage.getItem("token")
        })
      }
    }
  public getProducts():Observable<any>{

    return this.http.get("http://localhost:4500/660/products",this.httpOptions);
  }

  public updateProduct(product: any,id: any):Observable<any>{

    return this.http.put(`http://localhost:4500/660/products/${id}`,product,this.httpOptions);
  }

  public getProducts2(pattern:string):Observable<any>{
    return this.http.get("http://localhost:4500/660/products?type="+pattern,this.httpOptions);
  }


  addProduct<T>({ model }: { model: T; headers?: HttpHeaders; }): Observable<T> {
    return this.http.post<T>(`${environment.apiUrl}/products`, JSON.stringify(model), { headers: this.headers });
  }

  deleteProduct<T>(id): Observable<T> {
    return this.http.delete<T>(`${environment.apiUrl}/products/${id}`, { headers: this.headers });
  }

}
