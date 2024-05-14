import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'front-end';
  constructor(
    private oidcSecurityService: OidcSecurityService,
    private userService: UserService,
    private router : Router
  ) {
      
  }
  ngOnInit(): void {
    this.oidcSecurityService.checkAuth()
    .subscribe(({isAuthenticated}) => {
      console.log('app authenticated', isAuthenticated);
      this.userService.registerUser();
      this.router.navigateByUrl('/featured');
    })
  }
}
