import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'sw-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public get router(): Router {
    return this._router;
  }
  public set router(value: Router) {
    this._router = value;
  }
  email:string;
  password:string;
  error:string;

  constructor(private _router: Router, private authService:AuthService) { }

  ngOnInit(): void {
  }
  login(){
    this.error = '';
    this.authService
    .login(this.email,this.password)
    .subscribe(s=>this.router.navigate(['']),e => (this.error = e)
    );

  }

}
