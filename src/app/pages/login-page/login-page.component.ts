import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '@app-core/services/auth/auth.service';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    saveSession: [false]
  });
  signUpForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
  });
  saveLogIn = false;

  constructor (
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar

  ) { }

  ngOnInit(): void {
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'close', {
      duration: 2000,
    });
  }

  logIn(): void {
    if (!this.loginForm.valid) {
      this.snackBar.open('Please fill the form correctly', 'close', {
        duration: 3000,
      });
      return;
    }

    const email = this.loginForm.value['email'];
    const password = this.loginForm.value['password'];

    this.authService.emailAndPasswordSignIn(email, password).then(
      () => {
        if (!!this.authService.user$) {
          this.router.navigate(['chat']);
        }
      }
    ).catch(
      err => {
        console.groupCollapsed('!ERROR in >login-page.component [emailAndPasswordSignIn]');
        console.log(err);
        console.groupEnd();
        this.openSnackBar(err['message']);
      }
    );
  }

  signUp(): void {
    if (!this.loginForm.valid) {
      this.snackBar.open('Please fill the form correctly', 'close', {
        duration: 2000,
      });
      return;
    }

    const email = this.loginForm.value['email'];
    const password = this.loginForm.value['password'];
    this.authService.emailAndPasswordSignUp(email, password).then(
      res => {
        console.log(res);

        this.router.navigate(['chat/conversations']);
      }
    ).catch(
      err => console.log(err)
    );
  }

  googleSignIn(): void {
    this.authService.googleSignIn().then(
      () => {
        if (!!this.authService.user$) {
          this.router.navigate(['chat']);
        }
      }
    ).catch(
      err => {
        console.groupCollapsed('!ERROR in >login-page.component [emailAndPasswordSignIn]');
        console.log(err);
        console.groupEnd();
        this.openSnackBar(err['message']);
      }
    );
  }


}
