import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogService } from './services/log.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'products'
  constructor(private log:LogService,private router:Router){  }

  ngOnInit(): void {}

  ngAfterViewInit(){
    if(!this.log.getStatus()){

      this.router.navigate(['login'])
   }
   else{
     if(this.log.usertype=="admin")
       this.router.navigate(['admin/home']);
     else
       this.router.navigate(['user/home']);
   }
  }
}
