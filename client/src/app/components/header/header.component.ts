import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  authService = inject(AuthService);
  isLoggedIn: boolean= false;

  ngOnInit() {
  this.authService.isLoggedIn$.subscribe(res=>{
    this.isLoggedIn = this.authService.isLoggedIn();
  });
  }
  logout(){
    localStorage.removeItem('token');
    this.authService.isLoggedIn$.next(false);
  }
  static getHeaderComponent(): HeaderComponent {
    return new HeaderComponent();
  }
}
