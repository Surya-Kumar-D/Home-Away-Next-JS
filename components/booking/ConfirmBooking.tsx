"use client";
import { useProperty } from "@/utils/store";
import { SignInButton, useAuth } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { SubmitButton } from "../form/Buttons";
import FormContainer from "../form/FormContainer";
import { createBookingAction } from "@/utils/actions";

function ConfirmBooking() {
  const { userId } = useAuth();
  const { propertyId, range } = useProperty((state) => state);
  const checkIn = range?.from as Date;
  const checkOut = range?.to as Date;
  if (!userId)
    return (
      <SignInButton mode="modal">
        <Button type="button" className="w-full">
          Sign In to complete Booking
        </Button>
      </SignInButton>
    );
  const createAction = createBookingAction.bind(null, {
    propertyId,
    checkIn,
    checkOut,
  });
  return (
    <section>
      <FormContainer action={createAction}>
        {" "}
        <SubmitButton text="Reserve" />
      </FormContainer>
    </section>
  );
}

export default ConfirmBooking;
