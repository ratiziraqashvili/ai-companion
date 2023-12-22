import { Companion } from "@prisma/client";
import Image from "next/image";
import { Cards } from "./cards";

interface CompanionsProps {
  companions: Companion[];
}

export const Companions = ({ companions }: CompanionsProps) => {
  if (companions.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-full w-full pt-14">
        <Image
          className="grayscale"
          src="/empty.png"
          alt="Nothing Here"
          width={230}
          height={230}
        />
        <span className="text-sm text-muted-foreground">
          No companions found.
        </span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 pt-3">
      {companions.map((companion) => (
        <Cards key={companion.id} companion={companion} />
      ))}
    </div>
  );
};
