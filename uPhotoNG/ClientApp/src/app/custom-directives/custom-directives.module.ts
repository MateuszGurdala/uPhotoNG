import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorReactDirective } from './color-react.directive';
import { ShadowReactDirective } from './shadow-react.directive';



@NgModule({
  declarations: [
    ColorReactDirective,
    ShadowReactDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[ColorReactDirective, ShadowReactDirective]
})
export class CustomDirectivesModule { }
