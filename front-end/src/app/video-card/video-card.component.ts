import { Component, Input } from '@angular/core';
import { VideoDTO } from '../dto/video-dto';
import { UserService } from '../user.service';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrl: './video-card.component.css'
})
export class VideoCardComponent {

  @Input()
  video!: VideoDTO;
  @Input()
  userId!: string;

  user : any;

  constructor(private userService : UserService) {
    
  }

  ngOnInit() : void {
    this.userService.getUserById(this.userId).subscribe(data => {
      this.user = data;
    });
  }
}
