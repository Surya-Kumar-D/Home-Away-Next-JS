import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import ImageInputContainer from "@/components/form/ImageInputContainer";
import {
  fetchProfile,
  updateProfileAction,
  updateProfileImageAction,
} from "@/utils/actions";

async function Profile() {
  const profile = await fetchProfile();
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold capitalize">update profile</h1>
      <div className="border p-8 rounded-md ">
        <ImageInputContainer
          action={updateProfileImageAction}
          image={profile.profileImage}
          name={profile.userName}
          text="Update Profile Image"
        />
        <FormContainer action={updateProfileAction}>
          <div className="grid md:grid-cols-2 gap-4">
            <FormInput
              name="firstName"
              type="text"
              label="First Name"
              defaultValue={profile.firstName}
            />
            <FormInput
              name="lastName"
              type="text"
              label="Last Name"
              defaultValue={profile.lastName}
            />
            <FormInput
              name="userName"
              type="text"
              label="User Name"
              defaultValue={profile.userName}
            />
          </div>
          <SubmitButton text="update profile" className="mt-8" />
        </FormContainer>
      </div>
    </section>
  );
}

export default Profile;
