"use server";

import { postSchema } from "@/schemas/blog";
import z from "zod";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getToken } from "@/lib/auth-server";

export async function createBlogAction(values: z.infer<typeof postSchema>) {
  const parsed = postSchema.safeParse(values);
  if (!parsed.success) {
    throw new Error("Something went wrong");
  }

  const token = await getToken();

  await fetchMutation(
    api.posts.createPost,
    {
      body: parsed.data.content,
      title: parsed.data.title,
    },
    { token },
  );

  revalidatePath("/");
  return redirect("/");
}
