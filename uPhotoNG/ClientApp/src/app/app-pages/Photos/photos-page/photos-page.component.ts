import { Component} from '@angular/core';
import AppPageBase from '../../app-page-base';

@Component({
  selector: 'app-photos-page',
  templateUrl: './photos-page.component.html',
  styleUrls: ['./photos-page.component.css'],
})
export class PhotosPageComponent extends AppPageBase {
  constructor() {
    super();
    this.setTitle('Photos');
  }
}
