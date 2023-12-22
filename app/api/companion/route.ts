import { db } from "@/lib/db";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try { 
        const user = await currentUser()
        const body = await req.json();
        const { 
            imageSrc,
            name,
            description,
            category,
            instructions,
            exampleConversation
         } = body;
    
        if (!user || !user.id || !user.firstName) {
            return new NextResponse("Unauthorized", { status: 401 });
          }
          
          if (!imageSrc || !name || !description || !category || !instructions || !exampleConversation) {
            return new NextResponse("Missing required fields", { status: 400 });
          }
    
        const companion = await db.companion.create({
            data: {
                categoryId: category,
                userId: user.id,
                userName: user.firstName, 
                imageSrc,
                name,
                description,
                instructions,
                seed: exampleConversation,
            }
        });
    
        return NextResponse.json(companion)
    } catch (error) {
        console.log("COMPANION_POST", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}