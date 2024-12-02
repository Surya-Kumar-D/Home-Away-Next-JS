"use client";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { SignInButton } from "@clerk/nextjs";
import { FaRegHeart } from "react-icons/fa";

type btnSize = "default" | "lg" | "sm" | "icon";

type SubmitButtonProps = {
  className?: string;
  text?: string;
  size?: btnSize;
};

export function SubmitButton({
  className = "",
  text = "submit",
  size = "lg",
}: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className={`capitalize ${className}`} size={size}>
      {pending ? (
        <>
          <ReloadIcon className="mr-2 h-4 w-4 animate-pin" />
          Please wait...
        </>
      ) : (
        text
      )}
    </Button>
  );
}

export const CardSignInButton = () => {
  return (
    <SignInButton mode="modal">
      <Button
        type="button"
        size="icon"
        variant="outline"
        className="p-2 cursor-pointer "
        asChild
      >
        <FaRegHeart />
      </Button>
    </SignInButton>
  );
};
