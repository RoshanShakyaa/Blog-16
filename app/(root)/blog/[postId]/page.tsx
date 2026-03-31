import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import CommentSection from "@/components/web/CommentSection";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { preloadAuthQuery } from "@/lib/auth-server";
import { fetchQuery } from "convex/nextjs";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  params: Promise<{ postId: Id<"posts"> }>;
}

const PostIdRoute = async ({ params }: Props) => {
  const { postId } = await params;

  const [post, preloadedComments] = await Promise.all([
    await fetchQuery(api.posts.getPostById, { postId: postId }),
    await preloadAuthQuery(api.comments.getCommentsByPostId, {
      postId: postId,
    }),
  ]);

  if (!post) {
    return <div>No Post found</div>;
  }
  return (
    <div className="max-w-3xl mx-auto py-8 px-4 animate-in fade-in duration-500 relative">
      <Link
        href={"/blog"}
        className={buttonVariants({ variant: "outline", className: "mb-4" })}
      >
        <ArrowLeft className="size-4" /> Back to blog
      </Link>

      <div className="relative w-full h-100 mb-8 rounded-xl overflow-hidden shadow-sm">
        <Image
          src={
            post.imageUrl ??
            "https://images.unsplash.com/photo-1771919336237-4b11b12e0793?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt={post.title}
          fill
        />
      </div>

      <div className="space-y-4 flex flex-col">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          {post.title}
        </h1>
        <p>
          Posted on: {new Date(post._creationTime).toLocaleDateString("en-US")}
        </p>
      </div>

      <Separator className="my-8" />

      <p className="text-lg text-foreground/90 whitespace-pre-wrap leading-relaxed">
        {post.body}
      </p>

      <Separator className="my-8" />

      <CommentSection preloadedComments={preloadedComments} />
    </div>
  );
};

export default PostIdRoute;
