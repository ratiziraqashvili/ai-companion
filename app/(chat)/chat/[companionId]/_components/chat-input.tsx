"use client";

import { ChatRequestOptions } from "ai";
import { Input } from "@/components/ui/input";
import { ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { SendHorizonal } from "lucide-react";

interface ChatInputProps {
  isLoading: boolean;
  input: string;
  onSubmit: (
    e: FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions | undefined
  ) => void;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
}

export const ChatInput = ({
  isLoading,
  input,
  onSubmit,
  handleInputChange,
}: ChatInputProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className="border-t border-primary/10 gap-x-2 flex items-center py-4"
    >
      <Input
        disabled={isLoading}
        value={input}
        onChange={handleInputChange}
        placeholder="Type a message"
        className="rounded-lg bg-primary/10"
      />
      <Button disabled={isLoading} variant="ghost">
        <SendHorizonal className="w-6 h-6" />
      </Button>
    </form>
  );
};
