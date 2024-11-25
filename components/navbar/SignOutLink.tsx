"use client";

import { SignOutButton } from "@clerk/nextjs";

import { useToast } from "@/hooks/use-toast";

function SignOutLink() {
  const { toast } = useToast();
  const handleLogout = () => {
    toast({
      title: "Signed Out",
      description: "You have been signed out.",
      duration: 3000,
    });
  };
  return (
    <SignOutButton redirectUrl="/">
      <button className="w-full text-left" onClick={handleLogout}>
        Logout
      </button>
    </SignOutButton>
  );
}
export default SignOutLink;
