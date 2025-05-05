"use client";

import * as React from "react";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SearchSchema, SearchSchemaType } from "../schema";
import { useRouter } from "next/navigation";
import { genSearchQuery } from "../utils";

export default function SearchFieldNav() {
  const { register, handleSubmit } = useForm<SearchSchemaType>({
    resolver: zodResolver(SearchSchema),
  });

  const router = useRouter();

  const onSubmit = (data: SearchSchemaType) => {
    if (data.search_query.trim()) {
      router.push(
        `/dashboard/search?${genSearchQuery(data.search_query.trim())}`
      );
    }
  };

  return (
    <FormControl
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
      sx={{ width: { xs: "100%", md: "25ch" } }}
      variant="outlined"
    >
      <OutlinedInput
        {...register("search_query", { required: true })}
        size="small"
        id="search"
        placeholder="Search…"
        sx={{ flexGrow: 1 }}
        startAdornment={
          <InputAdornment position="start" sx={{ color: "text.primary" }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        inputProps={{
          "aria-label": "search",
        }}
      />
    </FormControl>
  );
}
