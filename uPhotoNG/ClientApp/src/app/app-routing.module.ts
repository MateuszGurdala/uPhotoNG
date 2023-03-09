import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './app-pages/home-page/home-page.component';
import { LayoutComponent } from './app-pages/Other/layout/layout.component';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { authGuard } from './services/authGuard';
import { PhotosPageComponent } from './app-pages/Photos/photos-page/photos-page.component';
import { AlbumsPageComponent } from './app-pages/albums-page/albums-page.component';
import { PlacesPageComponent } from './app-pages/places-page/places-page.component';
import { PhotoUploadPageComponent } from './app-pages/Photos/photo-upload-page/photo-upload-page.component';

const routes: Routes = [
  { path: 'SignIn', component: SignInPageComponent },
  { path: 'SignUp', component: SignUpPageComponent },
  { path: 'App', redirectTo: '/App/Homepage', pathMatch: 'full' },
  {
    path: 'App',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'Homepage', component: HomePageComponent },
      { path: 'Photos', component: PhotosPageComponent },
      { path: 'UploadPhotos', component: PhotoUploadPageComponent },
      { path: 'Albums', component: AlbumsPageComponent },
      { path: 'Places', component: PlacesPageComponent },
    ],
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
