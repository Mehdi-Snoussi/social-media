import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private endSubscription: Subject<void> = new Subject();
  loginForm: FormGroup = this.createLoginForm();

  constructor(
    private readonly authService: AuthService,
    private readonly fb: FormBuilder,
    private readonly router: Router
  ) {}

  createLoginForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  loginUser() {
    this.authService.clearCookies();
    this.authService
      .login(this.loginForm.value)
      .pipe(takeUntil(this.endSubscription))
      .subscribe({
        next: (res: any) => {
        /*   this.authService.setTokenToCookie(res.token);
          this.authService.storeConnectedUserInfoInCookie(res.token); */
          this.router.navigate(['home']);
        },
      });
  }

  ngOnDestroy(): void {
    this.endSubscription.next();
    this.endSubscription.complete();
  }
}
