import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, finalize, of } from 'rxjs';
import { AuthService } from 'src/app/appServices/auth.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
   signupForm!: FormGroup;
  @ViewChild(AlertComponent) alertRef!: AlertComponent;
  isLoading:boolean = false;

  constructor(private fb: FormBuilder,private router:Router,private auth:AuthService) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      fullname:['',[Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?\d{10,15}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const pass = form.get('password')?.value;
    const confirmPass = form.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { passwordMismatch: true };
  }

  async onSubmit() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const payload = {
        name:this.signupForm.get('fullname')?.value,
        email:this.signupForm.get('email')?.value,
        phone:this.signupForm.get('phone')?.value,
        passwordHash:this.signupForm.get('password')?.value
    }

      this.auth.createAccount(payload).pipe(
        finalize(() => this.isLoading = false),
        catchError((error) => {
          const errorMsg = error?.error?.errorMessages || 'Failed to signup.';
          this.alertRef.showAlert('error', errorMsg);
          return of(null);
        })
      ).subscribe((res: any) => {
        if (res?.isSuccess) {
          this.alertRef.showAlert('success', res?.messages);
          this.router.navigate(['/controlPanel']);
        }
        else{
          this.alertRef.showAlert('error', res?.errorMessages);
        }
      });
    }
}