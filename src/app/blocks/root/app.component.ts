import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { User } from '../../user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy{
  
  user:User
  userSubsciption:Subscription
  constructor(private authService:AuthService,private router: Router){     
    
    this.authService.findMe().subscribe(user => ( this.user = user)); 

    this.userSubsciption = this.authService.user.subscribe(user=>(this.user=user));

  }
  logout(){
    this.authService.logout();
    this.router.navigate(['/']);
    
  }

  ngOnDestroy(): void {
    if (this.userSubsciption){
      this.userSubsciption.unsubscribe();
    }
  }

}
