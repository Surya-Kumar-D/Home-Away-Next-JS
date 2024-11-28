import { number } from "zod";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type PriceProps = {
  defaultValue?: number;
};

function PriceInput({ defaultValue }: PriceProps) {
  const name = "price";
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        Price ($)
      </Label>
      <Input
        id={name}
        name={name}
        type="number"
        required
        defaultValue={defaultValue || 100}
        min={0}
      />
    </div>
  );
}

export default PriceInput;
