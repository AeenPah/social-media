import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any;
  newuser: any;
  postDate: Date = new Date();
  posttxt!: string;
  currentPost: string[] = [''];
  anotherCurrntPost: string[] = [''];
  homePost: any;
  tempUserId: any;
  userId: string;

  constructor(
    private router: Router,
    private api: ApiService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('UserId');
    if (this.userId != '0') {
      this.api
        .getFromUsersById(this.userId)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((res) => {
          this.user = res;
          this.currentPost = this.user.posts;
          this.anotherCurrntPost = this.user.posts;
        });
      console.log(this.user);
    } else {
      this.router.navigate(['/login']);
    }
  }

  postText() {
    this.currentPost.push(this.posttxt);
    this.user.posts = this.currentPost;
    this.api
      .putUserById(this.user.id, this.user)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
    //  --------------------------------------------------
    this.homePost = {
      userid: this.user.id,
      userPost: this.posttxt,
      postLikes: 0,
      postLikeBool: false,
    };
    this.api
      .postHomePosts(this.homePost)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
  deleteText(a: number) {
    this.currentPost.splice(a, 1);
    this.user.posts = this.currentPost;
    this.api
      .putUserById(this.user.id, this.user)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
  deleteTextHome(a: number) {
    this.api
      .getFromHomePosts()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        const homepost = res.find((item: any) => {
          this.tempUserId = item.id;

          return item.userPost == this.anotherCurrntPost[a];
        });
        if (homepost) {
          console.log('we find it');
          this.api
            .deleteFromHomePosts(this.tempUserId)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe();
          this.deleteText(a);
        } else {
          console.log('We can not find the post in home!');
        }
      });
  }
}
