export default class Comment {
    constructor(comment, authorImage)   {
          this.id=comment.id;
          this.dateCreated=comment.dateCreated;
          this.body=comment.body;
          this.postId=comment.postId;
          this.authorName=comment.authorName;
          this.authorId=comment.authorId;
          this.authorImage = authorImage;
        }     
}