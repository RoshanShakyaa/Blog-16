"use client";

import { Card } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import Image from "next/image";

const BlogPage = () => {
  const data = useQuery(api.posts.getPosts);
  return (
    <div className="py-12">
      <div className="text-center pb-12">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
          Our Blog
        </h1>
        <p className="pt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
          Insights, thoughts and trends from our teams!
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((post) => (
          <Card key={post._id}>
            <div>
              <Image
                src={
                  "https://images.unsplash.com/photo-1771919336237-4b11b12e0793?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                alt="blog-image"
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
