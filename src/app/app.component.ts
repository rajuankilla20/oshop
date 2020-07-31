import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent { 
  constructor(private userSrevice: UserService, private auth: AuthService, router: Router){
    this.auth.user$.subscribe(user => {
      if (!user) return;

        userSrevice.save(user);
        let redirectUrl = localStorage.getItem('redirectUrl');
        
        if(!redirectUrl) return;

        localStorage.removeItem('redirectUrl');          
        router.navigateByUrl(redirectUrl);
    })
  }
}
