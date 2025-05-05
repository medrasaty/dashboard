import type React from "react";
import { useMemo, useState } from "react";
import {
  Box,
  Button,
  DialogContent,
  Grid2 as Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  School,
  Person,
  Email,
  CalendarToday,
  WcOutlined,
  Info,
  EmailOutlined,
} from "@mui/icons-material";

import { DetailedUser } from "./types";
import { InfoItemProps } from "@/components/InfoItem";
import { DayCalendarSkeletonProps } from "@mui/x-date-pickers";

type useUserDetailInfoItemsReturn = InfoItemProps[];

export function useUserDetailInfoItems(
  profile: DetailedUser
): useUserDetailInfoItemsReturn {
  // TODO: complete this implementation
  const infoItems = [
    {
      label: "solo",
      icon: "sol",
      value: "Solo",
    },
  ] satisfies InfoItemProps[];
  return infoItems;
}
