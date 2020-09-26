import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import {Router,CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from'@angular/router';
import {AuthService} from '../services/auth.service'

@Injectable()

  export class AuthGuard implements CanActivate {
    constructor(private router: Router,
        private auth: AuthService) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
    boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if(this.auth.loggedIn()){
            console.log('Gaurd: true');
            return true
        }
        console.log('Gaurd: false');

        this.router.navigate(['/login']);
       return false;
        
    }

  }