import { Companion } from "@prisma/client";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "./ui/card";
import { MessagesSquare } from "lucide-react";
import Link from "next/link";

interface CardsProps {
  companion: Companion;
}

export const Cards = ({ companion }: CardsProps) => {
  return (
    <Card className="flex flex-col bg-primary/10 rounded-xl w-full h-72 hover:opacity-75 cursor-pointer transition">
      <Link href={`/chat/${companion.id}`}>
        <CardContent className="flex flex-col items-center pt-6 w-full gap-1">
          <Image
            className="rounded-xl"
            width={130}
            height={130}
            src={companion.imageSrc}
            alt="Companion image"
          />
          <span className="text-md text-muted-foreground font-bold">
            {companion.name}
          </span>
          <p className="text-xs text-muted-foreground">
            {companion.description}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <span className="text-xs text-muted-foreground lowercase">
            @{companion.userName}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <MessagesSquare className="w-3 h-3" />0
          </span>
        </CardFooter>
      </Link>
    </Card>
  );
};
