import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import AppPageBase from '../../app-page-base';

@Component({
  selector: 'app-photo-upload-page',
  templateUrl: './photo-upload-page.component.html',
  styleUrls: ['./photo-upload-page.component.css'],
})
export class PhotoUploadPageComponent extends AppPageBase implements OnInit {
  @ViewChild('dropzone') dropZone: ElementRef;
  ifContainerEmpty: boolean = true;

  constructor(private renderer: Renderer2) {
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
    let files: FileList | undefined = event.dataTransfer?.files;

    if (typeof files !== 'undefined') {
      this.handleFiles(files);
    }
  }

  handleFiles(files: FileList) {
    [...files].forEach((file, i) => {
      console.log(file);
    });
  }
}
