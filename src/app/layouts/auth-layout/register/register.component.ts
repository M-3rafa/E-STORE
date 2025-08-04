import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthServiceService } from '../../../core/services/Auth/auth-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  successMessage = '';
  errorMessage = '';
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        userName: [
          null,
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
          ],
        ],
        email: [
          null,
          [
            Validators.required,
            Validators.email,
            Validators.pattern(
              '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
            ),
          ],
        ],
        password: [
          null,
          [
            Validators.required,
            Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.*\d).{8,}$/),
          ],
        ],
        confirmPassword: [null, [Validators.required]],
        phoneNumber: [
          null,
          [
            Validators.required,
            Validators.pattern(/^01[0125][0-9]{8}$/), // أرقام مصرية
          ],
        ],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  passwordMatchValidator(form: AbstractControl) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { misMatch: true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const value = this.form.value;

    this.auth
      .register({
        name: value.userName,
        email: value.email,
        password: value.password,
        rePassword: value.confirmPassword,
        phone: value.phoneNumber,
      })
      .subscribe({
        next: () => {
          this.successMessage = 'Registration successful!';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1500);
        },
        error: (err) => {
          const errorResponse = err.error;

          if (typeof errorResponse === 'string') {
            this.errorMessage = errorResponse;
          } else if (errorResponse?.message) {
            this.errorMessage = errorResponse.message;
          } else {
            this.errorMessage = 'Registration failed. Please try again.';
          }
        },
      });
  }

  get passwordMismatch(): boolean {
    return this.form.errors?.['misMatch'];
  }
}
