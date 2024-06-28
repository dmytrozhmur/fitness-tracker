import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {ExtendedModule, FlexModule} from "@angular/flex-layout";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";
import {RouterLink} from "@angular/router";
import {AuthService} from "../../auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  standalone: true,
    imports: [
        ExtendedModule,
        FlexModule,
        MatIcon,
        MatIconButton,
        MatToolbar,
        RouterLink
    ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  // @ts-ignore
  isAuth: boolean;
  // @ts-ignore
  authSubscription: Subscription;

  constructor(private authService: AuthService) {
  }

  onToggle() {
    this.sidenavToggle.emit();
  }

  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
