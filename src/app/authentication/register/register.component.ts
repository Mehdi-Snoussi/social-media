import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnDestroy {
  private endSubscription: Subject<void> = new Subject();
  registerForm: FormGroup = this.createRegisterForm();

  constructor(
    private readonly authService: AuthService,
    private readonly fb: FormBuilder,
    private readonly router: Router
  ) {}

  createRegisterForm(): FormGroup {
    return this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  registerUser() {
    this.authService
      .register(this.registerForm.value)
      .pipe(takeUntil(this.endSubscription))
      .subscribe({
        next: () => this.router.navigate(['auth/login']),
      });
  }

  ngOnDestroy(): void {
    this.endSubscription.next();
    this.endSubscription.complete();
  }
}
