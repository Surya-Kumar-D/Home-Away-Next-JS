import { SubmitButton } from "@/components/form/Buttons";
import CategoriesInput from "@/components/form/CategoriesInput";
import CounterInput from "@/components/form/CounterInput";
import CountriesInput from "@/components/form/CountriesInput";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import ImageInput from "@/components/form/ImageInput";
import PriceInput from "@/components/form/PriceInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import { createPropertyAction } from "@/utils/actions";

function page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl capitalize mb-8">
        Create Property
      </h1>
      <div className="border p-8 rounded">
        <h3 className="font-medium text-lg mb-4">General Info</h3>
        <FormContainer action={createPropertyAction}>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <FormInput
              name="name"
              label="Name (20 limit)"
              defaultValue="cabin in Latvia"
              type="text"
            />
            <FormInput
              name="tagline"
              label="Tagline (30 limit)"
              defaultValue="Dream Getaway Awaits You Here"
              type="text"
            />
            <PriceInput />
            <CategoriesInput />
          </div>
          <TextAreaInput
            labelText="Description (10 - 1000 words)"
            name="description"
          />
          <div className="grid sm:grid-cols-2 gap-8 mt-4">
            <CountriesInput />
            <ImageInput />
          </div>

          <h3 className="font-medium mt-8 mb-4 text-lg">
            Accommodation Details
          </h3>
          <CounterInput details="guests" />
          <CounterInput details="bedrooms" />
          <CounterInput details="beds" />
          <CounterInput details="baths" />

          <SubmitButton text="create rental" size="lg" />
        </FormContainer>
      </div>
    </section>
  );
}

export default page;
