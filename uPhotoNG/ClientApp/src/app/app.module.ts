// Modules
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CustomDirectivesModule } from './custom-directives/custom-directives.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppPagesModule } from './app-pages/app-pages.module';
import { IonicModule } from '@ionic/angular';
import { CustomComponentsModule } from './custom-components/custom-components.module';

//Components
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './base-pages/welcome-page/welcome-page.component';
import { SignInPageComponent } from './base-pages/sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './base-pages/sign-up-page/sign-up-page.component';
import { AccountHttpClientService } from './services/account-http-client.service';

// Services
import ToolBox from './services/tool-box.service';

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
    CustomDirectivesModule,
  ],
  providers: [ToolBox, Title, HttpClient, AccountHttpClientService],
  bootstrap: [AppComponent],
})
export class AppModule {}
