"use client";
import { useToast } from "@/hooks/use-toast";
import { ActionFunction } from "@/utils/types";
import { useEffect } from "react";
import { useFormState } from "react-dom";

const initialState = {
  message: "",
};

type FormContainerProps = {
  action: ActionFunction;
  children: React.ReactNode;
};

function FormContainer({ action, children }: FormContainerProps) {
  const [state, formAction] = useFormState(action, initialState);
  const { toast } = useToast();
  useEffect(() => {
    if (state.message) {
      toast({ description: state.message });
    }
  }, [state]);

  return <form action={formAction}>{children}</form>;
}

export default FormContainer;
