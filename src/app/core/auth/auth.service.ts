import { Injectable } from '@angular/core';
import { of, Subject, throwError, EMPTY } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { User } from '../user';
import {  HttpClient } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';
import { LogService } from '@core/log.service';

interface userDto{
  user:User;
  token:string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user$=   new Subject<User>(); 
  private apiUrl='/api/auth/';
  

  constructor(
    private httpClient:HttpClient,
    private tokenStorage : TokenStorageService,
    private logService : LogService
    ) 
  { }
  login(email: string, password: string) {
    const loginCredentials = {email,password};
    console.log('Credentials:',loginCredentials);


    return this.httpClient
    .post<userDto>(`${this.apiUrl}login`,loginCredentials)
    .pipe(
      switchMap(({user,token})=>{
          this.setUser(user);
          this.tokenStorage.setToken(token);
          console.log(`user found`, user);
          return of(user);
        }
      ),
      catchError(e=>{
        this.logService.log(`Server error occured:  ${e.error.message} `,e);
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

    return this.httpClient.post<any>(`${this.apiUrl}register`,userToSave)
    .pipe
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
