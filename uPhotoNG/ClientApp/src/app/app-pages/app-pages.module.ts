import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CustomComponentsModule } from '../custom-components/custom-components.module';
import { AppRoutingModule } from '../app-routing.module';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [LayoutComponent, HomePageComponent],
  imports: [
    CommonModule,
    CustomComponentsModule,
    AppRoutingModule,
    IonicModule
  ],
  exports: [LayoutComponent, HomePageComponent]
})
export class AppPagesModule { }
