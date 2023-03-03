import { NgModule, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { UInputComponent } from './uinput/uinput.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [FooterComponent, UInputComponent, HeaderComponent],
  imports: [CommonModule, RouterModule],
  exports: [FooterComponent, UInputComponent, HeaderComponent],
})
export class CustomComponentsModule {}
