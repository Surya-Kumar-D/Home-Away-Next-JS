import { Input } from "../ui/input";

function NavSearch() {
  return (
    <Input
      type="text"
      className="max-w-xs dark:bg-muted"
      placeholder="find a property..."
    />
  );
}

export default NavSearch;
