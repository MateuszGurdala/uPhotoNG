import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { CustomComponentsModule } from './custom-components/custom-components.module';
import ToolBox from './services/tool-box.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicModule } from '@ionic/angular';
import { LayoutComponent } from './layout/layout.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    SignInPageComponent,
    SignUpPageComponent,
    LayoutComponent,
    HomePageComponent,
  ],
  imports: [
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
  ],
  providers: [ToolBox, Title],
  bootstrap: [AppComponent],
})
export class AppModule {}
