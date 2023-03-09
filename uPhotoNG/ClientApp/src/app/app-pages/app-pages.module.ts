import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { CustomComponentsModule } from '../custom-components/custom-components.module';
import { AppRoutingModule } from '../app-routing.module';
import { IonicModule } from '@ionic/angular';
import { AccountHttpClientService } from '../services/account-http-client.service';
import { PhotosPageComponent } from './Photos/photos-page/photos-page.component';
import { PhotoUploadPageComponent } from './Photos/photo-upload-page/photo-upload-page.component';
import { AlbumsPageComponent } from './albums-page/albums-page.component';
import { PlacesPageComponent } from './places-page/places-page.component';
import { CustomDirectivesModule } from '../custom-directives/custom-directives.module';
import ModalService from '../services/modal-service.service';
import { LayoutComponent } from './Other/layout/layout.component';

@NgModule({
  declarations: [
    LayoutComponent,
    HomePageComponent,
    PhotosPageComponent,
    AlbumsPageComponent,
    PlacesPageComponent,
    PhotoUploadPageComponent,
  ],
  imports: [
    CommonModule,
    CustomComponentsModule,
    AppRoutingModule,
    IonicModule,
    CustomDirectivesModule,
  ],
  exports: [
    LayoutComponent,
    HomePageComponent,
    PhotosPageComponent,
    AlbumsPageComponent,
    PlacesPageComponent,
    PhotoUploadPageComponent,
  ],
  providers: [AccountHttpClientService, ModalService],
})
export class AppPagesModule {}
