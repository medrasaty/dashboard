"use client";
import type React from "react";
import { useMemo } from "react";
import { Grid2 as Grid } from "@mui/material";
import {
  School,
  Person,
  Email,
  CalendarToday,
  WcOutlined,
} from "@mui/icons-material";
import { InfoItem } from "@/components";
import InfoCard from "../components/InfoCard";
import { DetailedUser } from "../types";
import { InfoItemProps } from "@/components/InfoItem";
import { useUserDetails } from "../providers";

type UserBasicInformationCardProps = {};

export default function UserBasicInformationCard({}: UserBasicInformationCardProps) {
  const profile = useUserDetails();
  const formattedJoinDate = useMemo(() => {
    return new Date(profile.date_joined).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }, [profile.date_joined]);

  const infoItems = [
    {
      label: "Full name",
      icon: <Person color="primary" />,
      value: profile.full_name,
    },
    {
      label: "Display name",
      value: profile.display_name,
    },
    {
      label: "Type",
      value: profile.type,
    },
    {
      label: "Joined",
      icon: <CalendarToday color="primary" />,
      value: formattedJoinDate,
    },
    {
      label: "Username",
      icon: <Person color="primary" />,
      value: profile.username,
    },
    {
      label: "Gender",
      icon: <WcOutlined color="primary" />,
      value: profile.gender === "M" ? "Male" : "Female",
    },
    {
      label: "Email",
      icon: <Email color="primary" />,
      value: profile.email,
    },
  ] satisfies InfoItemProps[];

  return (
    <InfoCard title="User Information">
      <Grid container spacing={3}>
        {infoItems.map((info, index) => (
          <Grid size={{ xs: 12, sm: 6 }} key={index}>
            <InfoItem {...info} />
          </Grid>
        ))}
      </Grid>
    </InfoCard>
  );
}
