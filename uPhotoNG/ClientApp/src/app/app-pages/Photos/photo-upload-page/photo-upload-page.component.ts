import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FileHttpData } from 'src/app/services/interfaces';
import FileHandler from '../../../services/file-handler.service';
import AppPageBase from '../../app-page-base';

@Component({
  selector: 'app-photo-upload-page',
  templateUrl: './photo-upload-page.component.html',
  styleUrls: ['./photo-upload-page.component.css'],
})
export class PhotoUploadPageComponent extends AppPageBase implements OnInit {
  @ViewChild('dropzone') dropZone: ElementRef;
  ifContainerEmpty: boolean = true;
  filesHTTPData: FileHttpData[] = [] as FileHttpData[];

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private fileHandler: FileHandler
  ) {
    super();
    this.setTitle('Upload photos');
  }

  ngOnInit(): void {}

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
      [...files].forEach(async (file, i) => {
        let data = await this.fileHandler.getHTTPFile(file);
        this.filesHTTPData.push(data);
        console.log(this.filesHTTPData);
      });
    }
  }
}
