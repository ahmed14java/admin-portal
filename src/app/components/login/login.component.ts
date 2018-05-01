import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FacebookService, InitParams } from 'ngx-facebook';
import { LoginResponse } from 'ngx-facebook/dist/esm/models/login-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private credential = { 'username': '', 'password': '' };

  private loggedIn: boolean = false;


  constructor(private loginService: LoginService, private fb: FacebookService) {
    let initParams: InitParams = {
      appId: '184136495531412',
      xfbml: true,
      version: 'v2.8'
    };

    fb.init(initParams);
  }

  onSubmit() {
    this.loginService.sendCredential(this.credential.username, this.credential.password).subscribe(
      res => {
        console.log(res);
        localStorage.setItem('xAuthToken', res.json().token);
        this.loggedIn = true;
        location.reload();
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
    this.loginService.checkSession().subscribe(
      res => {
        this.loggedIn = true;
      }, error => {
        this.loggedIn = false;
      }
    );
  }

}
