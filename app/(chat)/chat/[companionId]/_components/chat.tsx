"use client";

import { useCompletion } from "ai/react";
import { ChatInput } from "./chat-input";
import { ChatMessages } from "./chat-messages";
import { ChatNavbar } from "./chat-navbar";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Companion, Message } from "@prisma/client";
import { ChatMessageProps } from "./chat-message";

interface ChatClientProps {
  companion: Companion & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
  userId: string;
}

export const Chat = ({ userId, companion }: ChatClientProps) => {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessageProps[]>(
    companion.messages
  );

  const { input, isLoading, handleInputChange, handleSubmit, setInput } =
    useCompletion({
      api: `/api/chat/${companion.id}`,
      onFinish(_prompt, completion) {
        const systemMessage: ChatMessageProps = {
          role: "system",
          content: completion,
        };

        setMessages((current) => [...current, systemMessage]);
        setInput("");

        router.refresh();
      },
    });

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        const userMessage: ChatMessageProps = {
            role: "user",
            content: input
        };

        setMessages((current) => [...current, userMessage]);

        handleSubmit(e);
    }

  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col">
      <ChatNavbar userId={userId} companion={companion} />
        <ChatMessages
         companion={companion}
         isLoading={isLoading}
         messages={messages}
        />
      <ChatInput />
    </div>
  );
};
