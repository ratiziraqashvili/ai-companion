import { auth, redirectToSignIn } from "@clerk/nextjs";
import { ChatNavbar } from "./_components/chat-navbar";
import { db } from "@/lib/db";

const ChatPage = async ({ params }: { params: { companionId: string } }) => {
  const { userId, user } = auth();

  if (!userId || user) {
    return redirectToSignIn();
  }

  const companion = await db.companion.findUnique({
    where: {
      id: params.companionId,
    },
  });

  return (
    <div className="max-w-4xl mx-auto flex flex-col">
      <ChatNavbar userId={userId} companion={companion} />
    </div>
  );
};

export default ChatPage;
