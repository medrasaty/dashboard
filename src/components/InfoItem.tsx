import {
  ContentCopyOutlined,
  ContentCopySharp,
  CopyAllRounded,
  Edit as EditIcon,
} from "@mui/icons-material";
import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { InfoOutlined as DefaultInfoIcon } from "@mui/icons-material";

export interface InfoItemProps {
  icon?: React.ReactNode;
  label: string;
  value?: string;
  onEdit?: () => void;
}

const InfoItem = ({
  icon = <DefaultInfoIcon color="primary" />,
  label,
  value,
  onEdit,
}: InfoItemProps) => {
  // ensure that "" is also represented as _

  return (
    <Box display="flex" alignItems="center" mb={2}>
      {icon}
      <Box ml={2}>
        <Stack spacing={1} direction="row" alignItems="center">
          <>
            <Typography variant="body2" color="text.secondary">
              {label}
            </Typography>

            <IconButton disabled={!value} size="small">
              <ContentCopySharp
                sx={{ fontSize: 12 }}
                onClick={() => console.log(value)}
              />
            </IconButton>
          </>
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
        <Typography variant="body1">{value ? value : "_"}</Typography>
      </Box>
    </Box>
  );
};

export default InfoItem;
