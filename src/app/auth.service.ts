import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user$=   new Subject<User>(); 

  constructor() { }
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
    
    this.setUser(user);
    console.log('regestered user successfully',user);
    return of(user);
  }
  private setUser(user){
    this.user$.next(user);
  }
}
