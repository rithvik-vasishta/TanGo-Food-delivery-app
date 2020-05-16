import { Injectable } from '@angular/core';
import { of, Subject, throwError, EMPTY } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { User } from './user';
import {  HttpClient } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user$=   new Subject<User>(); 
  private apiUrl='/api/auth/';
  

  constructor(
    private httpClient:HttpClient,
    private tokenStorage : TokenStorageService
    ) 
  { }
  login(email: string, password: string) {
    const loginCredentials = {email,password};
    console.log('Credentials:',loginCredentials);


    return this.httpClient.post<User>(`${this.apiUrl}login`,loginCredentials).pipe(
      switchMap(
        foundUser=>{
          this.setUser(foundUser);
          console.log(`user found`, foundUser);
          return of(foundUser);
        }
      ),
      catchError(e=>{
        console.log(`Your login cred could not be verified.`, e);
        return throwError(`Your login cred could not be verified.`);
      })
    );
  }

  logout(){
    //remove user
    //remove token from localstorage
    this.setUser(null);
    this.tokenStorage.removeToken();
    console.log('user has been ogged out');
  }

  get user()
 {
   return this.user$.asObservable();
 }

  register(userToSave :any) {  

    return this.httpClient.post<any>(`${this.apiUrl}register`,userToSave).pipe
    (//happy path 
      switchMap(({user, token})=>{
        this.setUser(user);
        this.tokenStorage.setToken(token);
        console.log(`user registered successfully`, user);
        return of(user);
      }),
      catchError(e=>{
        console.log(`server error occured`,e);
        return throwError(`Registration failed.Contact admin`);
      })
    );
  }


  findMe(){
    const token = this.tokenStorage.getToken();
    if(!token){
      return EMPTY;
    }

    return this.httpClient.get<any>(`${this.apiUrl}findme`)
    .pipe(
      switchMap(({user})=>{
          this.setUser(user);
          console.log(`user found`, user);
          return of(user);
        }
      ),
      catchError(e=>{
        console.log(`Your login cred could not be verified.`, e);
        return throwError(`Your login cred could not be verified.`);
      })
    );
  }

  private setUser(user){
    this.user$.next(user);
  }
}
