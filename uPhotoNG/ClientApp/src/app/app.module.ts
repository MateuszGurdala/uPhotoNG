import { BrowserModule, Title } from '@angular/platform-browser';
import { ChangeDetectorRef, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { CustomComponentsModule } from './custom-components/custom-components.module';
import ToolBox from './services/tool-box.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppPagesModule } from './app-pages/app-pages.module';
import { AccountHttpClientService } from './services/account-http-client.service';
import { CommonModule } from '@angular/common';
import { CustomDirectivesModule } from './custom-directives/custom-directives.module';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    SignInPageComponent,
    SignUpPageComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    CustomComponentsModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      closeButton: false,
      newestOnTop: true,  
      progressBar: false,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
      timeOut: 5000,
      tapToDismiss: true,
      toastClass: 'custom-toast ngx-toastr',
    }),
    IonicModule.forRoot(),
    AppRoutingModule,
    AppPagesModule,
    HttpClientModule,
    CustomDirectivesModule
  ],
  providers: [ToolBox, Title, HttpClient, AccountHttpClientService],
  bootstrap: [AppComponent],
})
export class AppModule {}
