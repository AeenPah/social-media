import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  allPostsInf: any;
  allUsersInf: any;
  likeBollean: boolean = true;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    let start = 0;
    let end = 10;

    this.api.getFromHomePostsIndash(start, end).subscribe((res) => {
      this.allPostsInf = res;
      console.log(this.allPostsInf.length);
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
