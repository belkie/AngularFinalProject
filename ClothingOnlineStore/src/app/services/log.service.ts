import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogService {
 httpOptions:any;
 username:String='';
 usertype:String='';
 token:any='';
 email:any='';
 status:boolean=false;
  constructor(private http:HttpClient) {
      let username=sessionStorage.getItem("username");
      let usertype=sessionStorage.getItem("usertype");
      let token=sessionStorage.getItem("token");
      let email=sessionStorage.getItem("email");
      if(username&&usertype){
        this.status=true;
        this.username=username;
        this.usertype=usertype;
        this.token=token;
        this.email=email;
      }
   }

  getStatus():boolean{
    return this.status;
  }

  register(obj:any):Observable<object>{
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
        })
    }
    return this.http.post("http://localhost:4500/register",obj,this.httpOptions);
  }
  check(str:any):Observable<object>{
    return this.http.get("http://localhost:4500/users?username"+str,this.httpOptions);
  }


  login(email:any,password:any):Observable<object>{
 
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
  
      })
    }
    return this.http.post("http://localhost:4500/login",
    {email:email,password:password},
    this.httpOptions);
  }

  logout():void{
     this.token="";
     this.username="";
     this.usertype="";
     sessionStorage.removeItem("token");
     sessionStorage.removeItem("username");
     sessionStorage.removeItem("usertype");
     sessionStorage.removeItem("email");
  }
}