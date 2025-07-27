import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, finalize, of } from 'rxjs';
import { AuthService } from 'src/app/appServices/auth.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 loginForm!: FormGroup;
 @ViewChild(AlertComponent) alertRef!: AlertComponent;
 isLoading:boolean = false;

  constructor(private fb: FormBuilder,  private auth: AuthService, private router:Router) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }


  async onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const payload = {
        email:this.loginForm.get('email')?.value,
        password:this.loginForm.get('password')?.value
    }

     this.auth.login(payload).pipe(
      finalize(() => this.isLoading = false),
      catchError((error) => {
        const errorMsg = error?.error?.errorMessages || 'Failed to login.';
        this.alertRef.showAlert('error', errorMsg);
        return of(null);
      })
    ).subscribe((res: any) => {
      if (res?.isSuccess) {
        this.auth.setToken(res.result.jwtToken);
        this.alertRef.showAlert('success', res?.messages);
        this.auth.setUserId(res?.result?.user?.id);
        this.router.navigate(['/controlPanel']);
        this.loginForm.reset();
      }
      else{
        this.alertRef.showAlert('error', res?.errorMessages);
      }
    });
  }
}
