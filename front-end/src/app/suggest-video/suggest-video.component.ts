import { Component, Input } from '@angular/core';
import { VideoDTO } from '../dto/video-dto';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suggest-video',
  templateUrl: './suggest-video.component.html',
  styleUrl: './suggest-video.component.css'
})
export class SuggestVideoComponent {
  @Input()
  video !: VideoDTO
  
  user : any
    
    constructor(
      private router : Router,
      private userService: UserService) { 
    }
    ngOnInit(): void {
      this.user = this.userService.getUserById(this.video.userId).subscribe((data) => {
        this.user = data;
      });
    }
    viewDetail(videoId : string) {
      window.location.href = '/video-detail/' + videoId;
    }
}
