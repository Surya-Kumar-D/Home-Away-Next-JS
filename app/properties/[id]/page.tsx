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
import PropertyReviews from "@/components/reviews/PropertyReviews";
import SubmitReview from "@/components/reviews/SubmitReview";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchPropertyDetails, findExistingReview } from "@/utils/actions";
import { auth } from "@clerk/nextjs/server";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import React from "react";

const DynamicMap = dynamic(
  () => import("@/components/properties/PropertyMap"),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[400px] w-full" />,
  }
);

async function PropertyDetailsPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const property = await fetchPropertyDetails(id)!;
  const {
    beds,
    country,
    bedrooms,
    amenities,
    description,
    guests,
    baths,
    image,
    name,
    id: propertyId,
  } = property!;
  const details = { beds, baths, bedrooms, guests };
  const { firstName, profileImage } = property?.profile!;
  const { userId } = auth();
  const isNotOwner = property?.profile.clerkId !== userId;
  const reviewDoesNotExist =
    userId && isNotOwner && !(await findExistingReview(userId, propertyId));
  if (!params) redirect("/");
  return (
    <section>
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
          <DynamicMap countryCode={country} />
        </div>
        <div className="lg:col-span-4 flex flex-col items-center">
          <BookingCalendar />
        </div>
      </section>
      {reviewDoesNotExist && <SubmitReview propertyId={propertyId} />}

      <PropertyReviews propertyId={propertyId} />
    </section>
  );
}

export default PropertyDetailsPage;
