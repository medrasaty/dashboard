import {
  Box,
  Typography,
  Divider,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  CardHeader,
  CardProps,
} from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";

export type InfoCardProps = {
  title: string;
  onEdit?: () => void;
} & CardProps;

export default function InfoCard({
  title,
  onEdit,
  children,
  ...props
}: InfoCardProps) {
  return (
    <Card elevation={2} sx={{ borderRadius: 2 }} {...props}>
      <CardHeader>solo</CardHeader>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Typography variant="h6">{title}</Typography>
          {onEdit && (
            <Tooltip title="Admin View">
              <IconButton onClick={onEdit} size="small">
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Box>
        <Divider sx={{ mb: 3 }} />
        <Box>{children}</Box>
      </CardContent>
    </Card>
  );
}
