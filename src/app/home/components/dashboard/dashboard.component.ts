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
  comments: any = [{ user: '' }];
  showHideLikedByNamesBool: boolean = false;
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

  // primary functions ...
  getOnlineUser(id: string) {
    this.api.getFromUsersById(id).subscribe((res) => {
      this.onlineUser = res;
    });
  }
  getAllPosts() {
    this.api
      .getFromHomePosts()
      .pipe(takeUntilDestroyed(this.destroyRef))
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
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.allPostsInf = res;
        this.allPostsInf.map((post: any) => {
          const islikedB = post.postLikes.find((z: any) => {
            return z.likedBy === this.onlineUser.fullName;
          });
          if (islikedB) {
            post.postLikeBool = true;
          } else {
            post.postLikeBool = false;
          }
        });
        this.allPostsInf = this.allPostsInf.reverse();
      });
  }
  getUsers() {
    this.api
      .getFromUsers()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.allUsersInf = res;
      });
  }
  // likes functions ...
  showHideLikedByNames(item: any) {
    if (item.postLikes.length != 1) {
      item.showHideLikedByNamesBool = !item.showHideLikedByNamesBool;
      if ((item.showHideLikedByNamesBool = true)) {
        setTimeout(() => {
          item.showHideLikedByNamesBool = false;
        }, 1500);
      }
    }
  }
  likePost(item: any) {
    if (!item.postLikeBool) {
      item.postLikes.push({ liked: true, likedBy: this.onlineUser.fullName });
      item.postLikeBool = true;
    } else {
      let likeby: number;
      likeby = item.postLikes.findIndex((x: any) => {
        return x.likedBy === this.onlineUser.fullName;
      });
      item.postLikes.splice(likeby, 1);
      item.postLikeBool = false;
    }
    this.api
      .putHomePosts(item.id, item)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
  // comment functions ...
  showCommentBox(item: any) {
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
    item.commentBoxBool = !item.commentBoxBool;
    this.api
      .putHomePosts(item.id, item)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
    this.comments = [{ user: '' }];
  }
  // page controller ...
  toNextPage() {
    if (this.newCounter < this.postNumbers) {
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
