import { Component, DestroyRef, Input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IPost } from 'src/app/interfaces/post.inteface';
import { IUser } from 'src/app/interfaces/user.interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-each-post',
  templateUrl: './each-post.component.html',
  styleUrls: ['./each-post.component.css'],
})
export class EachPostComponent implements OnInit {
  onlineUser: IUser;
  comments: any = [{ user: '' }];
  @Input() post: IPost;
  @Input() allUsersInf: IUser[];

  constructor(private api: ApiService, private destroyRef: DestroyRef) {}

  ngOnInit(): void {
    this.getOnlineUser(localStorage.getItem('UserId'));
  }

  getOnlineUser(id: string) {
    this.api.getFromUsersById(id).subscribe((res) => {
      this.onlineUser = res;
    });
  }

  // likes section ...
  showHideLikedByNames(item: IPost) {
    if (item.postLikes.length != 1) {
      item.likeBoxBool = !item.likeBoxBool;
      if ((item.likeBoxBool = true)) {
        setTimeout(() => {
          item.likeBoxBool = false;
        }, 1500);
      }
    }
  }
  likePost(item: IPost) {
    if (!item.postLikeBool) {
      item.postLikes.push({ liked: 'true', likedBy: this.onlineUser.fullName });
      item.postLikeBool = true;
    } else {
      let likeby: number;
      likeby = item.postLikes.findIndex((x) => {
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
  // comment section ...
  showCommentBox(item: IPost) {
    item.commentBoxBool = !item.commentBoxBool;
  }
  postComment(comment: string, item: IPost) {
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
    this.comments = [''];
  }
}
