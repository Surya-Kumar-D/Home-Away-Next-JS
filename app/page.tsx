import CategoriesList from "@/components/home/CategoriesList";
import PropertiesContainer from "@/components/home/PropertiesContainer";
import { Button } from "@/components/ui/button";

const HomePage = ({
  searchParams,
}: {
  searchParams: { category?: string; search?: string };
}) => {
  console.log(searchParams);
  return (
    <div>
      <CategoriesList
        search={searchParams.search}
        category={searchParams.category}
      />
      <PropertiesContainer
        search={searchParams.search}
        category={searchParams.category}
      />
    </div>
  );
};
export default HomePage;
