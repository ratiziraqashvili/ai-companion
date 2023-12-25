import { auth, redirectToSignIn } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { Chat } from "./_components/chat";


const ChatPage = async ({ params }: { params: { companionId: string } }) => {
  const { userId, user } = auth();

  if (!userId || user) {
    return redirectToSignIn();
  }

  const companion = await db.companion.findUnique({
    where: {
      id: params.companionId,
    },
    include: {
      _count: {
        select: {
          messages: true
        }
      },
      messages: true
    }
  });

  if (!companion) {
    throw new Error("Companion not found");
  }

  return <Chat userId={userId} companion={companion} />
};

export default ChatPage;
