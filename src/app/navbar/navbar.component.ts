import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  user: any;
  private endSubscription: Subject<void> = new Subject();
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.getUserSubject();
  }

  getUserSubject() {
    this.authService.clearCookies();
    this.authService
      .getUserSubject()
      .pipe(takeUntil(this.endSubscription))
      .subscribe({
        next: (res) => {
          console.log(res);
          this.user = res;
        },
      });
  }

  logout() {
    this.authService.clearData();
  }

  ngOnDestroy(): void {
    this.endSubscription.next();
    this.endSubscription.complete();
  }
}
