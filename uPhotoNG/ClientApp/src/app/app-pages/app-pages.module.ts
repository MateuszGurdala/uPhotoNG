import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CustomComponentsModule } from '../custom-components/custom-components.module';
import { AppRoutingModule } from '../app-routing.module';
import { IonicModule } from '@ionic/angular';
import { AccountHttpClientService } from '../services/account-http-client.service';
import { AppsPageComponent } from './apps-page/apps-page.component';
import { PhotosPageComponent } from './photos-page/photos-page.component';
import { AlbumsPageComponent } from './albums-page/albums-page.component';
import { PlacesPageComponent } from './places-page/places-page.component';
import { CustomDirectivesModule } from '../custom-directives/custom-directives.module';



@NgModule({
  declarations: [LayoutComponent, HomePageComponent, AppsPageComponent, PhotosPageComponent, AlbumsPageComponent, PlacesPageComponent],
  imports: [
    CommonModule,
    CustomComponentsModule,
    AppRoutingModule,
    IonicModule,
    CustomDirectivesModule
  ],
  exports: [LayoutComponent, HomePageComponent, AppsPageComponent, PhotosPageComponent, AlbumsPageComponent, PlacesPageComponent],
  providers: [AccountHttpClientService]
})
export class AppPagesModule { }
