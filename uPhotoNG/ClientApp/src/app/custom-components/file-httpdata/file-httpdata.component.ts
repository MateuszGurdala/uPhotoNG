import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatabaseOption, FileHttpData } from '../../services/interfaces';

@Component({
  selector: 'file-httpdata',
  templateUrl: './file-httpdata.component.html',
  styleUrls: ['./file-httpdata.component.css'],
})
export class FileHTTPDataComponent {
  @Input('file') fileData: FileHttpData;
  @Input('index') index: number;
  @Input('albums') userAlbums: DatabaseOption[];
  @Input('places') userPlaces: DatabaseOption[];
  @Input('onDelete') deleteFun: Function;
  @Output() delete: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  onDelete() {
    this.delete.emit(this.index);
  }
}
