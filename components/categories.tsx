"use client";

import { Category } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import qs from "query-string";
import { cn } from "@/lib/utils";

interface CategoriesProps {
  categories: Category[];
}

export const Categories = ({ categories }: CategoriesProps) => {
  const [id, setId] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryId = searchParams.get("categoryId") || "";

  useEffect(() => {
    const query = {
      categoryId: id,
    };

    const url = qs.stringifyUrl({
      url: window.location.href,
      query: query,
    });

    router.push(url);
  }, [id, router]);

  return (
    <div className="flex overflow-auto space-x-2 pt-3">
      <button
        onClick={() => setId("")}
        className={cn(
          "px-4 py-3 rounded-sm text-sm bg-primary/10 text-white transition hover:opacity-75",
          categoryId === "" && "bg-primary/30"
        )}
      >
        Newest
      </button>
      {categories.map((category) => (
        <button
          key={category.name}
          onClick={() => setId(category.id)}
          className={cn(
            "px-4 py-3 rounded-sm text-sm bg-primary/10 text-white transition hover:opacity-75",
            category.id === id && "bg-primary/30"
          )}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};
