import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './app-pages/home-page/home-page.component';
import { LayoutComponent } from './app-pages/layout/layout.component';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { authGuard } from './services/authGuard';

const routes: Routes = [
  { path: 'SignIn', component: SignInPageComponent },
  { path: 'SignUp', component: SignUpPageComponent },
  { path: 'App', redirectTo: 'App/Homepage' },
  {
    path: 'App',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [{ path: 'Homepage', component: HomePageComponent }],
  },
  { path: '', component: WelcomePageComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
