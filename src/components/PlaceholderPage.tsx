import { Stack, Typography } from "@mui/material";

type PlaceholderPageProps = {
  title?: string;
};

export default function PlaceholderPage({
  title = "Page",
}: PlaceholderPageProps) {
  return (
    <Stack justifyContent={"center"} height={"100vh"} alignItems={"center"}>
      <Typography variant="h2">{title}</Typography>
    </Stack>
  );
}
