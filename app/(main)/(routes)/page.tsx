import { Categories } from "@/components/categories";
import { MainInput } from "@/components/main-input";
import { db } from "@/lib/db";

export default async function Home() {
  const categories = await db.category.findMany();

  return (
    <div className="pt-16">
      <MainInput />
      <Categories categories={categories} />
    </div>
  );
}
