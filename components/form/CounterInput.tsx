"use client";
import { Card, CardHeader } from "@/components/ui/card";
import { LuMinus, LuPlus } from "react-icons/lu";

import { Button } from "../ui/button";
import { useState } from "react";

function CounterInput({
  details,
  defaultValue,
}: {
  details: string;
  defaultValue?: number;
}) {
  const [count, setCount] = useState(defaultValue || 0);

  function decreaseCount() {
    return setCount((prev) => {
      if (prev > 0) {
        return prev - 1;
      }
      return prev;
    });
  }
  function increaseCount() {
    return setCount((prev) => prev + 1);
  }
  return (
    <Card className="mb-4">
      <input type="hidden" value={count} name={details} />

      <CardHeader className="flex flex-col gap-y-5">
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex flex-col">
            <h2 className="font-medium capitalize">{details}</h2>
            <p>Specify the number of {details} </p>
          </div>
          <div className="flex justify-between items-center">
            <Button
              className=""
              variant="outline"
              size="icon"
              type="button"
              onClick={decreaseCount}
            >
              <LuMinus className="w-5 h-5 text-primary" />
            </Button>
            <span className="text-center text-xl font-bold w-8">{count}</span>
            <Button
              className=""
              variant="outline"
              size="icon"
              type="button"
              onClick={increaseCount}
            >
              <LuPlus className="w-5 h-5 text-primary" />
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}

export default CounterInput;
