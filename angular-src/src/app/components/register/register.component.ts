import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: String;
  password: String;
  constructor(
    private validateservice: ValidateService,
    private flashMessage:FlashMessagesService,
    private authservice: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  onRegisterSubmit(){
    const user = {
      name: this.name,
      password: this.password
    };
    if(!this.validateservice.validateRegister(user)){
      this.flashMessage.show('请填写用户名或密码！',{cssClass:'alert-danger',timeout: 2000});
      return false;
    }
    this.authservice.registerUser(user).subscribe(data => {
      if(data.success){
        this.flashMessage.show('用户注册成功！',{cssClass: 'alert-success',timeout: 2000});
        this.router.navigate(['/login']);
      } else {
        if(data.msg == 'User exist!'){
          this.flashMessage.show('该用户名已被使用，请更换用户名重新注册！谢谢！',{cssClass:'alert-danger',timeout: 2000});
          this.router.navigate(['/register']);
        }else{
          this.flashMessage.show('发生未知错误，注册失败，请重试！',{cssClass: 'alert-danger',timeout: 2000});
          this.router.navigate(['/register']);
        }
      }
    });
  }
}
