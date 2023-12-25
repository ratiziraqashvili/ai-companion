"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { FormHeader } from "./form-header";
import { ImageUpload } from "./image-upload";
import axios from "axios";

import { Category, Companion } from "@prisma/client";

import { Wand2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

interface FormInputsProps {
  categories: Category[];
  data: Companion | null;
}

const formSchema = z.object({
  imageSrc: z.string().min(1, {
    message: "Image is required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
  category: z.string().min(1, {
    message: "Category is required",
  }),
  instructions: z.string().min(200, {
    message: "Instruction must be more than 200 letters.",
  }),
  exampleConversation: z.string().min(200, {
    message: "Example Conversation must be more that 200 letters",
  }),
});

export const FormInputs = ({ categories, data }: FormInputsProps) => {
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  const dummyPlaceholder =
    "You are a fictional character whose name is Elon. You are a visionary entrepreneur and inventor. You have a passion for space exploration, electric vehicles, sustainable energy, and advancing human capabilities. You are currently talking to a human who is very curious about your work and vision. You are ambitious and forward-thinking, with a touch of wit. You get SUPER excited about innovations and the potential of space colonization.";
  const dummyConversation = `Human: Hi Elon, how's your day been?
Elon: Busy as always. Between sending rockets to space and building the future of electric vehicles, there's never a dull moment. How about you?
    
Human: Just a regular day for me. How's the progress with Mars colonization?
Elon: We're making strides! Our goal is to make life multi-planetary. Mars is the next logical step. The challenges are immense, but the potential is even greater.
    
Human: That sounds incredibly ambitious. Are electric vehicles part of this big picture?
Elon: Absolutely! Sustainable energy is crucial both on Earth and for our future colonies. Electric vehicles, like those from Tesla, are just the beginning. We're not just changing the way we drive; we're changing the way we live.
    
Human: It's fascinating to see your vision unfold. Any new projects or innovations you're excited about?
Elon: Always! But right now, I'm particularly excited about Neuralink. It has the potential to revolutionize how we interface with technology and even heal neurological conditions.`;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageSrc: data?.imageSrc ?? "",
      name: data?.name ?? "",
      description: data?.description ?? "",
      category: "",
      instructions: data?.instructions ?? "",
      exampleConversation: data?.seed ?? "",
    },
  });

  const { setValue, handleSubmit } = form;

  const isLoading = form.formState.isSubmitting;

  const onUpload = (result: any) => {
    setImageUrl(result.info.secure_url);
    setValue("imageSrc", result.info.secure_url);
  };

  //TODO:Check if user has stripe pro membership

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      if (data) {
        await axios.patch(`/api/companion/${data.id}`, values);
      } else {
        await axios.post("/api/companion", values);
      }

      toast({
        description: data
          ? "Companion successfully updated."
          : "Companion successfully created.",
        duration: 3000,
      });

      router.push("/");
      router.refresh();
      
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        description: "Something went wrong.",
        duration: 3000,
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto z-[0]">
      <FormHeader
        label="General Information"
        desc="General information about your Companion"
      />
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="pt-4">
          <FormField
            control={form.control}
            name="imageSrc"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col justify-center items-center pb-6">
                <FormControl>
                  <ImageUpload
                    {...field}
                    imageUrl={field.value || imageUrl}
                    onUpload={onUpload}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col md:flex-row gap-4 pb-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      {...field}
                      placeholder="Elon Musk"
                    />
                  </FormControl>
                  <FormDescription>
                    This is how your AI Companion will be named.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      {...field}
                      placeholder="CEO & Founder of Tesla, SpaceX"
                    />
                  </FormControl>
                  <FormDescription>
                    Short description for your AI Companion.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-full pb-7">
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select disabled={isLoading} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          data ? "Edit a category" : "Select a category"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>Select category for your AI.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormHeader
            label="Configuration"
            desc="Detailed instructions for AI Behaviour"
          />
          <FormField
            control={form.control}
            name="instructions"
            render={({ field }) => (
              <FormItem className="w-full pt-9">
                <FormLabel>Instructions</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={isLoading}
                    rows={7}
                    {...field}
                    placeholder={dummyPlaceholder}
                  />
                </FormControl>
                <FormDescription>
                  Describe in detail your companion's backstory and relevant
                  details.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="exampleConversation"
            render={({ field }) => (
              <FormItem className="w-full pt-9">
                <FormLabel>Example Conversation</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={isLoading}
                    rows={7}
                    {...field}
                    placeholder={dummyConversation}
                  />
                </FormControl>
                <FormDescription>
                  Write couple of examples of a human chatting with your AI
                  companion, write expected answers.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="py-10 flex justify-center">
            <Button type="submit" size="lg">
              {data ? "Edit your companion" : "Create your companion"}
              <Wand2 className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
