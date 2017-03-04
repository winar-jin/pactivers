import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private flashMessage: FlashMessagesService,
    private authservice: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onLogoutClick(){
    this.authservice.logOut();
    this.flashMessage.show('注销成功！',{
      cssClass: 'alert-info',
      timeout: 2000
    });
    this.router.navigate(['/']);
    return false;
  }
}
