import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthPageService } from '../auth-page.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss', '../login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent implements OnInit {
  signInForm = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    saveSession: [false]
  });

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

  googleSignIn(): void {
    this._authPageSvc.googleSignIn();
  }

}
