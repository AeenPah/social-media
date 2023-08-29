export interface IPost {
  userid: number;
  userPost: string;
  postLikes?: [{ liked: string; likedBy: string }];
  postLikeBool: boolean;
  comments?: [{ comment: string; by: string }];
  commentBoxBool: boolean;
  id?: number;
}
