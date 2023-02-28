import { Component, OnInit } from '@angular/core';

type RegisterData = {
  login: string;
  email: string;
  password: string;
  confirmation: string;
};

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css'],
})
export class SignUpPageComponent implements OnInit {
  registerData: RegisterData = {
    login: '',
    email: '',
    password: '',
    confirmation: ''
  };

  isProcessing: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    this.isProcessing = true;
    console.log(this.registerData);
  }
}
