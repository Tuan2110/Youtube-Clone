import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../video.service';
import { UserService } from '../user.service';
import { VideoDTO } from '../dto/video-dto';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrl: './video-detail.component.css'
})
export class VideoDetailComponent {
  
  videoId !: string;
  videoUrl !: string;
  thumbnailUrl !: string;
  videoAvailable : boolean = false;
  videoTitle !: string;
  videoDescription !: string;
  tags : Array<string> = [];
  likedCount : number = 0;
  dislikedCount : number = 0;
  viewCount : number = 0;
  showSubscribeButton: boolean = true;
  showUnSubscribeButton: boolean = false;
  user : any;
  userId !: string;
  videos: Array<VideoDTO> = [];
  createdAt !: Date;
  subscribed !: boolean

  constructor(
    private activeRouter : ActivatedRoute,
    private videoService : VideoService,
    private userService : UserService
  ) { 
    this.videoId = this.activeRouter.snapshot.params['videoId'];
    this.videoService.getVideo(this.videoId).subscribe(data => {
      console.log(data);
      this.videoUrl = data.videoUrl;
      this.videoAvailable = true;
      this.videoTitle = data.title;
      this.thumbnailUrl = data.thumbnailUrl;
      this.videoDescription=data.description;
      this.tags=data.tags;
      this.likedCount=data.likedCount;
      this.dislikedCount=data.dislikedCount;
      this.viewCount=data.viewCount;
      this.userId = data.userId;
      this.createdAt = data.createdAt  
      this.userService.getUserById(data.userId).subscribe(data => {
        this.user = data;
        console.log(this.user);
        if(this.user?.subscribers.includes(this.userService.getUserId())){
          this.showUnSubscribeButton = true;
          this.showSubscribeButton = false;
        }else{
          this.showUnSubscribeButton = false;
          this.showSubscribeButton = true;
        }
      })
    })
  }
  ngOnInit(): void {
    this.videoService.getAllVideos('').subscribe(response => {
      this.videos = response;
    })
  }

  likeVideo() {
    this.videoService.likeVideo(this.videoId).subscribe(data => {
      this.likedCount = data.likedCount;
      this.dislikedCount = data.dislikedCount;
    })
  }

  disLikeVideo() {
    this.videoService.disLikeVideo(this.videoId).subscribe(data => {
      this.likedCount = data.likedCount;
      this.dislikedCount = data.dislikedCount;
    })
  }

  subscribeToUser() {
    this.userService.subscribeToUser(this.userId).subscribe(data => {
      this.showUnSubscribeButton = true;
      this.showSubscribeButton = false;
    })
  }

  unSubscribeToUser() {
    this.userService.unSubscribeUser(this.userId).subscribe(data => {
      this.showUnSubscribeButton = false;
      this.showSubscribeButton = true;
    })
  }
}
