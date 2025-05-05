import { useQuery } from "@tanstack/react-query";
import { useAuthClient } from "@/features/auth/hooks";
import { PagePaginatedResponse } from "@/lib/types";
import { User } from "../users/types";

export function useUserSearch({ query }: { query: string }) {
  const client = useAuthClient();

  return useQuery({
    queryKey: ["search", query],
    queryFn: async (): Promise<PagePaginatedResponse<User>> => {
      const res = await client.get("/users/", {
        params: {
          search: query,
        },
      });
      return res.data;
    },
  });
}
