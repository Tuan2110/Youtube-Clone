import { Component } from '@angular/core';
import { VideoDTO } from '../dto/video-dto';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {
  videos : Array<VideoDTO> = [];

  constructor(private videoService: VideoService) {
  }

  ngOnInit(): void {
    this.videoService.getHistory().subscribe(response => {
      this.videos = response;
    })
  }
}
