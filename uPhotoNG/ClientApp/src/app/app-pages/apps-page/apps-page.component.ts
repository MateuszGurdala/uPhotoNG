import { Component, OnInit } from '@angular/core';
import AppPageBase from '../app-page-base';

@Component({
  selector: 'app-apps-page',
  templateUrl: './apps-page.component.html',
  styleUrls: ['./apps-page.component.css']
})
export class AppsPageComponent extends AppPageBase implements OnInit {

  constructor() {
    super();
    this.setTitle('All apps');
   }

  ngOnInit(): void {
  }

}
