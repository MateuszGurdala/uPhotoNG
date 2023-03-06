import { Component, OnInit } from '@angular/core';
import AppPageBase from '../app-page-base';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent extends AppPageBase implements OnInit {

  constructor() {
    super();
    this.setTitle('Home page');
  }

  ngOnInit(): void {
  }

}
