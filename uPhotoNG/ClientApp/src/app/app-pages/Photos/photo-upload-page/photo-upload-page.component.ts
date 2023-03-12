import {
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FileHTTPDataComponent } from 'src/app/custom-components/file-httpdata/file-httpdata.component';
import { DatabaseOption, FileHttpData } from 'src/app/services/interfaces';
import FileHandler from '../../../services/file-handler.service';
import { SelectedValues, SetValue } from '../../../services/interfaces';
import AppPageBase from '../../app-page-base';

@Component({
  selector: 'app-photo-upload-page',
  templateUrl: './photo-upload-page.component.html',
  styleUrls: ['./photo-upload-page.component.css'],
})
export class PhotoUploadPageComponent extends AppPageBase {
  @ViewChild('dropzone') dropZone: ElementRef;
  @ViewChildren('fileHttpDataElement') elements: FileHTTPDataComponent[];

  ifContainerEmpty: boolean = true;
  filesHTTPData: FileHttpData[] = [] as FileHttpData[];
  selectedValues: SelectedValues = {} as SelectedValues;
  userAlbums: DatabaseOption[] = [
    { id: '1337', value: 'OtherPhotos' },
    { id: '2137', value: 'AnotherAlbum' },
  ];
  userPlaces: DatabaseOption[] = [{ id: '1xd2', value: 'NoPlace' }];

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private fileHandler: FileHandler
  ) {
    super();
    this.setTitle('Upload photos');
    this.selectedValues.album = this.userAlbums[0].id;
    this.selectedValues.place = this.userPlaces[0].id;
    this.selectedValues.tags = '#none';
  }

  onDragEnter(event: DragEvent) {
    event.preventDefault();
    this.renderer.setStyle(
      this.dropZone.nativeElement,
      'color',
      'var(--accent)'
    );
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDragLeave(event: any) {
    event.preventDefault();
    if (!this.dropZone.nativeElement.contains(event.fromElement)) {
      this.renderer.setStyle(
        this.dropZone.nativeElement,
        'color',
        'var(--text-gray)'
      );
    }
  }

  onClick() {
    if (!this.ifContainerEmpty) return;
    let input = document.createElement('input');
    input.type = 'file';
    input.onchange = () => {
      if (input.files !== null) {
        this.handleFiles(input.files);
      }
    };
    input.click();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();

    this.renderer.setStyle(
      this.dropZone.nativeElement,
      'color',
      'var(--text-gray)'
    );

    let files: FileList | undefined = event.dataTransfer?.files;

    if (typeof files !== 'undefined') {
      this.handleFiles(files);
    }
  }

  handleFiles(files: FileList) {
    if (!this.fileHandler.checkMIMETypes(files)) {
      this.toastr.info('Currently accepted MIME types: image/jpeg, image/png.');
      this.toastr.error('Some files are of incorrect type.');
    } else {
      this.ifContainerEmpty = false;
      [...files].forEach(async (file) => {
        let data = await this.fileHandler.getHTTPFile(file);
        data.album = this.selectedValues.album;
        data.place = this.selectedValues.place;
        data.tags = this.selectedValues.tags;
        this.filesHTTPData.push(data);
      });
    }
  }

  deleteElement(index: number) {
    this.filesHTTPData.splice(index, 1);
    if (this.filesHTTPData.length === 0) {
      this.ifContainerEmpty = true;
    }
  }

  setValueHandler(data: SetValue) {
    this.filesHTTPData.forEach((fileData: FileHttpData) => {
      type StatusKey = keyof typeof fileData;
      (fileData[data.target as StatusKey] as string) = data.value;
    });
  }

  upload() {
    console.log(this.filesHTTPData);
  }
}
