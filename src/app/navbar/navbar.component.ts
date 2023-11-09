import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  menuType: String = 'default';
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      if(val.url){
        if(val.url.includes('seller')){
          console.warn("in seller area");
          this.menuType="seller";
        }
        else {
          console.warn("outside seller area");
          this.menuType = 'default';
        }
      }
    });
  }


}
