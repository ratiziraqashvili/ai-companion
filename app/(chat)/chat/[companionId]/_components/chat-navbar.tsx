"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Companion } from "@prisma/client";
import {
  ChevronLeft,
  Edit,
  MessagesSquare,
  MoreVertical,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ChatNavbarProps {
  companion: Companion | null;
  userId: string;
}

export const ChatNavbar = ({ companion, userId }: ChatNavbarProps) => {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

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
                  0
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
              <DropdownMenuItem>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
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
