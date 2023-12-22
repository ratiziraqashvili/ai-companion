"use client";

import { Companion } from "@prisma/client";
import Image from "next/image";
import { Cards } from "./cards";
import { useRouter, useSearchParams } from "next/navigation";

interface CompanionsProps {
  companions: Companion[];
}

export const Companions = ({ companions }: CompanionsProps) => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const categoryId = searchParams.get("categoryId");

  let filteredCompanions = companions;

  if (categoryId) {
    filteredCompanions = filteredCompanions.filter(
      (c) => c.categoryId === categoryId
    );
  }

  if (name) {
    filteredCompanions = filteredCompanions.filter((c) =>
      c.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (filteredCompanions.length === 0) {
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
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 pt-3 pb-6">
      {filteredCompanions.map((companion) => (
        <Cards key={companion.id} companion={companion} />
      ))}
    </div>
  );
};
