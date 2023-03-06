import { Component, OnInit } from '@angular/core';
import AppPageBase from '../app-page-base';

@Component({
  selector: 'app-places-page',
  templateUrl: './places-page.component.html',
  styleUrls: ['./places-page.component.css']
})
export class PlacesPageComponent extends AppPageBase implements OnInit {

  constructor() {
    super();
    this.setTitle('Places');
  }

  ngOnInit(): void {
  }

}
