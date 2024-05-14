import { Component } from '@angular/core';
import { VideoDTO } from '../dto/video-dto';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-liked-videos',
  templateUrl: './liked-videos.component.html',
  styleUrl: './liked-videos.component.css'
})
export class LikedVideosComponent {
  videos : Array<VideoDTO> = [];

  constructor(private videoService: VideoService) {
  }

  ngOnInit(): void {
    this.videoService.getlikedVideos().subscribe(response => {
      this.videos = response;
    })
  }
}
