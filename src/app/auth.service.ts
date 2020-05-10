import { Injectable } from '@angular/core';
import { of, Subject, throwError } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { User } from './user';
import {  HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user$=   new Subject<User>(); 
  private apiUrl='/api/auth/';
  

  constructor(private httpClient:HttpClient) { }
  login(email: string, password: string) {
    const loginCredentials = {email,password};
    console.log('Credentials:',loginCredentials);
    return of(loginCredentials);
  }

  logout(){
    this.setUser(null);
    console.log('user has been ogged out');
  }

  get user()
 {
   return this.user$.asObservable();
 }

  register(user :any) {
    
    //this.setUser(user);
    //console.log('regestered user successfully',user);
    //return of(user);

    return this.httpClient.post<User>(`${this.apiUrl}register`,user).pipe
    (//happy path 
      switchMap(savedUser=>{
        this.setUser(savedUser);
        console.log(`user registered successfully`, savedUser);
        return of(savedUser);
      }),
      catchError(e=>{
        console.log(`server error occured`,e);
        return throwError(`Registration failed.Contact admin`);
      })
    );
  }
  private setUser(user){
    this.user$.next(user);
  }
}
