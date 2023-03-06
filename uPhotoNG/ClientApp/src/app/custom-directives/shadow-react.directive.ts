import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[shadowReact]',
})
export class ShadowReactDirective {

  constructor(private element: ElementRef) {
    this.element.nativeElement.classList.add('u-shadow-react');
   }

}
