import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Emitters } from 'src/app/emitter/emitter';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  message = "";

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:8001/stapi/user', {
      withCredentials: true
    })
      .subscribe(
        (res: any) => {
          this.message = `Hi ${res.name}`;
          Emitters.authEmitter.emit(true);
        },
        (err) => {
          this.message = "YOU ARE NOT LOGGED IN";
          Emitters.authEmitter.emit(false);
        }
      );
  }
}

