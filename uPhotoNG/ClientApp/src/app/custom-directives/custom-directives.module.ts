import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorReactDirective } from './color-react.directive';



@NgModule({
  declarations: [
    ColorReactDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[ColorReactDirective]
})
export class CustomDirectivesModule { }
