import connect from "@/app/lib/db"
import Comment from "@/app/lib/modals/comments";
import { NextResponse } from "next/server";


// geting comment data
export const GET = async () =>{
    try{
        await connect();
        const text = await Comment.find().select('text username createdAt -_id')
        return NextResponse.json({text:text},{status:200})
    }catch{
        return NextResponse.json({massge:"failed to get the commnet "},{status:400})
    }
}

// posting new comment
export const POST = async(requst:Request) =>{
    try{
        const body = await requst.json()
        await connect();
        const commment = new Comment(body)
        await commment.save()
        return NextResponse.json({massge:"comment posted succsfully"},{status:200})
    }catch{
        return NextResponse.json({massge:"failed to post comment"},{status:400})
    }
}