import { useSearchParams } from "next/navigation";
import { SEARCH_QUERY_NAME } from "./utils";

export function useSearchQuery() {
  const params = useSearchParams();
  return params.get(SEARCH_QUERY_NAME) ?? "";
}
