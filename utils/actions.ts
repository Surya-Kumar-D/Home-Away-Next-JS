"use server";
import {
  createReviewSchema,
  imageSchema,
  profileSchema,
  propertySchema,
  validateWithZodSchema,
} from "./schemas";
import prisma from "./db";
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { uploadImage } from "./supabase";
import { CalculateTotals } from "./calculateTotals";

const getAuthUser = async () => {
  const user = await currentUser();

  if (!user) throw new Error("You must be logged in to access this route.");

  if (!user.privateMetadata.hasProfile) redirect("/profile/create");
  return user;
};

const renderError = (error: unknown): { message: string } => {
  return {
    message: error instanceof Error ? error.message : "An error has occurred",
  };
};

export const createProfileAction = async (
  prevState: any,
  formData: FormData
) => {
  const user = await currentUser();
  if (!user) throw new Error("Please log in to access the profile");
  const rawData = Object.fromEntries(formData);
  try {
    const validateFields = validateWithZodSchema(profileSchema, rawData);
    await prisma.profile.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        profileImage: user.imageUrl ?? " ",
        ...validateFields,
      },
    });
    await clerkClient.users.updateUserMetadata(user.id, {
      privateMetadata: {
        hasProfile: true,
      },
    });
  } catch (error) {
    return {
      message:
        error instanceof Error ? error.message : "There was an error occurred",
    };
  }

  redirect("/");
};

export const fetchProfileImage = async () => {
  const user = await currentUser();

  if (!user) return null;

  const profileImage = await prisma.profile.findUnique({
    where: {
      clerkId: user.id,
    },
    select: {
      profileImage: true,
    },
  });
  return profileImage?.profileImage;
};

export const fetchProfile = async () => {
  const user = await getAuthUser();

  const profile = await prisma.profile.findUnique({
    where: {
      clerkId: user.id,
    },
  });
  if (!profile) redirect("/profile/create");
  return profile;
};

export const updateProfileAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();

  try {
    const rawData = Object.fromEntries(formData);
    const validateData = validateWithZodSchema(profileSchema, rawData);

    await prisma.profile.update({
      where: {
        clerkId: user.id,
      },
      data: {
        ...validateData,
      },
    });
    revalidatePath("/profile");
    return { message: "Profile successfully updated" };
  } catch (error) {
    return renderError(error);
  }
};

export const updateProfileImageAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();
  try {
    const image = formData.get("image") as File;

    const validateData = validateWithZodSchema(imageSchema, { image });

    const fullPath = await uploadImage(validateData.image);

    await prisma.profile.update({
      where: {
        clerkId: user.id,
      },
      data: {
        profileImage: fullPath,
      },
    });
    revalidatePath("/profile");
    return { message: "Profile image updated successfully" };
  } catch (error) {
    return renderError(error);
  }
};

export const createPropertyAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();
  try {
    const rawData = Object.fromEntries(formData);
    const rawImage = formData.get("image") as File;
    const validateData = validateWithZodSchema(propertySchema, rawData);
    const validateImage = validateWithZodSchema(imageSchema, {
      image: rawImage,
    });
    const fullPath = await uploadImage(validateImage.image);
    console.log(fullPath);
    await prisma.property.create({
      data: {
        ...validateData,
        image: fullPath,
        profileId: user.id,
      },
    });
  } catch (error) {
    console.log(error);

    return renderError(error);
  }
  redirect("/");
};

export const fetchProperties = async ({
  search = "",
  category,
}: {
  search?: string;
  category?: string;
}) => {
  const properties = await prisma.property.findMany({
    where: {
      category,
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { tagline: { contains: search, mode: "insensitive" } },
      ],
    },
    select: {
      id: true,
      name: true,
      image: true,
      tagline: true,
      country: true,
      price: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return properties;
};

export const fetchFavoriteId = async (propertyId: string) => {
  const user = await currentUser();
  if (!user) return null;

  const favorite = await prisma.favorite.findFirst({
    where: {
      propertyId,
      profileId: user.id,
    },
    select: {
      id: true,
    },
  });
  return favorite?.id || null;
};

export const toggleFavoriteAction = async (prevState: {
  propertyId: string;
  favoriteId: string | null;
  pathName: string;
}) => {
  const { favoriteId, pathName, propertyId } = prevState;
  const user = await getAuthUser();
  try {
    if (favoriteId) {
      await prisma.favorite.delete({
        where: {
          id: favoriteId,
        },
      });
    } else {
      await prisma.favorite.create({
        data: {
          profileId: user.id,
          propertyId,
        },
      });
    }
    revalidatePath(pathName);
    return { message: favoriteId ? "Removed from faves" : "Add to faves" };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchFavorites = async () => {
  const user = await getAuthUser();
  const favorites = await prisma.favorite.findMany({
    where: {
      profileId: user.id,
    },
    select: {
      property: {
        select: {
          id: true,
          name: true,
          tagline: true,
          country: true,
          price: true,
          image: true,
        },
      },
    },
  });
  return favorites.map((favorite) => favorite.property);
};

export const fetchPropertyDetails = async (id: string) => {
  return await prisma.property.findUnique({
    where: {
      id,
    },
    include: {
      profile: true,
      bookings: {
        select: {
          checkIn: true,
          checkOut: true,
        },
      },
    },
  });
};

export const createReviewAction = async (
  prevState: any,
  formData: FormData
) => {
  try {
    const user = await getAuthUser();
    const rawData = Object.fromEntries(formData);
    const validatedData = validateWithZodSchema(createReviewSchema, rawData);
    await prisma.review.create({
      data: {
        ...validatedData,
        profileId: user.id,
      },
    });
    revalidatePath(`properties${validatedData.propertyId}`);
    return { message: "Review Successfully Submitted." };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchPropertyReviews = async (propertyId: string) => {
  const reviews = await prisma.review.findMany({
    where: {
      propertyId,
    },
    select: {
      id: true,
      comment: true,
      rating: true,
      profile: {
        select: {
          firstName: true,
          profileImage: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return reviews;
};

export const fetchPropertyReviewsByUser = async () => {
  const user = await getAuthUser();
  const reviews = await prisma.review.findMany({
    where: {
      profileId: user.id,
    },
    select: {
      id: true,
      rating: true,
      comment: true,
      property: {
        select: {
          image: true,
          name: true,
        },
      },
    },
  });
  return reviews;
};

export const deleteReviewAction = async (prevState: { reviewId: string }) => {
  try {
    const { reviewId } = prevState;
    const user = await getAuthUser();
    await prisma.review.delete({
      where: {
        id: reviewId,
        profileId: user.id,
      },
    });
    revalidatePath("/reviews");
    return { message: "Review deleted successfully" };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchPropertyRating = async (propertyId: string) => {
  const result = await prisma.review.groupBy({
    by: ["propertyId"],
    _avg: {
      rating: true,
    },
    _count: {
      rating: true,
    },
    where: {
      propertyId,
    },
  });
  return {
    rating: result[0]?._avg.rating?.toFixed() ?? 0,
    count: result[0]?._count.rating ?? 0,
  };
};

export const findExistingReview = async (
  userId: string,
  propertyId: string
) => {
  return await prisma.review.findFirst({
    where: {
      profileId: userId,
      propertyId,
    },
  });
};

export const createBookingAction = async (prevState: {
  propertyId: string;
  checkIn: Date;
  checkOut: Date;
}) => {
  const user = await getAuthUser();
  const { checkIn, checkOut, propertyId } = prevState!;
  const property = await prisma.property.findUnique({
    where: {
      id: propertyId,
    },
    select: {
      price: true,
    },
  });
  if (!property) return { message: "Property not found" };
  const { orderTotal, totalNights } = CalculateTotals({
    checkIn,
    checkOut,
    price: property.price,
  });
  try {
    const booking = await prisma.booking.create({
      data: {
        orderTotal,
        totalNights,
        checkIn,
        checkOut,
        profileId: user.id,
        propertyId,
      },
    });
  } catch (error) {
    return renderError(error);
  }
  redirect("/bookings");
};

export const fetchBookings = async () => {
  const user = await getAuthUser();
  const bookings = await prisma.booking.findMany({
    where: {
      profileId: user.id,
    },
    include: {
      property: {
        select: {
          id: true,
          name: true,
          country: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return bookings;
};

export const deleteBookingAction = async (prevState: { bookingId: string }) => {
  const user = await getAuthUser();
  const { bookingId } = prevState;
  try {
    await prisma.booking.delete({
      where: {
        profileId: user.id,
        id: bookingId,
      },
    });
    revalidatePath("/bookings");
    return { message: "Booking deleted successfully" };
  } catch (error) {
    return renderError(error);
  }
};
