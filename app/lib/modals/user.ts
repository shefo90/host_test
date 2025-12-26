// app/lib/modals/user.ts
import { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true }, // UNIQUE!
  password: { type: String, required: true },
});

const User = models.User || model("User", UserSchema);
export default User;
