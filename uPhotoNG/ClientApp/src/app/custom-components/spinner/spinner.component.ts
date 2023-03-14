import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';

@Component({
  selector: 'spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
})
export class SpinnerComponent implements AfterViewInit {
  @ViewChildren('spinDiv') parts: ElementRef[];
  @ViewChild('spinner') spinner: ElementRef;

  @Input('size') size: string;
  @Input('width') width: string;

  @Input('xOffset') xOffset: string;
  @Input('yOffset') yOffset: string;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {

    this.renderer.setStyle(this.spinner.nativeElement, 'margin-top', this.yOffset);
    this.renderer.setStyle(this.spinner.nativeElement, 'margin-left', this.xOffset);

    this.parts.forEach((element) => {
      this.renderer.setStyle(element.nativeElement, 'width', this.size);
      this.renderer.setStyle(element.nativeElement, 'height', this.size);
      this.renderer.setStyle(element.nativeElement, 'border-width', this.width);
    });
  }
}
