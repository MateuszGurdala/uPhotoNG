// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { CustomDirectivesModule } from '../custom-directives/custom-directives.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

// Components
import { UInputComponent } from './uinput/uinput.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppModalComponent } from './app-modal/app-modal.component';
import { AppRefComponent } from './app-ref/app-ref.component';
import { ReturnButtonComponent } from './return-button/return-button.component';
import { FileHTTPDataComponent } from './file-httpdata/file-httpdata.component';
import { USelectComponent } from './uselect/uselect.component';
import { UploadSettingsBarComponent } from './upload-settings-bar/upload-settings-bar.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    FooterComponent,
    UInputComponent,
    HeaderComponent,
    NavbarComponent,
    AppModalComponent,
    AppRefComponent,
    ReturnButtonComponent,
    FileHTTPDataComponent,
    USelectComponent,
    UploadSettingsBarComponent,
    SpinnerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    IonicModule.forRoot(),
    CustomDirectivesModule,
    FormsModule,
  ],
  exports: [
    FooterComponent,
    UInputComponent,
    HeaderComponent,
    NavbarComponent,
    AppModalComponent,
    ReturnButtonComponent,
    FileHTTPDataComponent,
    USelectComponent,
    UploadSettingsBarComponent,
    SpinnerComponent
  ],
})
export class CustomComponentsModule {}
