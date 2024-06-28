import { Injectable } from '@angular/core';
import {User} from "./user.model";
import {AuthData} from "./auth-data.model";
import {Subject} from "rxjs";
import {Router} from "@angular/router";

@Injectable()
export class AuthService {
  // @ts-ignore
  authChange = new Subject<boolean>()
  // @ts-ignore
  private user: User;

  constructor(private router: Router) { }

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    }
    this.handleAuthSuccess();
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    }
    this.handleAuthSuccess();
  }

  handleAuthSuccess() {
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }

  logout() {
    // @ts-ignore
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    return this.user != null;
  }
}
