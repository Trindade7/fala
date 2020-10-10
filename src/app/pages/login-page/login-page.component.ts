import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginForm = this.fb.group({
    email: [''],
    password: [''],
    saveSession: [false]
  });
  saveLogIn = false;

  constructor (
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  logIn(): void {
    this.loginForm.value.forEach(element => {

    });
    return;
  }

  some() {
    return;
  }
}
