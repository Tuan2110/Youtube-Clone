import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentDto } from './dto/comment-dto';
import { AppSettings } from '../config/AppSettings';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) {
  }

  postComment(commentDto: any, videoId: string): Observable<any> {
    return this.httpClient.post<any>(`${AppSettings.API_BASE_URL}/api/v1/videos/${videoId}/comment`, commentDto);
  }

  getAllComments(videoId: string): Observable<Array<CommentDto>> {
    return this.httpClient.get<CommentDto[]>(`${AppSettings.API_BASE_URL}/api/v1/videos/${videoId}/comment`);
  }
  deleteComment(videoId: string, commentId: string): Observable<any> {
    return this.httpClient.delete<any>(`${AppSettings.API_BASE_URL}/api/v1/videos/${videoId}/comment/${commentId}`);
  }
}
