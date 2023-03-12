import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorReactDirective } from './color-react.directive';
import { ShadowReactDirective } from './shadow-react.directive';
import { BackgroundReactDirective } from './background-react.directive';

@NgModule({
  declarations: [
    ColorReactDirective,
    ShadowReactDirective,
    BackgroundReactDirective,
  ],
  imports: [CommonModule],
  exports: [
    ColorReactDirective,
    ShadowReactDirective,
    BackgroundReactDirective,
  ],
})
export class CustomDirectivesModule {}
