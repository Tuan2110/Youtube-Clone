import { Component } from '@angular/core';
import { VideoDTO } from '../dto/video-dto';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrl: './subscriptions.component.css'
})
export class SubscriptionsComponent {
  videos : Array<VideoDTO> = [];

  constructor(private videoService: VideoService) {
  }

  ngOnInit(): void {
    this.videoService.getsubscribedVideos().subscribe(response => {
      this.videos = response;
    })
  }
}
