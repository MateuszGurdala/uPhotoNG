import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[colorReact]',
})
export class ColorReactDirective {
  constructor(private element: ElementRef) {
    this.element.nativeElement.classList.add('u-color-react');
  }
}
