import connect from "@/app/lib/db"
import User from "@/app/lib/modals/user"
import { NextResponse } from "next/server"

export const GET = async () =>{
    try{
        await connect();
        const users = await User.find().select('username -_id');
        return NextResponse.json(users,{status:200})
    }catch{
        return NextResponse.json({massge:"requst error"},{status:400})
    }
}


export const POST = async (requst:Request) =>{
    try{
        const body = await requst.json();
        await connect();
        const existing_user = await User.findOne({username:body.username})

        if(existing_user){
           return NextResponse.json({massge:"user already exists try another username"},{status:400})
        }
        const newuser = new User(body)

        await newuser.save();
        return NextResponse.json({massge:"user saved"},{status:200})
    }catch{
        return NextResponse.json({massge:"failed to post data "},{status:400})
    }
}
