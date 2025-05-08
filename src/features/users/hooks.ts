import { DetailedUser } from "./types";
import { InfoItemProps } from "@/components/InfoItem";

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
