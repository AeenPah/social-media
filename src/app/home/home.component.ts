import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  allPostsInf: any;
  allUsersInf: any;
  likeBollean: boolean = true;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getFromHomePosts().subscribe((res) => {
      this.allPostsInf = res;
      console.log(this.allPostsInf);
    });
    this.api.getFromUsers().subscribe((res) => {
      this.allUsersInf = res;
      console.log(this.allUsersInf);
    });
  }

  likePost(item: any) {
    if (!item.postLikeBool) {
      item.postLikes++;
      console.log(item);
      this.api.putHomePosts(item.id, item).subscribe((res) => {
        console.log(res);
      });
      item.postLikeBool = true;
    }
  }
}
