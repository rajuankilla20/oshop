import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { UserService } from 'shared/services/user.service';
import { AppUser } from 'shared/models/AppUser';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$ : Observable<firebase.User>;
  
  constructor(private userService: UserService, private afAuth: AngularFireAuth, private route: ActivatedRoute, private router: Router) {
    this.user$ =this.afAuth.authState;
   }

  login(){
    
    let redirectUrl = this.route.snapshot.queryParamMap.get('redirectUrl') || '/';
    localStorage.setItem('redirectUrl', redirectUrl);
    
    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider()); 
  }

  logout(){
    this.afAuth.signOut();
  }

  get appUser$(): Observable<AppUser>{
    return this.user$.pipe(switchMap(user => {
      if (user) { 
         return  this.userService.get(user.uid).valueChanges(); 
        } 
      return of(null);
    }
   ));
 }
}
