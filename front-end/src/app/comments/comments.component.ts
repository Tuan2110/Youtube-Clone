import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CommentDto } from '../dto/comment-dto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommentService } from '../comment.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent {
  @Input()
  videoId: string = '';
  commentsForm: FormGroup;
  commentsDto: CommentDto[] = [];
  createdAt !: Date;

  constructor(private userService: UserService, private commentService: CommentService,
              private matSnackBar: MatSnackBar) {
    this.commentsForm = new FormGroup({
      comment: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.getComments();
  }

  postComment() {
    const comment = this.commentsForm.get('comment')?.value;
    if (!comment) {
      this.matSnackBar.open("Comment cannot be empty", "OK");
      return;
    }
    const commentDto = {
      "content": comment,
      "authorId": this.userService.getUserId()
    }

    this.commentService.postComment(commentDto, this.videoId).subscribe(() => {
      this.matSnackBar.open("Comment Posted Successfully", "OK");

      this.commentsForm.get('comment')?.reset();
      this.getComments();
    })
  }

  getComments() {
    this.commentService.getAllComments(this.videoId).subscribe(data => {
      this.commentsDto = data;
    });
  }

  deleteCommentFromList(commentId: string) {
    this.commentsDto = this.commentsDto.filter(comment => comment.id !== commentId);
  }
}
