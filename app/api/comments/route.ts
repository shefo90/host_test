import connect from "@/app/lib/db";
import Comment from "@/app/lib/modals/comments";
import { NextResponse } from "next/server";

// GET comments
export const GET = async () => {
  try {
    await connect();
    const comments = await Comment.find().select("text username createdAt -_id");
    return NextResponse.json({ comments }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to get comments" }, { status: 500 });
  }
};

// POST comment
export const POST = async (request: Request) => {
  try {
    const body = await request.json();

    // Validation
    if (!body.username || !body.text) {
      return NextResponse.json(
        { message: "username and text are required" },
        { status: 400 }
      );
    }

    await connect();
    const comment = new Comment(body);
    await comment.save();

    return NextResponse.json({ message: "Comment posted successfully" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to post comment" }, { status: 500 });
  }
};
