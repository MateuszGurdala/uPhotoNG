import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AppComponent } from './app.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { CustomComponentsModule } from './custom-components/custom-components.module';
import ToolBox from './scripts/tool-box.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    SignInPageComponent,
    SignUpPageComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    IonicModule,
    RouterModule.forRoot([
      { path: 'SignIn', component: SignInPageComponent },
      { path: 'SignUp', component: SignUpPageComponent },
      { path: '', component: WelcomePageComponent, pathMatch: 'full' },
      { path: '**', redirectTo: '/' },
    ]),
    CustomComponentsModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      "closeButton": false,
      "newestOnTop": true,
      "progressBar": false,
      "positionClass": "toast-top-center",
      "preventDuplicates": true,
      "timeOut": 50000,
      "tapToDismiss": true,
      "toastClass": "custom-toast ngx-toastr"
    })
  ],
  providers: [ToolBox],
  bootstrap: [AppComponent],
})
export class AppModule {}
