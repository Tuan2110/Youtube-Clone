import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';
import { VideoService } from '../video.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VideoDTO } from '../dto/video-dto';
import { UserService } from '../user.service';

@Component({
  selector: 'app-save-video-detail',
  templateUrl: './save-video-detail.component.html',
  styleUrl: './save-video-detail.component.css'
})
export class SaveVideoDetailComponent {

  savedVideoDetailForm : FormGroup;
  title : FormControl = new FormControl('');
  description : FormControl = new FormControl('');
  videoStatus : FormControl = new FormControl('');
  addOnBlur = true;
  tags: string[] = [];
  selectedFile !: File;
  selectedFileName = '';
  videoId = '';
  fileSelected = false;
  videoUrl !: string;
  thumbnailUrl !: string;

  announcer = inject(LiveAnnouncer);

  constructor(
    private activeRouter : ActivatedRoute,
    private videoService : VideoService,
    private matSnackBar : MatSnackBar,
    private userService : UserService,
    private router : Router
  ) {
    this.videoId = this.activeRouter.snapshot.params['videoId'];
    this.videoService.getVideo(this.videoId).subscribe(data => {
      this.videoUrl = data.videoUrl;
      this.thumbnailUrl = data.thumbnailUrl;
    });
    this.savedVideoDetailForm = new FormGroup({
      title : this.title,
      description : this.description,
      videoStatus : this.videoStatus
    });
  }

  ngOnInit() : void {

  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.tags.push(value);
    }

    event.chipInput!.clear();
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);

      this.announcer.announce(`Removed ${tag}`);
    }
  }

  edit(tag: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) {
      this.remove(tag);
      return;
    }

    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags[index] = value;
    }
  }

  onFileSelected(event : Event){
    this.selectedFile = (event.target as HTMLInputElement).files![0];
    this.selectedFileName = this.selectedFile.name;
    this.fileSelected = true;
  }

  saveVideo(){
    this.videoService.saveVideo(
      this.videoId
      ,this.selectedFile,
      this.userService.getUserId(),
      this.savedVideoDetailForm.get('title')?.value,
      this.savedVideoDetailForm.get('description')?.value,
    this.tags,
    this.savedVideoDetailForm.get('videoStatus')?.value
  ).subscribe(data => {
      console.log(data);
      this.matSnackBar.open('Video saved successfully','Ok')
      this.router.navigateByUrl('/video-detail/'+this.videoId);
    });
  }
  

}
