import { SubmitButton } from "@/components/form/Buttons";
import CategoriesInput from "@/components/form/CategoriesInput";
import CounterInput from "@/components/form/CounterInput";
import CountriesInput from "@/components/form/CountriesInput";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import ImageInputContainer from "@/components/form/ImageInputContainer";
import PriceInput from "@/components/form/PriceInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import {
  fetchRentalDetails,
  updatePropertyAction,
  updatePropertyImageAction,
} from "@/utils/actions";

import { redirect } from "next/navigation";

import React from "react";

async function EditRentalPage({ params }: { params: { id: string } }) {
  const property = await fetchRentalDetails(params.id);
  if (!property) redirect("/");
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">Edit Property</h1>
      <div className="border p-8 rounded-md">
        <ImageInputContainer
          name={property.name}
          text="Update Image"
          action={updatePropertyImageAction}
          image={property.image}
        >
          <input type="hidden" value={property.id} name="id" />
        </ImageInputContainer>
        <FormContainer action={updatePropertyAction}>
          <input type="hidden" name="id" value={property.id} />
          <div className="grid md:grid-cols-2 gap-8 mb-4 mt-8">
            <FormInput
              name="name"
              type="text"
              label="Name (20 limit)"
              defaultValue={property.name}
            />
            <FormInput
              name="tagline"
              type="text"
              label="Tagline (30 limit)"
              defaultValue={property.tagline}
            />
            <PriceInput defaultValue={property.price} />
            <CategoriesInput defaultValue={property.category} />
            <CountriesInput defaultValue={property.country} />
          </div>
          <TextAreaInput
            name="description"
            labelText="Description (10 - 100 words)"
            defaultValue={property.description}
          />
          <h3 className="mt-8 mb-4 font-medium text-lg">
            Accommodation Details
          </h3>
          <CounterInput details="guests" defaultValue={property.guests} />
          <CounterInput details="bedrooms" defaultValue={property.bedrooms} />
          <CounterInput details="beds" defaultValue={property.beds} />
          <CounterInput details="baths" defaultValue={property.baths} />
          <SubmitButton text="Edit Property" className="mt-12" />
        </FormContainer>
      </div>
    </section>
  );
}

export default EditRentalPage;
