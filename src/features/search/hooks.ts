import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { SEARCH_QUERY_NAME } from "./utils";
import { useCallback } from "react";

/** >>AI generated<<
 * Easly manage and update SearchParams
 *
 */
export function useUpdateSearchParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const updateSearchParam = useCallback(
    (key: string, value: string) => {
      router.push(`${pathname}?${createQueryString(key, value)}`, {
        scroll: false,
      });
    },
    [pathname, createQueryString, router]
  );

  const updateMultipleSearchParams = useCallback(
    (params: Record<string, string>) => {
      const newParams = new URLSearchParams(searchParams.toString());

      Object.entries(params).forEach(([key, value]) => {
        if (value === null || value === undefined || value === "") {
          newParams.delete(key);
        } else {
          newParams.set(key, value);
        }
      });

      router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const removeSearchParam = useCallback(
    (key: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(key);

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  return {
    updateSearchParam,
    updateMultipleSearchParams,
    removeSearchParam,
    currentParams: Object.fromEntries(searchParams.entries()),
  };
}

/**
 * Set and retrieve url search query params.
 * @returns
 */
export function useSearchQuery() {
  const { updateSearchParam, removeSearchParam } = useUpdateSearchParams();

  function setSearchQuery(q: string) {
    updateSearchParam(SEARCH_QUERY_NAME, q);
  }
  const removeSearchQuery = () => {
    removeSearchParam(SEARCH_QUERY_NAME);
  };

  const params = useSearchParams();
  return {
    setSearchQuery,
    removeSearchQuery,
    searchQuery: params.get(SEARCH_QUERY_NAME) ?? "",
  };
}
