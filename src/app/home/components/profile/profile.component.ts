import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { IPost } from 'src/app/interfaces/post.inteface';
import { IUser } from 'src/app/interfaces/user.interface';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  onlineUser: IUser;
  homePost: IPost;
  userId: string;
  userPosts: IPost[] = [];
  allposts: IPost[];
  comments: any = [{ user: '' }];
  inProfilePageBool: boolean = true;

  constructor(
    private router: Router,
    private api: ApiService,
    private destroyRef: DestroyRef
  ) {}
  likeBoxBool: boolean;

  ngOnInit(): void {
    this.checkUserFromAPI();
    this.findUserPosts();
  }

  //  Primary User Check ---
  checkUserFromAPI() {
    this.userId = localStorage.getItem('UserId');
    if (this.userId != '0') {
      this.api
        .getFromUsersById(this.userId)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((res) => {
          this.onlineUser = res;
        });
    } else {
      this.router.navigate(['/login']);
    }
  }
  findUserPosts() {
    this.userPosts = [];
    this.api
      .getFromHomePosts()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.allposts = res;
        this.allposts.map((userPostFind: IPost) => {
          if (+localStorage.getItem('UserId') == userPostFind.userid) {
            this.userPosts.push(userPostFind);
          }
        });
      });
  }
  //  Post Text ---
  postText(post: string) {
    this.homePost = {
      userid: +localStorage.getItem('UserId'),
      userPost: post,
      commentBoxBool: false,
      postLikeBool: false,
      likeBoxBool: false,
      postLikes: [{ liked: '', likedBy: '' }],
    };
    this.api
      .postHomePosts(this.homePost)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.findUserPosts();
      });
  }
}
