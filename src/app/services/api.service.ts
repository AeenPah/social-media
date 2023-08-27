import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  // post ...
  postHomePosts(homePost: any) {
    return this.http.post<any>('http://localhost:3000/homePosts', homePost);
  }
  postUsers(user: any) {
    return this.http.post('http://localhost:3000/users', user);
  }

  // get ...
  getFromUsers() {
    return this.http.get<any>('http://localhost:3000/users');
  }
  getFromUsersById(id: string) {
    return this.http.get<any>('http://localhost:3000/users/' + id);
  }
  getFromHomePostsIndash(page: number, limit: number) {
    return this.http.get<any>(
      `http://localhost:3000/homePosts?_page=${page}&_limit=${limit}`
    );
  }
  getFromHomePosts() {
    return this.http.get<any>(`http://localhost:3000/homePosts`);
  }

  // put ...
  putUserById(userId: any, user: any) {
    return this.http.put<any>('http://localhost:3000/users/' + userId, user);
  }
  putHomePosts(id: any, item: any) {
    return this.http.put<any>('http://localhost:3000/homePosts/' + id, item);
  }

  // delete ...
  deleteFromHomePosts(id: any) {
    return this.http.delete<any>('http://localhost:3000/homePosts/' + id);
  }
}
