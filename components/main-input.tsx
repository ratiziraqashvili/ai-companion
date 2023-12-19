"use client";

import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { ChangeEventHandler, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/use-debounce";
import qs from "query-string"

interface MainInputProps {
  
}

export const MainInput = ({ }: MainInputProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const name = searchParams.get("name");
  const categoryId = searchParams.get("categoryId");
 
  const [value, setValue] = useState(name || "");
  const debouncedValue = useDebounce<string>(value, 500)

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  }

  useEffect(() => {
    const query = {
        name: debouncedValue,
        categoryId: categoryId
    }

    const url = qs.stringifyUrl({
        url: window.location.href,
        query
    }, { skipEmptyString: true, skipNull: true });

    router.push(url)
  }, [debouncedValue, categoryId, router ]);

  return (
    <div className="relative">
      <Input
        value={value}
        onChange={onChange}
        className="bg-primary/10 pl-10"
        placeholder="Search..."
      />
      <Search className="absolute top-3 left-4 h-4 w-4 text-muted-foreground" />
    </div>
  );
};
