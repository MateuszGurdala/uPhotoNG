import { NgModule, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { UInputComponent } from './uinput/uinput.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [FooterComponent, UInputComponent, HeaderComponent, NavbarComponent],
  imports: [CommonModule, RouterModule, IonicModule.forRoot()],
  exports: [FooterComponent, UInputComponent, HeaderComponent, NavbarComponent],
})
export class CustomComponentsModule {}
