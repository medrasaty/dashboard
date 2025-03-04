import * as React from "react";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Breadcrumbs, { breadcrumbsClasses } from "@mui/material/Breadcrumbs";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import { usePathname } from "next/navigation";

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: (theme.vars || theme).palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: "center",
  },
}));

export default function NavbarBreadcrumbs() {
  // TODO: make breadcrumb dynamic and infer it from pathname

  const pathname = usePathname();
  const breadcrumbs = React.useMemo(
    () => pathname.split("/").splice(1),
    [pathname]
  );
  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      {breadcrumbs.map((path, index) => {
        if (index !== breadcrumbs.length - 1) {
          return (
            <Typography key={index} variant="body1">
              {path}
            </Typography>
          );
        } else {
          return (
            <Typography
              key={index}
              variant="body1"
              sx={{ color: "text.primary", fontWeight: 600 }}
            >
              {path}
            </Typography>
          );
        }
      })}
    </StyledBreadcrumbs>
  );
}
