import { Component, DestroyRef, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserDataService } from 'src/app/services/user-data.service';

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
  pagesNumber: number[];
  comments: any = [{ user: '' }];
  test: any;
  onlineUser: any;

  constructor(
    private api: ApiService,
    private destroyRef: DestroyRef,
    private userDataService: UserDataService
  ) {}

  ngOnInit(): void {
    this.getOnlineUser(localStorage.getItem('UserId'));
    this.getPosts();
    this.getUsers();
  }

  likePost(item: any) {
    if (!item.postLikeBool) {
      console.log(item);
      item.postLikes++;
      this.api
        .putHomePosts(item.id, item)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((res) => {
          console.log(res);
        });
      item.postLikeBool = true;
    }
  }

  showCommentBox(item: any) {
    console.log(item);

    item.commentBoxBool = !item.commentBoxBool;
  }
  postComment(comment: string, item: any) {
    if (item.comments) {
      this.comments = item.comments;
    }
    this.comments.push({
      comment: comment,
      by: this.onlineUser.fullName,
    });
    item.comments = this.comments;
    console.log(item);
    item.commentBoxBool = !item.commentBoxBool;
    this.api
      .putHomePosts(item.id, item)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
    this.comments = [{ user: '' }];
  }

  getPosts() {
    this.api
      .getFromHomePosts()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.testPostLenght = res.length;
        console.log(res.commentBoxBool);

        for (let index = 0; index < this.testPostLenght / 5; index++) {
          this.api.getFromHomePostsIndash(index + 1, 5).subscribe((r) => {
            this.postsInLoop = r;
            this.postsByPages.push([...this.postsInLoop]);
            this.loopCount = index;
            this.counter = this.loopCount;
            this.allPostsInf = this.postsByPages[this.loopCount];
            this.pagesNumber = Array(this.loopCount + 1)
              .fill(0)
              .map((x, i) => i + 1);
          });
        }
      });
  }
  getUsers() {
    this.api
      .getFromUsers()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.allUsersInf = res;
        console.log(this.allUsersInf);
      });
  }
  getOnlineUser(id: string) {
    this.api.getFromUsersById(id).subscribe((res) => {
      this.onlineUser = res;
    });
  }
  // // for page controller...
  receiveFromChild(posts: any) {
    this.allPostsInf = posts;
  }
  // toNextPage() {
  //   if (this.counter < this.loopCount) {
  //     this.counter++;
  //     this.allPostsInf = this.postsByPages[this.counter];
  //   }
  // }
  // toPrevPage() {
  //   if (this.counter > 0) {
  //     this.counter--;
  //     this.allPostsInf = this.postsByPages[this.counter];
  //   }
  // }
  // goToPage(page: number) {
  //   this.counter = page;
  //   this.allPostsInf = this.postsByPages[page];
  // }
}
