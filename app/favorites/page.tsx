import EmptyList from "@/components/home/EmptyList";
import PropertiesList from "@/components/home/PropertiesList";
import { fetchFavorites } from "@/utils/actions";

async function Favorites() {
  const favorites = await fetchFavorites();
  if (favorites.length === 0) return <EmptyList />;
  return <PropertiesList properties={favorites} />;
}

export default Favorites;
