import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service'
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name:String;
  username: String;
  email: String;
  password: String;

  constructor(private validate: ValidateService,private _flashMessagesService: FlashMessagesService) { }

  ngOnInit(): void {
  }
  onRegisterSubmit(){
    const user ={
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }
    if(!this.validate.validateRegister(user)){
      this._flashMessagesService.show('please fill all fields!', { cssClass: 'alert-danger', timeout: 1000 });
      return false;
    }
    if(!this.validate.validateEmail(user.email)){
      this._flashMessagesService.show('please user vaild email!', { cssClass: 'alert-danger', timeout: 1000 });
      return false;
    }
  }
}
