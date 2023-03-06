import { Component, OnInit } from '@angular/core';
import AppPageBase from '../app-page-base';

@Component({
  selector: 'app-albums-page',
  templateUrl: './albums-page.component.html',
  styleUrls: ['./albums-page.component.css'],
})
export class AlbumsPageComponent extends AppPageBase implements OnInit {
  constructor() {
    super();
    this.setTitle('Albums');
  }

  ngOnInit(): void {}
}
