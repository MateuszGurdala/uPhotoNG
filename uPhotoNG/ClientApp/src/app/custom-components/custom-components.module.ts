import { NgModule, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { UInputComponent } from './uinput/uinput.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { IonicModule } from '@ionic/angular';
import { CustomDirectivesModule } from '../custom-directives/custom-directives.module';
import { AppModalComponent } from './app-modal/app-modal.component';
import { AppRefComponent } from './app-ref/app-ref.component';

@NgModule({
  declarations: [FooterComponent, UInputComponent, HeaderComponent, NavbarComponent, AppModalComponent, AppRefComponent],
  imports: [CommonModule, RouterModule, IonicModule.forRoot(), CustomDirectivesModule],
  exports: [FooterComponent, UInputComponent, HeaderComponent, NavbarComponent, AppModalComponent],
})
export class CustomComponentsModule {}
