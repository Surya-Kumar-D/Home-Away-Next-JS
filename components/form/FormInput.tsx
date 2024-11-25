import { Input } from "../ui/input";
import { Label } from "../ui/label";

type FormInputProps = {
  name: string;
  type: string;
  label?: string;
  defaultValue?: string;
  placeholder?: string;
};

function FormInput(props: FormInputProps) {
  const { defaultValue, name, type, label, placeholder } = props;
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        {label || name}
      </Label>
      <Input
        type={type}
        id={name}
        placeholder={placeholder}
        name={name}
        defaultValue={defaultValue}
      />
    </div>
  );
}

export default FormInput;
