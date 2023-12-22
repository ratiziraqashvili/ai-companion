import { Categories } from "@/components/categories";
import { Companions } from "@/components/companions";
import { MainInput } from "@/components/main-input";
import { db } from "@/lib/db";

export default async function Home() {
  const categories = await db.category.findMany();
  const companions = await db.companion.findMany();

  return (
    <div className="">
      <MainInput />
      <Categories categories={categories} />
      <Companions companions={companions} />
    </div>
  );
}
