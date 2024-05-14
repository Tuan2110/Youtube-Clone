import { Component } from '@angular/core';
import { VideoDTO } from '../dto/video-dto';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrl: './featured.component.css'
})
export class FeaturedComponent {
  featuredVideos: Array<VideoDTO> = [];

  constructor(private videoService: VideoService) {
  }

  ngOnInit(): void {
    this.videoService.getAllVideos('').subscribe(response => {
      this.featuredVideos = response;
    })
  }

  search(searchValue : string){
    this.videoService.getAllVideos(searchValue).subscribe(response => {
      this.featuredVideos = response;
    })
  }
}
