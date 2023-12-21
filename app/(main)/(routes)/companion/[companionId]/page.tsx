import { auth, redirectToSignIn } from "@clerk/nextjs";
import { FormInputs } from "./_components/form-inputs";
import { db } from "@/lib/db";

const companionIdPage = async ({
  params,
}: {
  params: { companionId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  //TODO:check stripe subscription

  const categories = await db.category.findMany();

  const companion = await db.companion.findUnique({
    where: {
      id: params.companionId,
      userId,
    },
  });

  return <FormInputs data={companion} categories={categories} />;
};

export default companionIdPage;
