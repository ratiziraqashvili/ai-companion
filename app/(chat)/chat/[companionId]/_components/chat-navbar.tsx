"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { Companion } from "@prisma/client";
import axios from "axios";
import {
  ChevronLeft,
  Edit,
  MessagesSquare,
  MoreVertical,
  Trash,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
interface ChatNavbarProps {
  companion: (Companion & {
    _count: {
      messages: number;
    }
  }) | null;
  userId: string;
}

export const ChatNavbar = ({ companion, userId }: ChatNavbarProps) => {
  const router = useRouter();
  const { toast } = useToast();



  const onDelete = async () => {
    try {
      await axios.delete(`/api/companion/${companion?.id}`);

      toast({
        description: "Companion deleted successfully",
        duration: 3000,
      });

      router.push("/");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        description: "Something went wrong.",
        duration: 3000,
      });
    }
  };

  return (
    <nav className="flex justify-between pt-5 border-b-[1px] border-primary/10 p-5">
      <div>
        <div className="flex items-center gap-4">
          <div>
            <button onClick={() => router.push("/")}>
              <ChevronLeft className="w-7 h-7" />
            </button>
          </div>
          <div className="flex gap-2 items-ce">
            <div>
              <Avatar className="w-12 h-12">
                <AvatarImage src={companion?.imageSrc} />
              </Avatar>
            </div>
            <div>
              <h2 className="font-bold flex items-center">
                {companion?.name}
                <MessagesSquare className="h-3 w-3 ml-2 text-muted-foreground" />
                <span className="text-xs text-muted-foreground font-normal ml-1">
                  {companion?._count.messages}
                </span>
              </h2>
              <span className="text-muted-foreground text-xs">
                Created by{" "}
                <span className="lowercase">{companion?.userName}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        {userId === companion?.userId && (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <Link href={`/companion/${companion.id}`}>
              <DropdownMenuItem>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
                </Link>
              <DropdownMenuItem onClick={onDelete}>
                <Trash className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  );
};
