"use client";

import * as React from "react";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { CloseRounded } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SearchSchema, SearchSchemaType } from "../schema";
import { useSearchQuery } from "../hooks";
import { IconButton } from "@mui/material";

export default function SearchFieldNav() {
  const { register, handleSubmit } = useForm<SearchSchemaType>({
    resolver: zodResolver(SearchSchema),
  });
  const { setSearchQuery, removeSearchQuery } = useSearchQuery();

  const onSubmit = (data: SearchSchemaType) => {
    setSearchQuery(data.search_query);
  };

  return (
    <FormControl
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
      // sx={{ width: { xs: "100%", md: "25ch" } }}
      variant="outlined"
    >
      <OutlinedInput
        {...register("search_query", { required: true })}
        size="small"
        fullWidth
        id="search"
        placeholder="Search…"
        sx={{ flexGrow: 1 }}
        startAdornment={
          <InputAdornment position="start" sx={{ color: "text.primary" }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        endAdornment={
          <IconButton size="small" onClick={removeSearchQuery}>
            <CloseRounded fontSize="small" />
          </IconButton>
        }
        inputProps={{
          "aria-label": "search",
        }}
      />
    </FormControl>
  );
}
