import FavoriteToggleButton from "@/components/card/FavoriteToggleButton";
import PropertyRating from "@/components/card/PropertyRating";
import Amenities from "@/components/properties/Amenities";
import BookingCalendar from "@/components/properties/BookingCalendar";
import BreadCrumbs from "@/components/properties/BreadCrumbs";
import Description from "@/components/properties/Description";
import ImageContainer from "@/components/properties/ImageContainer";
import PropertyDetails from "@/components/properties/PropertyDetails";
import ShareButton from "@/components/properties/ShareButton";
import UserInfo from "@/components/properties/UserInfo";
import { Separator } from "@/components/ui/separator";
import { fetchPropertyDetails } from "@/utils/actions";
import { redirect } from "next/navigation";
import React from "react";

async function PropertyDetailsPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const property = await fetchPropertyDetails(id)!;
  const { beds, bedrooms, amenities, description, guests, baths, image, name } =
    property!;
  const details = { beds, baths, bedrooms, guests };
  const { firstName, profileImage } = property?.profile!;
  if (!params) redirect("/");
  return (
    <div>
      <BreadCrumbs name={name} />
      <header className="flex justify-between items-center mt-4">
        <h1 className="text-4xl font-bold">{property?.tagline}</h1>
        <div className="flex items-center gap-x-4">
          <ShareButton name={name} propertyId={id} />
          <FavoriteToggleButton propertyId={id} />
        </div>
      </header>
      <ImageContainer mainImage={image} name={name} />

      <section className="lg:grid lg:grid-cols-12 gap-x-12 mt-12">
        <div className="lg:col-span-8">
          <div className="flex gap-x-4 items-center">
            <h1 className="text-xl capitalize font-bold">{name}</h1>
            <PropertyRating inPage propertyId={id} />
          </div>
          <PropertyDetails details={details} />
          <UserInfo profile={{ firstName, profileImage }} />
          <Separator className="mt-4" />
          <Description description={description} />
          <Amenities amenities={amenities} />
        </div>
        <div className="lg:col-span-4 flex flex-col items-center">
          <BookingCalendar />
        </div>
      </section>
    </div>
  );
}

export default PropertyDetailsPage;
