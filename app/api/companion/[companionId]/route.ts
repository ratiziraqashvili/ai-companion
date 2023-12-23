import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

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