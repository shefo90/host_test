// app/lib/modals/comment.ts
import { model, models, Schema } from "mongoose";

const CommentSchema = new Schema({
  text: { type: String, required: true },
  username: { type: String, required: true }, // or userId later
  createdAt: { type: Date, default: Date.now },
});

const Comment = models.Comment || model("Comment", CommentSchema);
export default Comment;
