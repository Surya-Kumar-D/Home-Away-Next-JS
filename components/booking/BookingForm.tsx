import { CalculateTotals } from "@/utils/calculateTotals";
import { formatCurrency } from "@/utils/format";
import { useProperty } from "@/utils/store";
import React from "react";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";

function BookingForm() {
  const { range, price } = useProperty((state) => state);
  const checkIn = range?.from as Date;
  const checkOut = range?.to as Date;
  const { cleaning, totalNights, orderTotal, service, subTotal, tax } =
    CalculateTotals({
      checkIn,
      checkOut,
      price,
    });
  return (
    <Card className="p-8 mb-4">
      <CardHeader className="mb-8 pl-0">Summary</CardHeader>
      <FormRow label={`$${price} X ${totalNights}`} amount={subTotal} />
      <FormRow label="Cleaning Fee" amount={cleaning} />
      <FormRow label="Service Fee" amount={service} />
      <FormRow label="Tax" amount={tax} />
      <Separator />
      <CardTitle className="mt-8">
        <FormRow label="Booking Total" amount={orderTotal} />
      </CardTitle>
    </Card>
  );
}

const FormRow = ({ label, amount }: { label: string; amount: number }) => {
  return (
    <p className="flex justify-between mb-2 text-sm">
      <span>{label}</span>
      <span>{formatCurrency(amount)}</span>
    </p>
  );
};
export default BookingForm;
