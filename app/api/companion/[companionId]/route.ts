import { auth, currentUser } from "@clerk/nextjs"
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(req: Request, { params }: { params: { companionId: string } }) {
    try {
        const user = await currentUser();
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

        const companion = await db.companion.update({
            where: {
                userId: user.id,
                id: params.companionId 
            },
            data: {
                categoryId: category,
                userId: user.id,
                userName: user.firstName,
                imageSrc,
                name,
                description,
                instructions,
                seed: exampleConversation
            }
        })

        return NextResponse.json(companion)
    } catch (error) {
        console.log("COMPANION_PATCH", error)
        return new NextResponse("Error while updating companion" + error)
    }
}

export async function DELETE(req: Request, { params }: { params: { companionId: string } }) {
    try {
        const { userId } = auth();    

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const companion = await db.companion.delete({
           where: {
            userId,
            id: params.companionId,
           }
        })

        return NextResponse.json(companion)
    } catch (error) {
        console.log("Error in [CHAT_DELETE]", error)
        return new NextResponse("Internal Error", { status: 500 });
    }
}