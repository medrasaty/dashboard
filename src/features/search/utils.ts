export const SEARCH_QUERY_NAME = "q";
/**
 *  Generate a query params string with proper encoding for search URI
 * @param query query string
 */
export function genSearchQuery(query: string) {
  return `${SEARCH_QUERY_NAME}=${encodeURIComponent(query)}`;
}
