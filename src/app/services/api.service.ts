import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPost } from '../interfaces/post.inteface';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  // post ...
  postHomePosts(homePost: IPost) {
    return this.http.post<IPost>('http://localhost:3000/homePosts', homePost);
  }
  postUsers(user: IUser) {
    return this.http.post('http://localhost:3000/users', user);
  }

  // get ...
  getFromUsers() {
    return this.http.get<any>('http://localhost:3000/users');
  }
  getFromUsersById(id: string) {
    return this.http.get<IUser>('http://localhost:3000/users/' + id);
  }
  getFromHomePostsIndash(page: number, limit: number) {
    return this.http.get<any>(
      `http://localhost:3000/homePosts?_page=${page}&_limit=${limit}`
    );
  }
  getFromHomePosts() {
    return this.http.get<IPost[]>(`http://localhost:3000/homePosts`);
  }

  // put ...
  putUserById(userId: any, user: any) {
    return this.http.put<any>('http://localhost:3000/users/' + userId, user);
  }
  putHomePosts(id: any, item: any) {
    return this.http.put<any>('http://localhost:3000/homePosts/' + id, item);
  }

  // delete ...
  deleteFromHomePosts(id: number) {
    return this.http.delete<number>('http://localhost:3000/homePosts/' + id);
  }
}
