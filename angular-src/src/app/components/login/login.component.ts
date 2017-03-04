import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from '../../services/validate.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  name: string;
  password: string;
  constructor(
    private router: Router,
    private flashMessage: FlashMessagesService,
    private authservice: AuthService,
    private validateservice: ValidateService
  ) { }

  ngOnInit() {
  }
  onLoginSubmit() {
    const user = {
      name: this.name,
      password: this.password
    };
    if (!this.validateservice.validateRegister(user)) {
      this.flashMessage.show('请输入用户名和密码进行登录！', { cssClass: 'alert-danger', timeout: 2000 });
      return false;
    }
    this.authservice.authenticateUser(user).subscribe(data => {
      if (data.success) {
        this.authservice.storeUserData(data.token, user);
        this.flashMessage.show('登录成功！', { cssClass: 'alert-success', timeout: 2000 });
        this.authservice.getProfile().subscribe(profile => {
          localStorage.setItem('userId',profile.user["_id"]);
        },
          err => {
            console.log(err);
            return false;
          });
        this.router.navigate(['/dashboard']);
      } else {
        if (data.msg == 'User not found') {
          this.flashMessage.show('未找到该用户，请核实用户名再进行登录！', { cssClass: 'alert-danger', timeout: 2000 });
          this.router.navigate(['/login']);
        } else if (data.msg == 'Wrong Password!') {
          this.flashMessage.show('密码错误，请核实密码重新登录！', { cssClass: 'alert-danger', timeout: 2000 });
          this.router.navigate(['/login']);
        } else {
          this.flashMessage.show('发生网络故障，请稍后重试！', { cssClass: 'alert-danger', timeout: 2000 });
          this.router.navigate(['/login']);
        }
      }
    });
  }
}
