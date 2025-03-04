import { Edit as EditIcon } from "@mui/icons-material";
import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";

export interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  onEdit?: () => void;
}

const InfoItem = ({ icon, label, value, onEdit }: InfoItemProps) => (
  <Box display="flex" alignItems="center" mb={2}>
    {icon}
    <Box ml={2}>
      <Stack spacing={1} direction="row" alignItems="center">
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
        {onEdit && (
          <Box>
            <Tooltip title="edit">
              <IconButton onClick={onEdit} size="small">
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Stack>
      <Typography variant="body1">{value}</Typography>
    </Box>
  </Box>
);

export default InfoItem;
