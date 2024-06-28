import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatListItem, MatNavList} from "@angular/material/list";
import {RouterLink} from "@angular/router";
import {Subscription} from "rxjs";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-sidenav-list',
  standalone: true,
    imports: [
        MatIcon,
        MatListItem,
        MatNavList,
        RouterLink
    ],
  templateUrl: './sidenav-list.component.html',
  styleUrl: './sidenav-list.component.css'
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() closeSideNav = new EventEmitter<void>();
  // @ts-ignore
  isAuth: boolean;
  // @ts-ignore
  authSubscription: Subscription;

  constructor(private authService: AuthService) {
  }

  onToggle() {
    this.authService.logout();
    this.closeSideNav.emit();
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }
}
