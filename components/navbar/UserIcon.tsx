/* eslint-disable @next/next/no-img-element */

import { fetchProfileImage } from "@/utils/actions";
import { LuUser2 } from "react-icons/lu";

async function UserIcon() {
  const profileImage = await fetchProfileImage();

  if (profileImage) {
    return (
      <img
        src={profileImage}
        alt="Your profile image"
        className="bg-primary w-6 h-6 rounded-full text-white object-cover"
      />
    );
  }

  return <LuUser2 className="bg-primary w-6 h-6 rounded-full text-white" />;
}

export default UserIcon;
