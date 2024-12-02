import LoadingCards from "@/components/card/LoadingCards";
import CategoriesList from "@/components/home/CategoriesList";
import PropertiesContainer from "@/components/home/PropertiesContainer";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";

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
      <Suspense fallback={<LoadingCards />}>
        <PropertiesContainer
          search={searchParams.search}
          category={searchParams.category}
        />
      </Suspense>
    </div>
  );
};
export default HomePage;
