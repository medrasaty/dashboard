import { CircularProgress, Stack } from "@mui/material";

export default function LoadingPage() {
  return (
    <Stack justifyContent={"center"} height={"100vh"} alignItems={"center"}>
      <CircularProgress size={20} />
    </Stack>
  );
}
