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
export class ProfileComponent implements OnInit, IPost {
  user: IUser;
  homePost: IPost;
  userId: string;
  userPosts: IPost[] = [];
  allposts: IPost[];

  constructor(
    private router: Router,
    private api: ApiService,
    private destroyRef: DestroyRef
  ) {}
  // --- for IPost ---
  userid: number;
  userPost: string;
  postLikeBool: boolean;
  postLikes?: [{ liked: string; likedBy: string }];
  commentBoxBool: boolean;
  comments?: [{ comment: string; by: string }];
  id?: number;

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
          this.user = res;
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
    };
    this.api
      .postHomePosts(this.homePost)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.findUserPosts();
      });
  }
  //  Delete Post ---
  deletePostHome(postId: number) {
    this.api
      .deleteFromHomePosts(postId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.findUserPosts();
      });
  }
}
