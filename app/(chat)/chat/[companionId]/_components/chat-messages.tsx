"use client"

import { Companion } from "@prisma/client";
import { ElementRef, useEffect, useRef, useState } from "react";
import { ChatMessage, ChatMessageProps } from "./chat-message";

  interface ChatMessagesProps {
    messages: ChatMessageProps[];
    isLoading: boolean;
    companion: Companion
  }

export const ChatMessages = ({
    messages = [],
    isLoading,
    companion
}: ChatMessagesProps) => {
    const scrollRef = useRef<ElementRef<"div">>(null);

    const [fakeLoading, setFakeLoading] = useState(messages.length === 0 ? true : false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setFakeLoading(false);
        }, 1000);

        return () => {
            clearTimeout(timeout);
        }
    }, [])

    useEffect(() => {
        scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages.length])

    return (
       <div className="flex-1 pr-4 overflow-y-auto">
            <ChatMessage
             isLoading={fakeLoading}
             role="system"
             content={`Hello, I am ${companion.name}, ${companion.description}`}
             imageSrc={companion.imageSrc}
            />
            {messages.map((message , i) => (
                <ChatMessage
                 key={i}
                 imageSrc={companion.imageSrc}
                 content={message.content}
                 role={message.role}
                />
            ))}
            {isLoading && (
                <ChatMessage
                 imageSrc={companion.imageSrc}
                 role="system"
                 isLoading
                />
            )}
            <div ref={scrollRef} />
       </div>
    )
}