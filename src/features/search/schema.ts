import { z } from "zod";

export const SearchSchema = z.object({
  search_query: z.string().min(1),
});

export type SearchSchemaType = z.infer<typeof SearchSchema>;
