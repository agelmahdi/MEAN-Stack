import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service'
import {Router} from '@angular/router'
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:String
  password:String

  constructor(private auth: AuthService,
    private router:Router,
    private _flashMessagesService: FlashMessagesService) { }

  ngOnInit(): void {
  }

  onLoginSubmit(){
    const user = {
      username: this.username,
      password:this.password
    }
    this.auth.authenticateUser(user).subscribe(data => {
      if(data.success){
        console.log(data)
        this.auth.storeUserData(data.token , data.user)
        this._flashMessagesService.show('Successfully Login', { cssClass: 'alert-success', timeout: 1000 });
        this.router.navigate(['/dashboard'])
      }
      else{
        this._flashMessagesService.show(data.message, { cssClass: 'alert-danger', timeout: 1000 });
        this.router.navigate(['/login'])
      }
    });
  }

}
