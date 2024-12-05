import Image from "next/image";
import React, { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
    params: { [key: string]: string };
  }

  export default async function Layout({ children, params }: LayoutProps) {
    return (
    <div className="flex justify-center items-center min-h-screen bg-dark-900">
      <div className="w-full max-w-xl px-4">
        <div className="flex justify-center mb-8">
          <Image
            src="/images/Logo.png"
            alt="لوگو چنار"
            width={241}
            height={84}
          />
        </div>

        {children}
      </div>
    </div>
  );
}
