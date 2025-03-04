import { PlaceholderPage } from "@/components";
import { Box, Grid2, Stack, Typography, Container } from "@mui/material";

const Item = () => {
  return (
    <Box padding={2} bgcolor={"gray"}>
      <Typography>item</Typography>
    </Box>
  );
};

const SettingsPage = () => {
  return (
    <Container>
      <Stack justifyContent={"center"} height={"100vh"}>
        <Grid2 container spacing={{ xs: 2, md: 3 }}>
          <Grid2 size={8}>
            <Item />
          </Grid2>
          <Grid2 size={12}>
            <Item />
          </Grid2>
          <Grid2 size={9}>
            <Item />
          </Grid2>
          <Grid2 size={19}>
            <Item />
          </Grid2>
        </Grid2>
      </Stack>
    </Container>
  );
};

export default SettingsPage;
