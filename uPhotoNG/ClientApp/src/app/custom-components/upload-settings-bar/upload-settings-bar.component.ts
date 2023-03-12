import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {
  DatabaseOption,
  SelectedValues,
  SetValue,
} from '../../services/interfaces';
import { UInputComponent } from '../uinput/uinput.component';
import { USelectComponent } from '../uselect/uselect.component';

@Component({
  selector: 'upload-settings-bar',
  templateUrl: './upload-settings-bar.component.html',
  styleUrls: ['./upload-settings-bar.component.css'],
})
export class UploadSettingsBarComponent {
  @Input('albumsData') userAlbums: DatabaseOption[];
  @Input('placesData') userPlaces: DatabaseOption[];

  @Input('selectedValues') selectedValues: SelectedValues;
  @Output('setValue') setValueEmitter: EventEmitter<SetValue> =
    new EventEmitter<SetValue>();

  @ViewChild('albumsInput') albumInput: HTMLElement;
  @ViewChild('placesInput') placeInput: HTMLElement;
  @ViewChild('tagsInput') tagsInput: HTMLElement;

  isExtended: boolean = false;

  showAlbumInput: boolean = false;
  showPlaceInput: boolean = false;
  showTagsInput: boolean = false;

  constructor() {}

  setValueFun(data: any) {
    let component: USelectComponent | UInputComponent = data[0];
    let value: string = data[1];

    let target: string;

    switch (component.text) {
      case 'Set album':
        target = 'album';
        break;
      case 'Set place':
        target = 'place';
        break;
      case 'Set tags':
        target = 'tags';
        break;
      default:
        target = 'null';
        break;
    }
    this.setValueEmitter.emit({
      target: target,
      value: value,
    });
  }

  onClick() {
    let showTime: number = 150;
    let hideTime: number = 200;
    if (this.isExtended) {
      setTimeout(() => {
        this.showTagsInput = false;
      }, hideTime / 3);
      setTimeout(() => {
        this.showPlaceInput = false;
      }, (hideTime / 3) * 2);
      setTimeout(() => {
        this.showAlbumInput = false;
      }, hideTime);
    } else {
      setTimeout(() => {
        this.showAlbumInput = true;
      }, showTime / 3);
      setTimeout(() => {
        this.showPlaceInput = true;
      }, (showTime / 3) * 2);
      setTimeout(() => {
        this.showTagsInput = true;
      }, showTime);
    }
    this.isExtended = !this.isExtended;
  }
}
