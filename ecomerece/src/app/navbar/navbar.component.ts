// navbar.component.ts

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Emitters } from 'src/app/emitter/emitter';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  pages: string[] = ['Home', 'Students', 'Donors', 'Contact Us', 'About Us', 'Donate Now' , 'Profile'];

  authenticated = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.authenticated = auth;
    });
  }

  logout():void{
    this.http.post('http://localhost:8001/api/logout',{},{withCredentials:true})
    .subscribe(() => this.authenticated = false)
  }

}
