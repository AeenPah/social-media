import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  allPostsInf: any;
  allUsersInf: any;
  likeBollean: boolean = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('http://localhost:3000/homePosts').subscribe((res) => {
      this.allPostsInf = res;
      console.log(this.allPostsInf);
    });
    this.http.get<any>('http://localhost:3000/users').subscribe((res) => {
      this.allUsersInf = res;
      console.log(this.allUsersInf);
    });
  }

  likePost(item: any) {
    if (!item.postLikeBool) {
      item.postLikes++;
      console.log(item);
      this.http
        .put<any>('http://localhost:3000/homePosts/' + item.id, item)
        .subscribe((res) => {
          console.log(res);
        });
      item.postLikeBool = true;
    }
  }
}
