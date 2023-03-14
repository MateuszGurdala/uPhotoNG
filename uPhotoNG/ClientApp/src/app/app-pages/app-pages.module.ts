// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomComponentsModule } from '../custom-components/custom-components.module';
import { AppRoutingModule } from '../app-routing.module';
import { IonicModule } from '@ionic/angular';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CustomDirectivesModule } from '../custom-directives/custom-directives.module';

//Components
import { LayoutComponent } from './Other/layout/layout.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PhotosPageComponent } from './Photos/photos-page/photos-page.component';
import { PhotoUploadPageComponent } from './Photos/photo-upload-page/photo-upload-page.component';
import { AlbumsPageComponent } from './albums-page/albums-page.component';
import { PlacesPageComponent } from './places-page/places-page.component';

// Services
import { AccountHttpClientService } from '../services/account-http-client.service';
import FileHandler from '../services/file-handler.service';
import ModalService from '../services/modal-service.service';
import DatabaseHttpClient from '../services/database-http-client.service';

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
    ToastrModule,
  ],
  exports: [
    LayoutComponent,
    HomePageComponent,
    PhotosPageComponent,
    AlbumsPageComponent,
    PlacesPageComponent,
    PhotoUploadPageComponent,
  ],
  providers: [
    AccountHttpClientService,
    ModalService,
    ToastrService,
    FileHandler,
    DatabaseHttpClient
  ],
})
export class AppPagesModule {}
