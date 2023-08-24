import { Component, DestroyRef, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  allPostsInf: any;
  allUsersInf: any;
  likeBollean: boolean = true;
  page: number = 1;
  limit: number = 5;
  testPostLenght: number;
  postsInLoop: any;
  postsByPages = [];
  counter = 0;
  loopCount: number;

  constructor(private api: ApiService, private destryRef: DestroyRef) {}

  ngOnInit(): void {
    this.getPosts();
    this.getUsers();
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

  getPosts() {
    this.api.getFromHomePosts().subscribe((res) => {
      this.testPostLenght = res.length;
      console.log(res.length);

      for (let index = 0; index < this.testPostLenght / 5; index++) {
        this.api.getFromHomePostsIndash(index + 1, 5).subscribe((r) => {
          this.postsInLoop = r;
          this.postsByPages.push([...this.postsInLoop]);
          // console.log(this.testone);
          this.loopCount = index;
          this.allPostsInf = this.postsByPages[0];
        });
      }
    });
  }

  getUsers() {
    this.api
      .getFromUsers()
      .pipe(takeUntilDestroyed(this.destryRef))
      .subscribe((res) => {
        this.allUsersInf = res;
        console.log(this.allUsersInf);
      });
  }
  toNextPage() {
    if (this.counter < this.loopCount) {
      this.counter++;
      this.allPostsInf = this.postsByPages[this.counter];
    }
  }
  toPrevPage() {
    if (this.counter > 0) {
      this.counter--;
      this.allPostsInf = this.postsByPages[this.counter];
    }
  }
}
