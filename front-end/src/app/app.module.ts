import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UploadVideoComponent } from './upload-video/upload-video.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgxFileDropModule } from "ngx-file-drop";
import { MatButtonModule } from "@angular/material/button";
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatOptionModule } from "@angular/material/core";
import { MatInputModule } from "@angular/material/input";
import { MatChipsModule } from "@angular/material/chips";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { MatMenuModule } from "@angular/material/menu";
import { SaveVideoDetailComponent } from './save-video-detail/save-video-detail.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { AuthConfigModule } from './auth/auth-config.module';
import { AuthInterceptor } from 'angular-auth-oidc-client';
import { VideoDetailComponent } from './video-detail/video-detail.component';
import { HomeComponent } from './home/home.component';
import { HistoryComponent } from './history/history.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LikedVideosComponent } from './liked-videos/liked-videos.component';
import { FeaturedComponent } from './featured/featured.component';
import { VideoCardComponent } from './video-card/video-card.component';
import { CommentsComponent } from './comments/comments.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { TimeagoModule } from 'ngx-timeago';
import { CommentCardComponent } from './comment-card/comment-card.component';
import { SuggestVideoComponent } from './suggest-video/suggest-video.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { LoginInterceptor } from './login.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    UploadVideoComponent,
    HeaderComponent,
    SaveVideoDetailComponent,
    VideoPlayerComponent,
    VideoDetailComponent,
    HomeComponent,
    HistoryComponent,
    SubscriptionsComponent,
    SidebarComponent,
    LikedVideosComponent,
    FeaturedComponent,
    VideoCardComponent,
    CommentsComponent,
    CommentCardComponent,
    SuggestVideoComponent,
    UnauthorizedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgxFileDropModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    ReactiveFormsModule,
    MatChipsModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    MatSnackBarModule,
    AuthConfigModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatMenuModule,
    MatGridListModule,
    TimeagoModule.forRoot()
  ],
  providers: [
    provideAnimationsAsync(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoginInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
