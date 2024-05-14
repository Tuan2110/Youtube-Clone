import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommentDto } from '../dto/comment-dto';
import { UserService } from '../user.service';
import { CommentService } from '../comment.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrl: './comment-card.component.css'
})
export class CommentCardComponent {
  @Input()
  comment !: CommentDto;
  user !: any;
  @Input()
  videoId !: string;

  loginUserId: string = this.userService.getUserId();

  constructor(
    private userService: UserService,
    private commentService: CommentService,
    private matSnackBar: MatSnackBar
  ) {
  }
  ngOnInit() {
    this.userService.getUserById(this.comment.authorId).subscribe(data => {
      this.user = data;
      console.log(this.user);
    })
  }
  deleteComment(commentId: string) {
    this.commentService.deleteComment(this.videoId, commentId).subscribe(() => {
      this.matSnackBar.open("Comment Deleted Successfully", "OK");
      this.notifyDeletion(commentId);
    });
  }
  
  @Output() onDeleteComment = new EventEmitter<string>();

  notifyDeletion(commentId: string) {
    this.onDeleteComment.emit(commentId);
  }
}
