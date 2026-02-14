import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="absolute top-5 left-5">
        <Link href={"/"} className={buttonVariants({ variant: "secondary" })}>
          <ArrowLeft className="size-5" /> Back
        </Link>
      </div>
      <div className="w-full max-w-md ">{children}</div>
    </div>
  );
};

export default AuthLayout;
