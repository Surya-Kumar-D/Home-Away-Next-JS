import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function RatingInput({
  name,
  labelText,
}: {
  name: string;
  labelText?: string;
}) {
  const numbers = Array.from({ length: 5 }, (_, i) => {
    const value = i + 1;
    return value.toString();
  }).reverse();
  return (
    <div className="mb-2 max-w-xs">
      <Label htmlFor={name} className="capitalize">
        {labelText || name}
      </Label>
      <Select name={name} defaultValue={numbers[0]} required>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {numbers.map((item) => {
            return (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}

export default RatingInput;
