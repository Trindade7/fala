import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthPageService } from '../auth-page.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss', '../login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent implements OnInit {
  signUpForm = this._fb.group({
    name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
  });

  constructor (
    private _fb: FormBuilder,
    private _authPageSvc: AuthPageService
  ) { }

  ngOnInit(): void {
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

}
