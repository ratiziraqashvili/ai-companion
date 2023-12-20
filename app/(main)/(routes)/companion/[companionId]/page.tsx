"use client"

import { auth, currentUser, redirectToSignIn } from "@clerk/nextjs";
import { FormHeader } from "./_components/form-header";
import { FormInputs } from "./_components/form-inputs";
import { ImageUpload } from "./_components/image-upload";
import { Form } from "@/components/ui/form";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";

const formSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    category: z.string(),
    instructions: z.string().min(200),
    exampleConversation: z.string().min(200)
})

const companionIdPage = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            category: "",
            instructions: "",
            exampleConversation: "",
        }
    })

    //TODO:Check if user has stripe pro membership

    const onSubmit = (values: z.infer<typeof formSchema>) => {

    }

    return (
        <div className="max-w-3xl mx-auto">
            <div className="border-b-[1px] border-primary/10 pb-2">
                <FormHeader />
            </div>
            <Form>
            <form className="pt-4">
                <ImageUpload />
                <FormInputs />
            </form>
            </Form>
        </div>
    )
}

export default companionIdPage;