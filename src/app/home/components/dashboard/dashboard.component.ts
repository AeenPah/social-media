import { Component, DestroyRef, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IUser } from 'src/app/interfaces/user.interface';
import { IPost } from 'src/app/interfaces/post.inteface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  allPostsInf: IPost[];
  allUsersInf: IUser[];
  comments: any = [{ user: '' }];
  showHideLikedByNamesBool: boolean = false;
  onlineUser: IUser;
  // new vars
  counter: number = 1;
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
        this.postNumbersArr = Array(Math.ceil(res.length / 5))
          .fill(0)
          .map((x, i) => i + 1);
      });
  }
  getPosts() {
    this.api
      .getFromHomePostsIndash(this.counter, 5)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.allPostsInf = res;
        this.allPostsInf.map((post: IPost) => {
          const islikedB: any = post.postLikes.find((z) => {
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

  // page controller ...
  toNextPage() {
    if (this.counter < this.postNumbers) {
      this.counter++;
      this.getPosts();
    }
  }
  goToPage(page: number) {
    this.counter = page;
    this.getPosts();
  }
  toPrevPage() {
    if (this.counter > 1) {
      this.counter--;
      this.getPosts();
    }
  }
}
