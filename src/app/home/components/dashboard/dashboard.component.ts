import {
  Component,
  DestroyRef,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent, map } from 'rxjs';

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
  onlineUser: any;
  // new vars
  newCounter: number = 1;
  postNumbers: number;
  postNumbersArr: number[];

  constructor(private api: ApiService, private destroyRef: DestroyRef) {}

  ngOnInit(): void {
    this.getOnlineUser(localStorage.getItem('UserId'));
    this.getAllPosts();
    this.getUsers();
    this.getPosts();
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

  getAllPosts() {
    this.api
      .getFromHomePosts()
      .pipe()
      .subscribe((res) => {
        this.postNumbers = res.length;
        this.postNumbers = Math.ceil(this.postNumbers / 5);
        this.postNumbersArr = Array(this.postNumbers)
          .fill(0)
          .map((x, i) => i + 1);
      });
  }
  getPosts() {
    this.api
      .getFromHomePostsIndash(this.newCounter, 5)
      .pipe()
      .subscribe((res) => {
        this.allPostsInf = res;
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
  // receiveFromChild(posts: any) {
  //   this.allPostsInf = posts;
  // }
  toNextPage() {
    if (this.newCounter <= this.postNumbers) {
      this.newCounter++;
      this.getPosts();
    }
  }
  goToPage(page: number) {
    this.newCounter = page;
    this.getPosts();
  }
  toPrevPage() {
    if (this.newCounter > 1) {
      this.newCounter--;
      this.getPosts();
    }
  }
}
