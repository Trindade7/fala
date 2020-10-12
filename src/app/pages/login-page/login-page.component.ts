import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

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
  saveLogIn = false;

  constructor (
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router

  ) { }

  ngOnInit(): void {
  }

  logIn(): void {
    const email = this.loginForm.value['email'];
    const password = this.loginForm.value['password'];
    this.authService.emailAndPasswordSignIn(email, password).then(
      res => {
        if (!!this.authService.user$) {
          this.router.navigate(['chat']);
        }
      }
    ).catch(
      err => console.log('ERROR', err)
    );
  }

  signUp(): void {
    const email = this.loginForm.value['email'];
    const password = this.loginForm.value['password'];
    this.authService.emailAndPasswordSignUp(email, password).then(
      res => {
        console.log(res);

        this.router.navigate(['chat']);
      }
    ).catch(
      err => console.log(err)
    );
  }

  googleSignIn() {
    this.authService.googleSignIn();
  }

  logOut() {
    this.authService.logout();
  }
}
