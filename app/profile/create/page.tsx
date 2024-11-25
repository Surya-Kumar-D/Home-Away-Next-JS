import { SubmitButton } from "@/components/form/Buttons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const createProfileAction = async (formData: FormData) => {
  "use server";
  console.log(formData.get("firstName"));
};

function CreatePageProfile() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold capitalize">new user</h1>
      <div className="border p-8 rounded-md max-w-lg">
        <form action={createProfileAction}>
          <div className="mb-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input name="firstName" id="firstName" type="text" />
          </div>

          <SubmitButton text="Create Profile" />
        </form>
      </div>
    </section>
  );
}

export default CreatePageProfile;
