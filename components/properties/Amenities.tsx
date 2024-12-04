import { Amenity } from "@/utils/amenities";
import { LuFolderCheck } from "react-icons/lu";
import Title from "./Title";

function Amenities({ amenities }: { amenities: string }) {
  const amenitiesList: Amenity[] = JSON.parse(amenities);
  const noAmenities = amenitiesList.every((amenity) => !amenity.selected);
  if (noAmenities) return null;
  return (
    <div className="mt-4">
      <Title text="What this place offers" />
      <div className="grid md:grid-cols-2 gap-x-4">
        {amenitiesList.map((amenity) => {
          if (!amenity.selected) return null;
          return (
            <div key={amenity.name} className="flex items-center gap-x-4">
              <LuFolderCheck />
              {amenity.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Amenities;
