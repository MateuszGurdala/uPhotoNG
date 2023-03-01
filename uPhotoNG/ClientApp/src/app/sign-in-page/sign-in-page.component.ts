import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.css'],
})
export class SignInPageComponent implements OnInit {
  constructor(private titleSrv: Title) {
    this.titleSrv.setTitle("Sign in");
  }

  ngOnInit(): void {}
}
