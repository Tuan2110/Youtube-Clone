import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../config/AppSettings';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userId: string = '';

  constructor(private httpClient: HttpClient) {
  }

  subscribeToUser(userId: string): Observable<boolean> {
    return this.httpClient.post<boolean>(`${AppSettings.API_BASE_URL}/api/v1/users/subscribe/${userId}`, null);
  }

  unSubscribeUser(userId: string): Observable<boolean> {
    return this.httpClient.post<boolean>(`${AppSettings.API_BASE_URL}/api/v1/users/unsubscribe/${userId}`, null);
  }

  registerUser() {
    this.httpClient.get(`${AppSettings.API_BASE_URL}/api/v1/users/register`, {responseType: "text"},)
      .subscribe(data => {
        this.userId = data;
      })
  }

  getUserId(): string {
    return this.userId;
  }
  getUserById(userId: string): Observable<any> {
    return this.httpClient.get(`${AppSettings.API_BASE_URL}/api/v1/users/${userId}`);
  }
}
