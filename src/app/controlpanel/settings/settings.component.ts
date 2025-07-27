import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/appServices/auth.service';
import { BaseApiService } from 'src/app/appServices/base-api.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
 styles: [`
    @keyframes fadeIn {
      from {opacity: 0;}
      to {opacity: 1;}
    }
    .animate-fadeIn {
      animation: fadeIn 0.5s ease-in-out forwards;
    }
  `]

})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup;
  passwordForm: FormGroup;
  emailForm: FormGroup;
  loadingUserInfo = false;
  showPasswordModal = false;
  showEmailModal = false;
  previewUrl: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder,private baseApi:BaseApiService,private auth:AuthService) {
    this.settingsForm = this.fb.group({
      name: ['', Validators.required], 
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });

    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

  }

  ngOnInit(): void {
    this.fetchUser();
  }

  openPasswordModal() {
    this.passwordForm.reset();
    this.showPasswordModal = true;
  }

  closePasswordModal() {
    this.showPasswordModal = false;
  }

  changePassword() {
    if (this.passwordForm.valid) {
      const { newPassword, confirmPassword } = this.passwordForm.value;
      if (newPassword !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      console.log('Password Updated:', this.passwordForm.value);
      this.closePasswordModal();
    }
  }

  openEmailModal() {
    this.emailForm.patchValue({
      email: this.settingsForm.get('email')?.value
    });
    this.showEmailModal = true;
  }

  closeEmailModal() {
    this.showEmailModal = false;
  }

  updateEmail() {
    if (this.emailForm.valid) {
      this.settingsForm.patchValue({
        email: this.emailForm.value.email
      });
      console.log('Email Updated:', this.emailForm.value.email);
      this.closeEmailModal();
    }
  }

  onFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
        console.log('Selected profile picture:', file.name);
      };
      reader.readAsDataURL(file);
    }
  }

  fetchUser() {
    const userId = this.auth.getUserId();
    if (!userId) {
      return;
    }

    this.loadingUserInfo = true;
    this.baseApi.getUserInfo(Number(userId)).subscribe({
      next: (res: any) => {
        if (res) {
          console.log(res)
          this.settingsForm.patchValue({
            name: res.name || '',
            email: res.email || '',
            phone: res.phone || ''
          });
        }
        this.loadingUserInfo = false;
      },
      error: (err) => {
        console.error('Error fetching user info', err);
        this.loadingUserInfo = false;
        alert('Failed to load user info');
      }
    });
  }
}
