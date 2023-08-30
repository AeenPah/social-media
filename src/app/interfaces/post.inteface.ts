export interface IPost {
  userid: number;
  userPost: string;
  postLikeBool: boolean;
  postLikes?: [{ liked: string; likedBy: string }];
  commentBoxBool: boolean;
  comments?: [{ comment: string; by: string }];
  id?: number;
}
