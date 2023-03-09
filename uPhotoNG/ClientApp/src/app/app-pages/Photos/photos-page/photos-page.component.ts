import { Component, OnInit } from '@angular/core';
import AppPageBase from '../../app-page-base';

@Component({
  selector: 'app-photos-page',
  templateUrl: './photos-page.component.html',
  styleUrls: ['./photos-page.component.css']
})
export class PhotosPageComponent extends AppPageBase implements OnInit {

  constructor() {
    super();
    this.setTitle('Photos');
  }

  ngOnInit(): void {
  }

}
