import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthPageService } from './auth-page.service';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  signInForm = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    saveSession: [false]
  });

  signUpForm = this._fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
  });

  saveLogIn = false;

  constructor (
    private _fb: FormBuilder,
    private _authPageSvc: AuthPageService
  ) { }

  ngOnInit(): void {
  }

  signIn(): void {
    if (!this.signInForm.valid) {
      this._authPageSvc.openSnackBar('Please fill the form correctly');
      return;
    }

    const email = this.signInForm.value.email;
    const password = this.signInForm.value.password;

    this._authPageSvc.signIn(email, password);
  }

  signUp(): void {
    if (!this.signUpForm.valid) {
      this._authPageSvc.openSnackBar('Please fill the form correctly');

      return;
    }

    const name = this.signUpForm.value.name;
    const email = this.signUpForm.value.email;
    const password = this.signUpForm.value.password;

    this._authPageSvc.signUp(email, password);
  }

  googleSignIn(): void {
    this._authPageSvc.googleSignIn();
  }


}
