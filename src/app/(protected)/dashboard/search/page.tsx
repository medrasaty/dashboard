import SearchResultScreen from "@/features/search/screens/SearchResultScreen";

export default async function SearchResultPage(props) {
  console.log(await props);
  return <SearchResultScreen />;
}
