import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[backgroundReact]',
})
export class BackgroundReactDirective {
  constructor(private element: ElementRef) {
    this.element.nativeElement.classList.add('u-background-react');
  }
}
