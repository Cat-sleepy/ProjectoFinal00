import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  registerForm: FormGroup = this.fb.group(
    {
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    },
    { validators: this.passwordMatchValidator }
  );

  submitted = false;
  loading = false;
  showPassword = false;
  showConfirmPassword = false;
  errorMessage = '';
  successMessage = '';
  passwordStrength = 0;
  passwordStrengthLabel = '';

  get f() {
    return this.registerForm.controls;
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  checkPasswordStrength(password: string) {
    let strength = 0;

    if (password.length >= 6) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    this.passwordStrength = strength;

    const labels = ['', 'Fraca', 'Razoável', 'Boa', 'Forte'];
    this.passwordStrengthLabel = labels[strength] || '';
  }

  async onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) return;

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const result = await this.authService.register({
      name: this.f['name'].value,
      email: this.f['email'].value,
      password: this.f['password'].value
    });

    this.loading = false;

    if (result.success) {
      this.successMessage = result.message;
      this.registerForm.reset({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        terms: false
      });
      this.passwordStrength = 0;
      this.passwordStrengthLabel = '';

      setTimeout(() => this.router.navigate(['/auth/login']), 2000);
    } else {
      this.errorMessage = result.message;
    }
  }

  fillTestData() {
    this.registerForm.setValue({
      name: 'Test User',
      email: 'test@test.com',
      password: '123456',
      confirmPassword: '123456',
      terms: true
    });

    this.checkPasswordStrength('123456');
  }

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }
}