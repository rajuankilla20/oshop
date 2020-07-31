import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service'; 
import { AppUser } from '../models/AppUser';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})
export class BsNavbarComponent implements OnDestroy  {
 
  appUser: AppUser; 

  constructor(private auth: AuthService) {  
    auth.appUser$.subscribe(appUser => this.appUser = appUser);
    }

  ngOnDestroy(): void {
    // this.autsh.appUser$.u
  }
 

  logout(){
    this.auth.logout(); 
  }

}
