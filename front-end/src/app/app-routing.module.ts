import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadVideoComponent } from './upload-video/upload-video.component';
import { SaveVideoDetailComponent } from './save-video-detail/save-video-detail.component';
import { VideoDetailComponent } from './video-detail/video-detail.component';
import { HomeComponent } from './home/home.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { HistoryComponent } from './history/history.component';
import { LikedVideosComponent } from './liked-videos/liked-videos.component';
import { FeaturedComponent } from './featured/featured.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

const routes: Routes = [
  {
    path : '',
    component : HomeComponent,
    children : [
      {
        path : 'subscriptions',
        component : SubscriptionsComponent
      },
      {
        path : 'featured',
        component : FeaturedComponent
      },
      {
        path : 'history',
        component : HistoryComponent
      },
      {
        path : 'liked-videos',
        component : LikedVideosComponent
      },
    ]
  },
  {
    path : 'upload-video',
    component : UploadVideoComponent
  },
  {
    path : 'save-video-detail/:videoId',
    component : SaveVideoDetailComponent
  },
  {
    path : 'video-detail/:videoId',
    component : VideoDetailComponent
  },
  {
    path : 'unauthorized',
    component : UnauthorizedComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
