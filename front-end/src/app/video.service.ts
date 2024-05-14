import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileSystemFileEntry } from 'ngx-file-drop';
import { Observable } from 'rxjs';
import { UploadVideoResponse } from './upload-video/UploadVideoResponse';
import { AppSettings } from '../config/AppSettings';
import { VideoDTO } from './dto/video-dto';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  [x: string]: any;

  constructor(private httpClient: HttpClient) {

  }
  uploadVideo(fileEntry : File) : Observable<UploadVideoResponse> {
    const formData = new FormData();
    formData.append('file', fileEntry,fileEntry.name);
    return this.httpClient.post<UploadVideoResponse>(`${AppSettings.API_BASE_URL}/api/v1/videos`, formData);
  }

  getVideo(videoId : string) : Observable<VideoDTO>{
    return this.httpClient.get<VideoDTO>(`${AppSettings.API_BASE_URL}/api/v1/videos/${videoId}`)
  }

  saveVideo(id:string,fileEntry : File,userId : string,title : any ,
    description : any,tags : string[],videoStatus : any
  ) : Observable<any>{
    const formData = new FormData();
    formData.append('id', id);
    formData.append('file', fileEntry,fileEntry.name);
    formData.append('userId', userId);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('videoStatus', videoStatus);
    tags.forEach(tag => formData.append('tags', tag));
    return this.httpClient.put(`${AppSettings.API_BASE_URL}/api/v1/videos`,formData);
  }

  getAllVideos(search : string) : Observable<Array<VideoDTO>>{
    return this.httpClient.get<Array<VideoDTO>>(`${AppSettings.API_BASE_URL}/api/v1/videos`,{
      params : {
        search : search
      }
    });
  }
  getlikedVideos() : Observable<Array<VideoDTO>>{
    return this.httpClient.get<Array<VideoDTO>>(`${AppSettings.API_BASE_URL}/api/v1/videos/liked`);
  }
  getsubscribedVideos() : Observable<Array<VideoDTO>>{
    return this.httpClient.get<Array<VideoDTO>>(`${AppSettings.API_BASE_URL}/api/v1/videos/subscribed`);
  }
  getHistory() : Observable<Array<VideoDTO>>{
    return this.httpClient.get<Array<VideoDTO>>(`${AppSettings.API_BASE_URL}/api/v1/videos/history`);
  }

  likeVideo(videoId: string): Observable<VideoDTO> {
    return this.httpClient.post<VideoDTO>(`${AppSettings.API_BASE_URL}/api/v1/videos/${videoId}/like`, null);
  }

  disLikeVideo(videoId: string): Observable<VideoDTO> {
    return this.httpClient.post<VideoDTO>(`${AppSettings.API_BASE_URL}/api/v1/videos/${videoId}/dislike`, null);
  }

}
