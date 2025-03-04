"use client";
import type React from "react";
import { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Grid,
  Paper,
  Avatar,
  Chip,
  Button,
  Skeleton,
  Container,
  Divider,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Alert,
  TextField,
  Switch,
  FormControlLabel,
  Tabs,
  Tab,
  useTheme,
} from "@mui/material";
import {
  School,
  Person,
  Email,
  CalendarToday,
  Visibility,
  Star,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Block as BlockIcon,
  VerifiedUser,
  Lock as LockIcon,
  AdminPanelSettings,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Facebook,
  Twitter,
  LinkedIn,
  Instagram,
  LocationOn,
  Work,
} from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";

// Mock API function to simulate fetching profile data
const fetchUserProfile = async (userId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    date_joined: "2025-02-28T07:36:44.243272+03:00",
    email: "husamohammed@gmail.com",
    family_name: "mohammed",
    father_name: "abdo",
    followers_count: 42,
    followings_count: 128,
    full_name: "Husam Abdo Salim Mohammed",
    gender: "M",
    grand_father_name: "salim",
    id: 15,
    name: "husam",
    pk: "15",
    profile: {
      background: null,
      biography:
        "Passionate educator with over 10 years of experience in teaching mathematics and physics.",
      is_private: false,
      user: 15,
      location: "Amman, Jordan",
      position: "Senior Mathematics Teacher",
      social: {
        facebook: "husam.mohammed",
        twitter: "husammohammed",
        linkedin: "husam-mohammed",
        instagram: "husam.teach",
      },
    },
    profile_picture:
      "http://127.0.0.1:8000/media/profile/avatars/avatar_e016bf71.png",
    reach: 1250,
    reputation: 88,
    school: 1,
    school_name: "Medrasaty International School",
    short_name: "Husam Mohammed",
    total_views: 3542,
    type: "TEACHER",
    username: "e016bf71",
    status: "active",
    verified: true,
    last_login: "2025-02-27T14:22:10.243272+03:00",
  };
};

const InfoItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
    <Box sx={{ mr: 2, color: "primary.main" }}>{icon}</Box>
    <Box>
      <Typography variant="caption" color="textSecondary">
        {label}
      </Typography>
      <Typography variant="body1">{value}</Typography>
    </Box>
  </Box>
);

export default function UserDetailScreen({ userId }: { userId: string }) {
  const [selectedVersion, setSelectedVersion] = useState<string>("original");
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [accountLocked, setAccountLocked] = useState(false);

  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userProfile", userId],
    queryFn: () => fetchUserProfile(userId),
  });

  const handleVersionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVersion(event.target.value);
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleToggleLock = () => {
    setAccountLocked(!accountLocked);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (error || !profile) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">
          Error loading user profile. Please try again later.
        </Alert>
      </Container>
    );
  }

  const formattedJoinDate = new Date(profile.date_joined).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const formattedLastLogin = new Date(profile.last_login).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  const infoItems = [
    {
      label: "Joined",
      icon: <CalendarToday color="primary" />,
      value: formattedJoinDate,
    },
    {
      label: "Last Login",
      icon: <Visibility color="primary" />,
      value: formattedLastLogin,
    },
    {
      label: "Reputation",
      icon: <Star color="primary" />,
      value: profile.reputation.toString(),
    },
    {
      label: "School",
      icon: <School color="primary" />,
      value: profile.school_name,
    },
    {
      label: "Username",
      icon: <Person color="primary" />,
      value: profile.username,
    },
    { label: "Email", icon: <Email color="primary" />, value: profile.email },
  ];

  const renderOriginalVersion = () => (
    <Box sx={{ py: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ borderRadius: 2, backgroundColor: "#333", height: 200 }} />
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="center">
          <Avatar
            sx={{ width: 200, height: 200 }}
            alt={profile.full_name}
            src={profile.profile_picture}
          />
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="center">
          <Stack alignItems="center" spacing={1}>
            <Typography variant="h4" component="h1">
              {profile.full_name}
            </Typography>
            <Typography>{profile.short_name}</Typography>
            <Typography>Teacher</Typography>
            <Typography>{profile.email}</Typography>
          </Stack>
        </Grid>
        <Grid item container xs={12} spacing={3}>
          {infoItems.map((info, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <InfoItem
                icon={info.icon}
                label={info.label}
                value={info.value}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  );

  const renderCloudVersion = () => (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ position: "relative", overflow: "hidden" }}>
          <Box
            sx={{
              height: 200,
              backgroundColor: theme.palette.primary.light,
              position: "relative",
            }}
          />
          <Box sx={{ px: 3, pb: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                mt: -8,
              }}
            >
              <Avatar
                src={profile.profile_picture}
                sx={{
                  width: 180,
                  height: 180,
                  border: `4px solid ${theme.palette.background.paper}`,
                  boxShadow: theme.shadows[3],
                }}
              />
              <IconButton sx={{ mt: 10 }}>
                <EditIcon />
              </IconButton>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant="h4" gutterBottom>
                {profile.full_name}
              </Typography>
              <Stack direction="row" spacing={1} mb={2}>
                <Chip label={profile.type} color="primary" />
                <Chip label={profile.school_name} color="secondary" />
              </Stack>
              <Typography variant="body1" color="textSecondary" paragraph>
                {profile.profile.biography}
              </Typography>
            </Box>
            <Divider sx={{ my: 3 }} />
            <Grid container spacing={3} mb={4}>
              {["Followers", "Following", "Total Views", "Reputation"].map(
                (stat, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Card sx={{ height: "100%" }}>
                      <CardContent>
                        <Typography
                          variant="h6"
                          color="textSecondary"
                          gutterBottom
                        >
                          {stat}
                        </Typography>
                        <Typography variant="h4">
                          {stat === "Followers"
                            ? profile.followers_count
                            : stat === "Following"
                            ? profile.followings_count
                            : stat === "Total Views"
                            ? profile.total_views
                            : profile.reputation}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                )
              )}
            </Grid>
            <Grid container spacing={3}>
              {infoItems.map((info, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <InfoItem
                    icon={info.icon}
                    label={info.label}
                    value={info.value}
                  />
                </Grid>
              ))}
            </Grid>
            <Box
              sx={{ mt: 3, display: "flex", gap: 2, justifyContent: "center" }}
            >
              {["facebook", "twitter", "linkedin", "instagram"].map(
                (social) => (
                  <IconButton key={social} color="primary">
                    {social === "facebook" ? (
                      <Facebook />
                    ) : social === "twitter" ? (
                      <Twitter />
                    ) : social === "linkedin" ? (
                      <LinkedIn />
                    ) : (
                      <Instagram />
                    )}
                  </IconButton>
                )
              )}
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );

  const renderV0Version = () => (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Paper
          elevation={0}
          sx={{
            position: "relative",
            borderRadius: 2,
            overflow: "hidden",
            mb: 2,
            height: { xs: 150, sm: 200, md: 250 },
            bgcolor: theme.palette.primary.light,
          }}
        >
          <Box
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
              width: "100%",
              height: "100%",
            }}
          />
          <Button
            variant="contained"
            size="small"
            startIcon={<EditIcon />}
            sx={{
              position: "absolute",
              bottom: 16,
              right: 16,
              bgcolor: "rgba(255, 255, 255, 0.8)",
              color: "text.primary",
              "&:hover": { bgcolor: "rgba(255, 255, 255, 0.9)" },
            }}
          >
            Edit Cover
          </Button>
        </Paper>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Box sx={{ position: "relative", mb: 2 }}>
                  <Avatar
                    src={profile.profile_picture}
                    alt={profile.full_name}
                    sx={{
                      width: 150,
                      height: 150,
                      border: `4px solid ${theme.palette.background.paper}`,
                      boxShadow: theme.shadows[3],
                    }}
                  />
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      minWidth: "auto",
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      p: 0,
                      position: "absolute",
                      bottom: 5,
                      right: 5,
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </Button>
                </Box>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  gutterBottom
                  align="center"
                >
                  {profile.full_name}
                </Typography>
                <Chip label={profile.type} color="primary" sx={{ mb: 2 }} />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                  sx={{ mb: 2 }}
                >
                  {profile.profile.biography}
                </Typography>
                <Divider sx={{ width: "100%", my: 2 }} />
                {profile.profile.location && (
                  <Box
                    display="flex"
                    alignItems="center"
                    sx={{ mb: 1, width: "100%" }}
                  >
                    <LocationOn
                      color="action"
                      sx={{ mr: 1 }}
                      fontSize="small"
                    />
                    <Typography variant="body2">
                      {profile.profile.location}
                    </Typography>
                  </Box>
                )}
                {profile.profile.position && (
                  <Box
                    display="flex"
                    alignItems="center"
                    sx={{ mb: 1, width: "100%" }}
                  >
                    <Work color="action" sx={{ mr: 1 }} fontSize="small" />
                    <Typography variant="body2">
                      {profile.profile.position}
                    </Typography>
                  </Box>
                )}
                <Divider sx={{ width: "100%", my: 2 }} />
                <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                  {["facebook", "twitter", "linkedin", "instagram"].map(
                    (social) =>
                      profile.profile.social[social] && (
                        <Button
                          key={social}
                          size="small"
                          sx={{ minWidth: "auto", p: 1 }}
                        >
                          {social === "facebook" ? (
                            <Facebook color="action" />
                          ) : social === "twitter" ? (
                            <Twitter color="action" />
                          ) : social === "linkedin" ? (
                            <LinkedIn color="action" />
                          ) : (
                            <Instagram color="action" />
                          )}
                        </Button>
                      )
                  )}
                </Stack>
                <Divider sx={{ width: "100%", my: 2 }} />
                <Grid container spacing={2} sx={{ textAlign: "center" }}>
                  {[
                    { label: "Followers", value: profile.followers_count },
                    { label: "Following", value: profile.followings_count },
                    { label: "Reach", value: profile.reach },
                  ].map((stat, index) => (
                    <Grid item xs={4} key={index}>
                      <Typography variant="h6" fontWeight="bold">
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {stat.label}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper elevation={2} sx={{ borderRadius: 2, overflow: "hidden" }}>
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                variant="fullWidth"
                sx={{ borderBottom: 1, borderColor: "divider" }}
              >
                <Tab label="Overview" />
                <Tab label="Activity" />
                <Tab label="Settings" />
              </Tabs>
              <Box sx={{ p: 3 }}>
                {activeTab === 0 && (
                  <Grid container spacing={3}>
                    {infoItems.map((info, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <InfoItem
                          icon={info.icon}
                          label={info.label}
                          value={info.value}
                        />
                      </Grid>
                    ))}
                  </Grid>
                )}
                {activeTab === 1 && (
                  <Box sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      Recent Activity
                    </Typography>
                    <Typography color="text.secondary">
                      No recent activity to display.
                    </Typography>
                  </Box>
                )}
                {activeTab === 2 && (
                  <Box sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      Profile Settings
                    </Typography>
                    <Typography color="text.secondary">
                      Settings panel would go here.
                    </Typography>
                  </Box>
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );

  const renderAdminVersion = () => (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Paper
          elevation={2}
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" fontWeight="medium">
            User Management
          </Typography>
          <Stack direction="row" spacing={2}>
            {isEditing ? (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<SaveIcon />}
                  onClick={handleSave}
                >
                  Save Changes
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<CancelIcon />}
                  onClick={handleToggleEdit}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={handleToggleEdit}
              >
                Edit User
              </Button>
            )}
          </Stack>
        </Paper>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card elevation={2} sx={{ borderRadius: 2, height: "100%" }}>
              <CardContent>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  textAlign="center"
                >
                  <Avatar
                    src={profile.profile_picture}
                    alt={profile.full_name}
                    sx={{
                      width: 120,
                      height: 120,
                      mb: 2,
                      border: "4px solid #f5f5f5",
                    }}
                  />
                  {isEditing ? (
                    <TextField
                      label="Full Name"
                      defaultValue={profile.full_name}
                      variant="outlined"
                      size="small"
                      fullWidth
                      sx={{ mb: 2 }}
                    />
                  ) : (
                    <Typography variant="h6" gutterBottom>
                      {profile.full_name}
                    </Typography>
                  )}
                  <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                    <Chip label={profile.type} color="primary" size="small" />
                    {profile.verified && (
                      <Chip
                        icon={<VerifiedUser fontSize="small" />}
                        label="Verified"
                        color="success"
                        size="small"
                      />
                    )}
                  </Box>
                  <Divider sx={{ width: "100%", my: 2 }} />
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Account Status
                  </Typography>
                  <Box sx={{ mb: 2, width: "100%" }}>
                    {isEditing ? (
                      <FormControlLabel
                        control={
                          <Switch
                            checked={!accountLocked}
                            onChange={handleToggleLock}
                            color="primary"
                          />
                        }
                        label={
                          accountLocked ? "Account Locked" : "Account Active"
                        }
                      />
                    ) : (
                      <Chip
                        label={
                          profile.status === "active" ? "Active" : "Inactive"
                        }
                        color={
                          profile.status === "active" ? "success" : "error"
                        }
                        size="small"
                      />
                    )}
                  </Box>
                  <Divider sx={{ width: "100%", my: 2 }} />
                  <Stack spacing={2} width="100%">
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<BlockIcon />}
                      fullWidth
                    >
                      Suspend Account
                    </Button>
                    <Button
                      variant="outlined"
                      color="warning"
                      startIcon={<LockIcon />}
                      fullWidth
                    >
                      Reset Password
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                      fullWidth
                    >
                      Delete Account
                    </Button>
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <Stack spacing={3}>
              <Card elevation={2} sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Typography variant="h6">User Information</Typography>
                    <Tooltip title="Admin View">
                      <IconButton size="small">
                        <AdminPanelSettings fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <Divider sx={{ mb: 3 }} />
                  <Grid container spacing={3}>
                    {isEditing ? (
                      <>
                        {[
                          "First Name",
                          "Family Name",
                          "Father Name",
                          "Grandfather Name",
                          "Email",
                          "Username",
                          "School",
                        ].map((field) => (
                          <Grid item xs={12} sm={6} key={field}>
                            <TextField
                              label={field}
                              defaultValue={
                                profile[field.toLowerCase().replace(" ", "_")]
                              }
                              variant="outlined"
                              size="small"
                              fullWidth
                              sx={{ mb: 2 }}
                            />
                          </Grid>
                        ))}
                        <Grid item xs={12} sm={6}>
                          <TextField
                            select
                            label="Gender"
                            defaultValue={profile.gender}
                            variant="outlined"
                            size="small"
                            fullWidth
                            sx={{ mb: 2 }}
                            SelectProps={{ native: true }}
                          >
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                          </TextField>
                        </Grid>
                      </>
                    ) : (
                      infoItems.map((info, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                          <InfoItem
                            icon={info.icon}
                            label={info.label}
                            value={info.value}
                          />
                        </Grid>
                      ))
                    )}
                  </Grid>
                </CardContent>
              </Card>
              <Card elevation={2} sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Additional Details
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          bgcolor: "background.default",
                          border: "1px solid",
                          borderColor: "divider",
                          borderRadius: 1,
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          color="text.secondary"
                          gutterBottom
                        >
                          Full Name Components
                        </Typography>
                        {["First", "Father", "Grandfather", "Family"].map(
                          (part) => (
                            <Typography variant="body2" key={part}>
                              <strong>{part}:</strong>{" "}
                              {profile[`${part.toLowerCase()}_name`]}
                            </Typography>
                          )
                        )}
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          bgcolor: "background.default",
                          border: "1px solid",
                          borderColor: "divider",
                          borderRadius: 1,
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          color="text.secondary"
                          gutterBottom
                        >
                          System Information
                        </Typography>
                        <Typography variant="body2">
                          <strong>User ID:</strong> {profile.id}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Public Key:</strong> {profile.pk}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Profile Privacy:</strong>{" "}
                          {profile.profile.is_private ? "Private" : "Public"}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Gender:</strong>{" "}
                          {profile.gender === "M" ? "Male" : "Female"}
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              <Card elevation={2} sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Activity Statistics
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  <Grid container spacing={3}>
                    {[
                      "Total Views",
                      "Reputation",
                      "Followers",
                      "Following",
                    ].map((stat, index) => (
                      <Grid item xs={6} sm={3} key={index}>
                        <Box textAlign="center" p={2}>
                          <Typography variant="h4" color="primary">
                            {profile[stat.toLowerCase().replace(" ", "_")]}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {stat}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <select onChange={handleVersionChange} value={selectedVersion}>
          <option value="original">Original Version</option>
          <option value="cloud">Cloud Version</option>
          <option value="v0">v0 Version</option>
          <option value="admin">Admin Version</option>
        </select>
      </Box>
      {selectedVersion === "original" && renderOriginalVersion()}
      {selectedVersion === "cloud" && renderCloudVersion()}
      {selectedVersion === "v0" && renderV0Version()}
      {selectedVersion === "admin" && renderAdminVersion()}
    </Box>
  );
}

function ProfileSkeleton() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Skeleton
          variant="rectangular"
          width="100%"
          height={70}
          sx={{ borderRadius: 2, mb: 3 }}
        />
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Skeleton
              variant="rectangular"
              width="100%"
              height={500}
              sx={{ borderRadius: 2 }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Stack spacing={3}>
              <Skeleton
                variant="rectangular"
                width="100%"
                height={300}
                sx={{ borderRadius: 2 }}
              />
              <Skeleton
                variant="rectangular"
                width="100%"
                height={200}
                sx={{ borderRadius: 2 }}
              />
              <Skeleton
                variant="rectangular"
                width="100%"
                height={150}
                sx={{ borderRadius: 2 }}
              />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

// "use client";
// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Grid,
//   Paper,
//   Stack,
//   Avatar,
//   Chip,
//   Skeleton,
//   Divider,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
// } from "@mui/material";
// import {
//   School,
//   Person,
//   Email,
//   CalendarToday,
//   Visibility,
//   Star,
// } from "@mui/icons-material";
// import { InfoItem } from "@/components";
// import Image from "next/image";
// import { useQuery } from "@tanstack/react-query";

// // Simulate fetching profile data
// const fetchProfile = async (userId: string) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({
//         date_joined: "2025-02-28T07:36:44.243272+03:00",
//         email: "husamohammed@gmail.com",
//         family_name: "mohammed",
//         father_name: "abdo",
//         followers_count: 0,
//         followings_count: 0,
//         full_name: "husam abdo salim mohammed",
//         gender: "M",
//         grand_father_name: "salim",
//         id: 15,
//         name: "husam",
//         pk: "15",
//         profile: {
//           background: null,
//           biography: "",
//           is_private: false,
//           user: 15,
//         },
//         profile_picture:
//           "http://127.0.0.1:8000/media/profile/avatars/avatar_e016bf71.png",
//         reach: 0,
//         reputation: 1,
//         school: 1,
//         school_name: "medrasaty",
//         short_name: "husam mohammed",
//         total_views: 0,
//         type: "TEACHER",
//         username: "e016bf71",
//       });
//     }, 1000);
//   });
// };

// const UserDetailScreenV1 = ({ profile }) => {
//   const InfoData = React.useMemo(
//     () =>
//       profile
//         ? [
//             {
//               label: "Joined",
//               icon: <CalendarToday />,
//               value: new Date(profile.date_joined).toLocaleString(),
//             },
//             {
//               label: "Total Views",
//               icon: <Visibility />,
//               value: profile.total_views.toString(),
//             },
//             {
//               label: "Reputation",
//               icon: <Star />,
//               value: profile.reputation.toString(),
//             },
//             {
//               label: "School",
//               icon: <School />,
//               value: profile.school_name,
//             },
//             {
//               label: "Username",
//               icon: <Person />,
//               value: profile.username,
//             },
//             {
//               label: "Email",
//               icon: <Email />,
//               value: profile.email,
//             },
//           ]
//         : [],
//     [profile]
//   );

//   return (
//     <Box sx={{ py: 4 }}>
//       <Paper elevation={3} sx={{ p: 3 }}>
//         <Grid container spacing={3}>
//           <Grid item xs={12} md={3}>
//             <Box display="flex" justifyContent="center">
//               <Avatar
//                 sx={{ width: 150, height: 150, border: "4px solid white" }}
//                 alt={profile.full_name}
//                 src={profile.profile_picture}
//               />
//             </Box>
//           </Grid>
//           <Grid item xs={12} md={9}>
//             <Typography variant="h4" component="h1" gutterBottom>
//               {profile.full_name}
//             </Typography>
//             <Chip label={profile.type} color="primary" sx={{ mb: 2 }} />
//             <Typography variant="body1" color="textSecondary">
//               {profile.email}
//             </Typography>
//           </Grid>
//         </Grid>
//         <Divider sx={{ my: 3 }} />
//         <Grid container spacing={3}>
//           {InfoData.map((info, index) => (
//             <Grid item xs={12} sm={6} md={4} key={index}>
//               <InfoItem
//                 icon={info.icon}
//                 label={info.label}
//                 value={info.value}
//               />
//             </Grid>
//           ))}
//         </Grid>
//       </Paper>
//     </Box>
//   );
// };

// const UserDetailScreenV2 = ({ profile }) => {
//   const InfoData = React.useMemo(
//     () =>
//       profile
//         ? [
//             {
//               label: "Joined",
//               icon: <CalendarToday />,
//               value: new Date(profile.date_joined).toLocaleString(),
//             },
//             {
//               label: "Total Views",
//               icon: <Visibility />,
//               value: profile.total_views.toString(),
//             },
//             {
//               label: "Reputation",
//               icon: <Star />,
//               value: profile.reputation.toString(),
//             },
//             {
//               label: "School",
//               icon: <School />,
//               value: profile.school_name,
//             },
//             {
//               label: "Username",
//               icon: <Person />,
//               value: profile.username,
//             },
//             {
//               label: "Email",
//               icon: <Email />,
//               value: profile.email,
//             },
//           ]
//         : [],
//     [profile]
//   );

//   return (
//     <Box sx={{ py: 4 }}>
//       <Paper elevation={3} sx={{ p: 3 }}>
//         <Grid container spacing={3}>
//           <Grid item xs={12}>
//             <Box
//               sx={{
//                 borderRadius: 2,
//                 backgroundColor: "#333",
//                 height: 200,
//                 position: "relative",
//                 overflow: "hidden",
//               }}
//             >
//               {profile.profile.background && (
//                 <Image
//                   src={profile.profile.background}
//                   alt="background"
//                   layout="fill"
//                   objectFit="cover"
//                 />
//               )}
//             </Box>
//           </Grid>
//           <Grid item xs={12} display="flex" justifyContent="center">
//             <Avatar
//               sx={{
//                 width: 200,
//                 height: 200,
//                 mt: -10,
//                 border: "4px solid white",
//               }}
//               alt={profile.full_name}
//               src={profile.profile_picture}
//             />
//           </Grid>
//           <Grid item xs={12} display="flex" justifyContent="center">
//             <Stack alignItems="center" spacing={1}>
//               <Typography variant="h4" component="h1">
//                 {profile.full_name}
//               </Typography>
//               <Chip label={profile.type} color="primary" />
//               <Typography variant="body1" color="textSecondary">
//                 {profile.email}
//               </Typography>
//             </Stack>
//           </Grid>
//           <Grid item xs={12}>
//             <Grid container spacing={3} sx={{ p: 2 }}>
//               {InfoData.map((info, index) => (
//                 <Grid item xs={12} sm={6} md={4} key={index}>
//                   <InfoItem
//                     icon={info.icon}
//                     label={info.label}
//                     value={info.value}
//                   />
//                 </Grid>
//               ))}
//             </Grid>
//           </Grid>
//         </Grid>
//       </Paper>
//     </Box>
//   );
// };

// export default function UserDetailScreen({ userId }: { userId: string }) {
//   const [styleVersion, setStyleVersion] = useState("v1");
//   const {
//     data: profile,
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["profile", userId],
//     queryFn: () => fetchProfile(userId),
//   });

//   if (isLoading) {
//     return (
//       <Box sx={{ py: 4 }}>
//         <Skeleton variant="rectangular" width="100%" height={200} />
//         <Skeleton variant="circular" width={200} height={200} />
//         <Skeleton variant="text" width="60%" height={40} />
//         <Skeleton variant="text" width="40%" height={30} />
//       </Box>
//     );
//   }

//   if (isError) {
//     return (
//       <Typography
//         variant="h6"
//         color="error"
//         sx={{ py: 4, textAlign: "center" }}
//       >
//         Error loading profile data.
//       </Typography>
//     );
//   }

//   return (
//     <Box sx={{ py: 4 }}>
//       <FormControl fullWidth sx={{ mb: 4 }}>
//         <InputLabel id="style-version-label">Style Version</InputLabel>
//         <Select
//           labelId="style-version-label"
//           id="style-version"
//           value={styleVersion}
//           label="Style Version"
//           onChange={(e) => setStyleVersion(e.target.value)}
//         >
//           <MenuItem value="v1">Version 1</MenuItem>
//           <MenuItem value="v2">Version 2</MenuItem>
//         </Select>
//       </FormControl>
//       {styleVersion === "v1" && <UserDetailScreenV1 profile={profile} />}
//       {styleVersion === "v2" && <UserDetailScreenV2 profile={profile} />}
//     </Box>
//   );
// }

// // "use client";
// // import React from "react";
// // import {
// //   Box,
// //   Typography,
// //   Grid,
// //   Paper,
// //   Avatar,
// //   Chip,
// //   Skeleton,
// //   Divider,
// // } from "@mui/material";
// // import {
// //   School,
// //   Person,
// //   Email,
// //   CalendarToday,
// //   Visibility,
// //   Star,
// // } from "@mui/icons-material";
// // import { InfoItem } from "@/components";
// // import Image from "next/image";
// // import { useQuery } from "@tanstack/react-query";

// // // Simulate fetching profile data
// // const fetchProfile = async (userId: string) => {
// //   return new Promise((resolve) => {
// //     setTimeout(() => {
// //       resolve({
// //         date_joined: "2025-02-28T07:36:44.243272+03:00",
// //         email: "husamohammed@gmail.com",
// //         family_name: "mohammed",
// //         father_name: "abdo",
// //         followers_count: 0,
// //         followings_count: 0,
// //         full_name: "husam abdo salim mohammed",
// //         gender: "M",
// //         grand_father_name: "salim",
// //         id: 15,
// //         name: "husam",
// //         pk: "15",
// //         profile: {
// //           background: null,
// //           biography: "",
// //           is_private: false,
// //           user: 15,
// //         },
// //         profile_picture:
// //           "http://127.0.0.1:8000/media/profile/avatars/avatar_e016bf71.png",
// //         reach: 0,
// //         reputation: 1,
// //         school: 1,
// //         school_name: "medrasaty",
// //         short_name: "husam mohammed",
// //         total_views: 0,
// //         type: "TEACHER",
// //         username: "e016bf71",
// //       });
// //     }, 1000);
// //   });
// // };

// // export default function UserDetailScreen({ userId }: { userId: string }) {
// //   const {
// //     data: profile,
// //     isLoading,
// //     isError,
// //   } = useQuery({
// //     queryKey: ["profile", userId],
// //     queryFn: () => fetchProfile(userId),
// //   });

// //   const InfoData = React.useMemo(
// //     () =>
// //       profile
// //         ? [
// //             {
// //               label: "Joined",
// //               icon: <CalendarToday />,
// //               value: new Date(profile.date_joined).toLocaleString(),
// //             },
// //             {
// //               label: "Total Views",
// //               icon: <Visibility />,
// //               value: profile.total_views.toString(),
// //             },
// //             {
// //               label: "Reputation",
// //               icon: <Star />,
// //               value: profile.reputation.toString(),
// //             },
// //             {
// //               label: "School",
// //               icon: <School />,
// //               value: profile.school_name,
// //             },
// //             {
// //               label: "Username",
// //               icon: <Person />,
// //               value: profile.username,
// //             },
// //             {
// //               label: "Email",
// //               icon: <Email />,
// //               value: profile.email,
// //             },
// //           ]
// //         : [],
// //     [profile]
// //   );

// //   if (isLoading) {
// //     return (
// //       <Box sx={{ py: 4 }}>
// //         <Skeleton variant="rectangular" width="100%" height={200} />
// //         <Skeleton
// //           variant="circular"
// //           width={200}
// //           height={200}
// //           sx={{ mt: -10, ml: 3 }}
// //         />
// //         <Skeleton
// //           variant="text"
// //           width="60%"
// //           height={40}
// //           sx={{ mt: 2, ml: 3 }}
// //         />
// //         <Skeleton variant="text" width="40%" height={30} sx={{ ml: 3 }} />
// //       </Box>
// //     );
// //   }

// //   if (isError) {
// //     return (
// //       <Typography
// //         variant="h6"
// //         color="error"
// //         sx={{ py: 4, textAlign: "center" }}
// //       >
// //         Error loading profile data.
// //       </Typography>
// //     );
// //   }

// //   return (
// //     <Box sx={{ py: 4 }}>
// //       <Paper elevation={3} sx={{ p: 3 }}>
// //         {/* Profile Header */}
// //         <Grid container spacing={3}>
// //           {/* Profile Picture */}
// //           <Grid item xs={12} md={3}>
// //             <Box display="flex" justifyContent="center">
// //               <Avatar
// //                 sx={{ width: 150, height: 150, border: "4px solid white" }}
// //                 alt={profile.full_name}
// //                 src={profile.profile_picture}
// //               />
// //             </Box>
// //           </Grid>

// //           {/* User Info */}
// //           <Grid item xs={12} md={9}>
// //             <Typography variant="h4" component="h1" gutterBottom>
// //               {profile.full_name}
// //             </Typography>
// //             <Chip label={profile.type} color="primary" sx={{ mb: 2 }} />
// //             <Typography variant="body1" color="textSecondary">
// //               {profile.email}
// //             </Typography>
// //           </Grid>
// //         </Grid>

// //         <Divider sx={{ my: 3 }} />

// //         {/* Profile Details */}
// //         <Grid container spacing={3}>
// //           {InfoData.map((info, index) => (
// //             <Grid item xs={12} sm={6} md={4} key={index}>
// //               <InfoItem
// //                 icon={info.icon}
// //                 label={info.label}
// //                 value={info.value}
// //               />
// //             </Grid>
// //           ))}
// //         </Grid>
// //       </Paper>
// //     </Box>
// //   );
// // }

// // {
// //   /* Cloud Code */
// // }
// // // "use client";
// // // import { useState } from "react";
// // // import { useQuery } from "@tanstack/react-query";
// // // import {
// // //   Box,
// // //   Typography,
// // //   Avatar,
// // //   Grid,
// // //   Paper,
// // //   Chip,
// // //   Skeleton,
// // //   Alert,
// // //   IconButton,
// // //   Container,
// // //   Card,
// // //   CardContent,
// // //   Divider,
// // //   Stack,
// // //   useTheme,
// // // } from "@mui/material";
// // // import {
// // //   School,
// // //   Person,
// // //   Email,
// // //   CalendarToday,
// // //   Visibility,
// // //   Star,
// // //   Edit as EditIcon,
// // //   Facebook,
// // //   Twitter,
// // //   LinkedIn,
// // //   Instagram,
// // // } from "@mui/icons-material";

// // // // Simulated API call
// // // const fetchProfile = async (userId: string) => {
// // //   // Simulate API delay
// // //   await new Promise((resolve) => setTimeout(resolve, 1000));

// // //   // Return mock data
// // //   return {
// // //     date_joined: "2025-02-28T07:36:44.243272+03:00",
// // //     email: "husamohammed@gmail.com",
// // //     family_name: "mohammed",
// // //     father_name: "abdo",
// // //     followers_count: 0,
// // //     followings_count: 0,
// // //     full_name: "husam abdo salim mohammed",
// // //     gender: "M",
// // //     grand_father_name: "salim",
// // //     id: 15,
// // //     name: "husam",
// // //     pk: "15",
// // //     profile: {
// // //       background: null,
// // //       biography:
// // //         "Passionate educator with 5+ years of experience in teaching mathematics and computer science.",
// // //       is_private: false,
// // //       user: 15,
// // //     },
// // //     profile_picture:
// // //       "http://127.0.0.1:8000/media/profile/avatars/avatar_e016bf71.png",
// // //     reach: 0,
// // //     reputation: 88,
// // //     school: 1,
// // //     school_name: "medrasaty",
// // //     total_views: 0,
// // //     type: "TEACHER",
// // //     username: "e016bf71",
// // //   };
// // // };

// // // const InfoItem = ({
// // //   icon,
// // //   label,
// // //   value,
// // // }: {
// // //   icon: React.ReactNode;
// // //   label: string;
// // //   value: string;
// // // }) => (
// // //   <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
// // //     <Box sx={{ mr: 2, color: "primary.main" }}>{icon}</Box>
// // //     <Box>
// // //       <Typography variant="caption" color="textSecondary">
// // //         {label}
// // //       </Typography>
// // //       <Typography variant="body1">{value}</Typography>
// // //     </Box>
// // //   </Box>
// // // );

// // // const StatsCard = ({ title, value }: { title: string; value: number }) => (
// // //   <Card sx={{ height: "100%" }}>
// // //     <CardContent>
// // //       <Typography variant="h6" color="textSecondary" gutterBottom>
// // //         {title}
// // //       </Typography>
// // //       <Typography variant="h4">{value}</Typography>
// // //     </CardContent>
// // //   </Card>
// // // );

// // // export default function UserDetailScreen({ userId }: { userId: string }) {
// // //   const theme = useTheme();
// // //   const {
// // //     data: profile,
// // //     isLoading,
// // //     error,
// // //   } = useQuery({
// // //     queryKey: ["profile", userId],
// // //     queryFn: () => fetchProfile(userId),
// // //   });

// // //   if (isLoading) {
// // //     return (
// // //       <Container maxWidth="lg" sx={{ py: 4 }}>
// // //         <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
// // //           <Skeleton variant="rectangular" height={200} />
// // //           <Skeleton
// // //             variant="circular"
// // //             width={200}
// // //             height={200}
// // //             sx={{ mx: "auto" }}
// // //           />
// // //           <Skeleton variant="text" height={60} />
// // //           <Skeleton variant="text" height={40} />
// // //           <Grid container spacing={3}>
// // //             {[1, 2, 3, 4].map((item) => (
// // //               <Grid item xs={12} sm={6} md={3} key={item}>
// // //                 <Skeleton variant="rectangular" height={100} />
// // //               </Grid>
// // //             ))}
// // //           </Grid>
// // //         </Box>
// // //       </Container>
// // //     );
// // //   }

// // //   if (error) {
// // //     return (
// // //       <Container maxWidth="lg" sx={{ py: 4 }}>
// // //         <Alert severity="error">
// // //           Error loading profile. Please try again later.
// // //         </Alert>
// // //       </Container>
// // //     );
// // //   }

// // //   return (
// // //     <Container maxWidth="lg" sx={{ py: 4 }}>
// // //       <Paper elevation={3} sx={{ position: "relative", overflow: "hidden" }}>
// // //         {/* Cover Photo */}
// // //         <Box
// // //           sx={{
// // //             height: 200,
// // //             backgroundColor: theme.palette.primary.light,
// // //             position: "relative",
// // //           }}
// // //         />

// // //         {/* Profile Content */}
// // //         <Box sx={{ px: 3, pb: 3 }}>
// // //           <Box
// // //             sx={{
// // //               display: "flex",
// // //               justifyContent: "space-between",
// // //               alignItems: "flex-start",
// // //               mt: -8,
// // //             }}
// // //           >
// // //             <Avatar
// // //               src={profile.profile_picture}
// // //               sx={{
// // //                 width: 180,
// // //                 height: 180,
// // //                 border: `4px solid ${theme.palette.background.paper}`,
// // //                 boxShadow: theme.shadows[3],
// // //               }}
// // //             />
// // //             <IconButton sx={{ mt: 10 }}>
// // //               <EditIcon />
// // //             </IconButton>
// // //           </Box>

// // //           <Box sx={{ mt: 2 }}>
// // //             <Typography variant="h4" gutterBottom>
// // //               {profile.full_name}
// // //             </Typography>
// // //             <Stack direction="row" spacing={1} mb={2}>
// // //               <Chip label={profile.type} color="primary" />
// // //               <Chip label={profile.school_name} color="secondary" />
// // //             </Stack>
// // //             <Typography variant="body1" color="textSecondary" paragraph>
// // //               {profile.profile.biography}
// // //             </Typography>
// // //           </Box>

// // //           <Divider sx={{ my: 3 }} />

// // //           {/* Stats */}
// // //           <Grid container spacing={3} mb={4}>
// // //             <Grid item xs={12} sm={6} md={3}>
// // //               <StatsCard title="Followers" value={profile.followers_count} />
// // //             </Grid>
// // //             <Grid item xs={12} sm={6} md={3}>
// // //               <StatsCard title="Following" value={profile.followings_count} />
// // //             </Grid>
// // //             <Grid item xs={12} sm={6} md={3}>
// // //               <StatsCard title="Total Views" value={profile.total_views} />
// // //             </Grid>
// // //             <Grid item xs={12} sm={6} md={3}>
// // //               <StatsCard title="Reputation" value={profile.reputation} />
// // //             </Grid>
// // //           </Grid>

// // //           {/* Info Items */}
// // //           <Grid container spacing={3}>
// // //             <Grid item xs={12} md={6}>
// // //               <InfoItem
// // //                 icon={<School />}
// // //                 label="School"
// // //                 value={profile.school_name}
// // //               />
// // //               <InfoItem
// // //                 icon={<Person />}
// // //                 label="Username"
// // //                 value={profile.username}
// // //               />
// // //               <InfoItem icon={<Email />} label="Email" value={profile.email} />
// // //             </Grid>
// // //             <Grid item xs={12} md={6}>
// // //               <InfoItem
// // //                 icon={<CalendarToday />}
// // //                 label="Joined"
// // //                 value={new Date(profile.date_joined).toLocaleDateString()}
// // //               />
// // //               <InfoItem
// // //                 icon={<Visibility />}
// // //                 label="Total Views"
// // //                 value={profile.total_views.toString()}
// // //               />
// // //               <InfoItem
// // //                 icon={<Star />}
// // //                 label="Reputation"
// // //                 value={profile.reputation.toString()}
// // //               />
// // //             </Grid>
// // //           </Grid>

// // //           {/* Social Links */}
// // //           <Box
// // //             sx={{ mt: 3, display: "flex", gap: 2, justifyContent: "center" }}
// // //           >
// // //             <IconButton color="primary">
// // //               <Facebook />
// // //             </IconButton>
// // //             <IconButton color="primary">
// // //               <Twitter />
// // //             </IconButton>
// // //             <IconButton color="primary">
// // //               <LinkedIn />
// // //             </IconButton>
// // //             <IconButton color="primary">
// // //               <Instagram />
// // //             </IconButton>
// // //           </Box>
// // //         </Box>
// // //       </Paper>
// // //     </Container>
// // //   );
// // // }

// // {
// //   /* v0 Code version 2 */
// // }
// // // "use client";
// // // import { useState } from "react";
// // // import {
// // //   Box,
// // //   Typography,
// // //   Stack,
// // //   Grid,
// // //   Paper,
// // //   Avatar,
// // //   Chip,
// // //   Button,
// // //   Skeleton,
// // //   Container,
// // //   Divider,
// // //   Card,
// // //   CardContent,
// // //   IconButton,
// // //   Tooltip,
// // //   Alert,
// // //   TextField,
// // //   Switch,
// // //   FormControlLabel,
// // // } from "@mui/material";
// // // import {
// // //   School,
// // //   Person,
// // //   Email,
// // //   CalendarToday,
// // //   Visibility,
// // //   Star,
// // //   Edit as EditIcon,
// // //   Delete as DeleteIcon,
// // //   Block as BlockIcon,
// // //   VerifiedUser,
// // //   Lock as LockIcon,
// // //   AdminPanelSettings,
// // //   Save as SaveIcon,
// // //   Cancel as CancelIcon,
// // // } from "@mui/icons-material";
// // // import { InfoItem } from "@/components";
// // // import { useQuery } from "@tanstack/react-query";

// // // // Mock API function to simulate fetching profile data
// // // const fetchUserProfile = async (userId: string) => {
// // //   // In a real app, this would be an API call
// // //   await new Promise((resolve) => setTimeout(resolve, 1000));

// // //   return {
// // //     date_joined: "2025-02-28T07:36:44.243272+03:00",
// // //     email: "husamohammed@gmail.com",
// // //     family_name: "mohammed",
// // //     father_name: "abdo",
// // //     followers_count: 0,
// // //     followings_count: 0,
// // //     full_name: "husam abdo salim mohammed",
// // //     gender: "M",
// // //     grand_father_name: "salim",
// // //     id: 15,
// // //     name: "husam",
// // //     pk: "15",
// // //     profile: {
// // //       background: null,
// // //       biography: "",
// // //       is_private: false,
// // //       user: 15,
// // //     },
// // //     profile_picture:
// // //       "http://127.0.0.1:8000/media/profile/avatars/avatar_e016bf71.png",
// // //     reach: 0,
// // //     reputation: 88,
// // //     school: 1,
// // //     school_name: "medrasaty",
// // //     short_name: "husam mohammed",
// // //     total_views: 0,
// // //     type: "TEACHER",
// // //     username: "e016bf71",
// // //     status: "active", // Added for admin purposes
// // //     verified: true, // Added for admin purposes
// // //     last_login: "2025-02-27T14:22:10.243272+03:00", // Added for admin purposes
// // //   };
// // // };

// // // export default function UserDetailScreen({ userId }: { userId: string }) {
// // //   const [isEditing, setIsEditing] = useState(false);
// // //   const [accountLocked, setAccountLocked] = useState(false);

// // //   const {
// // //     data: profile,
// // //     isLoading,
// // //     error,
// // //   } = useQuery({
// // //     queryKey: ["userProfile", userId],
// // //     queryFn: () => fetchUserProfile(userId),
// // //   });

// // //   const handleToggleEdit = () => {
// // //     setIsEditing(!isEditing);
// // //   };

// // //   const handleToggleLock = () => {
// // //     setAccountLocked(!accountLocked);
// // //   };

// // //   const handleSave = () => {
// // //     // Here you would save the changes to the backend
// // //     setIsEditing(false);
// // //   };

// // //   if (isLoading) {
// // //     return <ProfileSkeleton />;
// // //   }

// // //   if (error || !profile) {
// // //     return (
// // //       <Container maxWidth="lg" sx={{ py: 4 }}>
// // //         <Alert severity="error">
// // //           Error loading user profile. Please try again later.
// // //         </Alert>
// // //       </Container>
// // //     );
// // //   }

// // //   const formattedJoinDate = new Date(profile.date_joined).toLocaleDateString(
// // //     "en-US",
// // //     {
// // //       year: "numeric",
// // //       month: "long",
// // //       day: "numeric",
// // //     }
// // //   );

// // //   const formattedLastLogin = new Date(profile.last_login).toLocaleDateString(
// // //     "en-US",
// // //     {
// // //       year: "numeric",
// // //       month: "long",
// // //       day: "numeric",
// // //       hour: "2-digit",
// // //       minute: "2-digit",
// // //     }
// // //   );

// // //   const infoItems = [
// // //     {
// // //       label: "Joined",
// // //       icon: <CalendarToday color="primary" />,
// // //       value: formattedJoinDate,
// // //     },
// // //     {
// // //       label: "Last Login",
// // //       icon: <Visibility color="primary" />,
// // //       value: formattedLastLogin,
// // //     },
// // //     {
// // //       label: "Reputation",
// // //       icon: <Star color="primary" />,
// // //       value: profile.reputation.toString(),
// // //     },
// // //     {
// // //       label: "School",
// // //       icon: <School color="primary" />,
// // //       value: profile.school_name,
// // //     },
// // //     {
// // //       label: "Username",
// // //       icon: <Person color="primary" />,
// // //       value: profile.username,
// // //     },
// // //     {
// // //       label: "Email",
// // //       icon: <Email color="primary" />,
// // //       value: profile.email,
// // //     },
// // //   ];

// // //   return (
// // //     <Container maxWidth="lg">
// // //       <Box sx={{ py: 4 }}>
// // //         <Paper
// // //           elevation={2}
// // //           sx={{
// // //             p: 3,
// // //             mb: 3,
// // //             borderRadius: 2,
// // //             display: "flex",
// // //             justifyContent: "space-between",
// // //             alignItems: "center",
// // //           }}
// // //         >
// // //           <Typography variant="h5" fontWeight="medium">
// // //             User Management
// // //           </Typography>
// // //           <Stack direction="row" spacing={2}>
// // //             {isEditing ? (
// // //               <>
// // //                 <Button
// // //                   variant="contained"
// // //                   color="primary"
// // //                   startIcon={<SaveIcon />}
// // //                   onClick={handleSave}
// // //                 >
// // //                   Save Changes
// // //                 </Button>
// // //                 <Button
// // //                   variant="outlined"
// // //                   startIcon={<CancelIcon />}
// // //                   onClick={handleToggleEdit}
// // //                 >
// // //                   Cancel
// // //                 </Button>
// // //               </>
// // //             ) : (
// // //               <Button
// // //                 variant="contained"
// // //                 startIcon={<EditIcon />}
// // //                 onClick={handleToggleEdit}
// // //               >
// // //                 Edit User
// // //               </Button>
// // //             )}
// // //           </Stack>
// // //         </Paper>

// // //         <Grid container spacing={3}>
// // //           {/* Left Column - User Basic Info */}
// // //           <Grid item xs={12} md={4}>
// // //             <Card elevation={2} sx={{ borderRadius: 2, height: "100%" }}>
// // //               <CardContent>
// // //                 <Box
// // //                   display="flex"
// // //                   flexDirection="column"
// // //                   alignItems="center"
// // //                   textAlign="center"
// // //                 >
// // //                   <Avatar
// // //                     src={profile.profile_picture}
// // //                     alt={profile.full_name}
// // //                     sx={{
// // //                       width: 120,
// // //                       height: 120,
// // //                       mb: 2,
// // //                       border: "4px solid #f5f5f5",
// // //                     }}
// // //                   />

// // //                   {isEditing ? (
// // //                     <TextField
// // //                       label="Full Name"
// // //                       defaultValue={profile.full_name}
// // //                       variant="outlined"
// // //                       size="small"
// // //                       fullWidth
// // //                       sx={{ mb: 2 }}
// // //                     />
// // //                   ) : (
// // //                     <Typography variant="h6" gutterBottom>
// // //                       {profile.full_name}
// // //                     </Typography>
// // //                   )}

// // //                   <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
// // //                     <Chip label={profile.type} color="primary" size="small" />
// // //                     {profile.verified && (
// // //                       <Chip
// // //                         icon={<VerifiedUser fontSize="small" />}
// // //                         label="Verified"
// // //                         color="success"
// // //                         size="small"
// // //                       />
// // //                     )}
// // //                   </Box>

// // //                   <Divider sx={{ width: "100%", my: 2 }} />

// // //                   <Typography
// // //                     variant="subtitle2"
// // //                     color="text.secondary"
// // //                     gutterBottom
// // //                   >
// // //                     Account Status
// // //                   </Typography>

// // //                   <Box sx={{ mb: 2, width: "100%" }}>
// // //                     {isEditing ? (
// // //                       <FormControlLabel
// // //                         control={
// // //                           <Switch
// // //                             checked={!accountLocked}
// // //                             onChange={handleToggleLock}
// // //                             color="primary"
// // //                           />
// // //                         }
// // //                         label={
// // //                           accountLocked ? "Account Locked" : "Account Active"
// // //                         }
// // //                       />
// // //                     ) : (
// // //                       <Chip
// // //                         label={
// // //                           profile.status === "active" ? "Active" : "Inactive"
// // //                         }
// // //                         color={
// // //                           profile.status === "active" ? "success" : "error"
// // //                         }
// // //                         size="small"
// // //                       />
// // //                     )}
// // //                   </Box>

// // //                   <Divider sx={{ width: "100%", my: 2 }} />

// // //                   <Stack spacing={2} width="100%">
// // //                     <Button
// // //                       variant="outlined"
// // //                       color="error"
// // //                       startIcon={<BlockIcon />}
// // //                       fullWidth
// // //                     >
// // //                       Suspend Account
// // //                     </Button>
// // //                     <Button
// // //                       variant="outlined"
// // //                       color="warning"
// // //                       startIcon={<LockIcon />}
// // //                       fullWidth
// // //                     >
// // //                       Reset Password
// // //                     </Button>
// // //                     <Button
// // //                       variant="outlined"
// // //                       color="error"
// // //                       startIcon={<DeleteIcon />}
// // //                       fullWidth
// // //                     >
// // //                       Delete Account
// // //                     </Button>
// // //                   </Stack>
// // //                 </Box>
// // //               </CardContent>
// // //             </Card>
// // //           </Grid>

// // //           {/* Right Column - User Details */}
// // //           <Grid item xs={12} md={8}>
// // //             <Stack spacing={3}>
// // //               {/* User Information Card */}
// // //               <Card elevation={2} sx={{ borderRadius: 2 }}>
// // //                 <CardContent>
// // //                   <Box
// // //                     sx={{
// // //                       display: "flex",
// // //                       justifyContent: "space-between",
// // //                       mb: 2,
// // //                     }}
// // //                   >
// // //                     <Typography variant="h6">User Information</Typography>
// // //                     <Tooltip title="Admin View">
// // //                       <IconButton size="small">
// // //                         <AdminPanelSettings fontSize="small" />
// // //                       </IconButton>
// // //                     </Tooltip>
// // //                   </Box>

// // //                   <Divider sx={{ mb: 3 }} />

// // //                   <Grid container spacing={3}>
// // //                     {isEditing ? (
// // //                       // Edit mode - show form fields
// // //                       <>
// // //                         <Grid item xs={12} sm={6}>
// // //                           <TextField
// // //                             label="First Name"
// // //                             defaultValue={profile.name}
// // //                             variant="outlined"
// // //                             size="small"
// // //                             fullWidth
// // //                             sx={{ mb: 2 }}
// // //                           />
// // //                         </Grid>
// // //                         <Grid item xs={12} sm={6}>
// // //                           <TextField
// // //                             label="Family Name"
// // //                             defaultValue={profile.family_name}
// // //                             variant="outlined"
// // //                             size="small"
// // //                             fullWidth
// // //                             sx={{ mb: 2 }}
// // //                           />
// // //                         </Grid>
// // //                         <Grid item xs={12} sm={6}>
// // //                           <TextField
// // //                             label="Father Name"
// // //                             defaultValue={profile.father_name}
// // //                             variant="outlined"
// // //                             size="small"
// // //                             fullWidth
// // //                             sx={{ mb: 2 }}
// // //                           />
// // //                         </Grid>
// // //                         <Grid item xs={12} sm={6}>
// // //                           <TextField
// // //                             label="Grandfather Name"
// // //                             defaultValue={profile.grand_father_name}
// // //                             variant="outlined"
// // //                             size="small"
// // //                             fullWidth
// // //                             sx={{ mb: 2 }}
// // //                           />
// // //                         </Grid>
// // //                         <Grid item xs={12} sm={6}>
// // //                           <TextField
// // //                             label="Email"
// // //                             defaultValue={profile.email}
// // //                             variant="outlined"
// // //                             size="small"
// // //                             fullWidth
// // //                             sx={{ mb: 2 }}
// // //                           />
// // //                         </Grid>
// // //                         <Grid item xs={12} sm={6}>
// // //                           <TextField
// // //                             label="Username"
// // //                             defaultValue={profile.username}
// // //                             variant="outlined"
// // //                             size="small"
// // //                             fullWidth
// // //                             sx={{ mb: 2 }}
// // //                           />
// // //                         </Grid>
// // //                         <Grid item xs={12} sm={6}>
// // //                           <TextField
// // //                             label="School"
// // //                             defaultValue={profile.school_name}
// // //                             variant="outlined"
// // //                             size="small"
// // //                             fullWidth
// // //                             sx={{ mb: 2 }}
// // //                           />
// // //                         </Grid>
// // //                         <Grid item xs={12} sm={6}>
// // //                           <TextField
// // //                             select
// // //                             label="Gender"
// // //                             defaultValue={profile.gender}
// // //                             variant="outlined"
// // //                             size="small"
// // //                             fullWidth
// // //                             sx={{ mb: 2 }}
// // //                             SelectProps={{
// // //                               native: true,
// // //                             }}
// // //                           >
// // //                             <option value="M">Male</option>
// // //                             <option value="F">Female</option>
// // //                           </TextField>
// // //                         </Grid>
// // //                       </>
// // //                     ) : (
// // //                       // View mode - show info items
// // //                       infoItems.map((info, index) => (
// // //                         <Grid item xs={12} sm={6} key={index}>
// // //                           <InfoItem
// // //                             icon={info.icon}
// // //                             label={info.label}
// // //                             value={info.value}
// // //                           />
// // //                         </Grid>
// // //                       ))
// // //                     )}
// // //                   </Grid>
// // //                 </CardContent>
// // //               </Card>

// // //               {/* Additional Details Card */}
// // //               <Card elevation={2} sx={{ borderRadius: 2 }}>
// // //                 <CardContent>
// // //                   <Typography variant="h6" gutterBottom>
// // //                     Additional Details
// // //                   </Typography>

// // //                   <Divider sx={{ mb: 3 }} />

// // //                   <Grid container spacing={3}>
// // //                     <Grid item xs={12} sm={6}>
// // //                       <Paper
// // //                         elevation={0}
// // //                         sx={{
// // //                           p: 2,
// // //                           bgcolor: "background.default",
// // //                           border: "1px solid",
// // //                           borderColor: "divider",
// // //                           borderRadius: 1,
// // //                         }}
// // //                       >
// // //                         <Typography
// // //                           variant="subtitle2"
// // //                           color="text.secondary"
// // //                           gutterBottom
// // //                         >
// // //                           Full Name Components
// // //                         </Typography>
// // //                         <Typography variant="body2">
// // //                           <strong>First:</strong> {profile.name}
// // //                         </Typography>
// // //                         <Typography variant="body2">
// // //                           <strong>Father:</strong> {profile.father_name}
// // //                         </Typography>
// // //                         <Typography variant="body2">
// // //                           <strong>Grandfather:</strong>{" "}
// // //                           {profile.grand_father_name}
// // //                         </Typography>
// // //                         <Typography variant="body2">
// // //                           <strong>Family:</strong> {profile.family_name}
// // //                         </Typography>
// // //                       </Paper>
// // //                     </Grid>
// // //                     <Grid item xs={12} sm={6}>
// // //                       <Paper
// // //                         elevation={0}
// // //                         sx={{
// // //                           p: 2,
// // //                           bgcolor: "background.default",
// // //                           border: "1px solid",
// // //                           borderColor: "divider",
// // //                           borderRadius: 1,
// // //                         }}
// // //                       >
// // //                         <Typography
// // //                           variant="subtitle2"
// // //                           color="text.secondary"
// // //                           gutterBottom
// // //                         >
// // //                           System Information
// // //                         </Typography>
// // //                         <Typography variant="body2">
// // //                           <strong>User ID:</strong> {profile.id}
// // //                         </Typography>
// // //                         <Typography variant="body2">
// // //                           <strong>Public Key:</strong> {profile.pk}
// // //                         </Typography>
// // //                         <Typography variant="body2">
// // //                           <strong>Profile Privacy:</strong>{" "}
// // //                           {profile.profile.is_private ? "Private" : "Public"}
// // //                         </Typography>
// // //                         <Typography variant="body2">
// // //                           <strong>Gender:</strong>{" "}
// // //                           {profile.gender === "M" ? "Male" : "Female"}
// // //                         </Typography>
// // //                       </Paper>
// // //                     </Grid>
// // //                   </Grid>
// // //                 </CardContent>
// // //               </Card>

// // //               {/* Activity Stats Card */}
// // //               <Card elevation={2} sx={{ borderRadius: 2 }}>
// // //                 <CardContent>
// // //                   <Typography variant="h6" gutterBottom>
// // //                     Activity Statistics
// // //                   </Typography>

// // //                   <Divider sx={{ mb: 3 }} />

// // //                   <Grid container spacing={3}>
// // //                     <Grid item xs={6} sm={3}>
// // //                       <Box textAlign="center" p={2}>
// // //                         <Typography variant="h4" color="primary">
// // //                           {profile.total_views}
// // //                         </Typography>
// // //                         <Typography variant="body2" color="text.secondary">
// // //                           Total Views
// // //                         </Typography>
// // //                       </Box>
// // //                     </Grid>
// // //                     <Grid item xs={6} sm={3}>
// // //                       <Box textAlign="center" p={2}>
// // //                         <Typography variant="h4" color="primary">
// // //                           {profile.reputation}
// // //                         </Typography>
// // //                         <Typography variant="body2" color="text.secondary">
// // //                           Reputation
// // //                         </Typography>
// // //                       </Box>
// // //                     </Grid>
// // //                     <Grid item xs={6} sm={3}>
// // //                       <Box textAlign="center" p={2}>
// // //                         <Typography variant="h4" color="primary">
// // //                           {profile.followers_count}
// // //                         </Typography>
// // //                         <Typography variant="body2" color="text.secondary">
// // //                           Followers
// // //                         </Typography>
// // //                       </Box>
// // //                     </Grid>
// // //                     <Grid item xs={6} sm={3}>
// // //                       <Box textAlign="center" p={2}>
// // //                         <Typography variant="h4" color="primary">
// // //                           {profile.followings_count}
// // //                         </Typography>
// // //                         <Typography variant="body2" color="text.secondary">
// // //                           Following
// // //                         </Typography>
// // //                       </Box>
// // //                     </Grid>
// // //                   </Grid>
// // //                 </CardContent>
// // //               </Card>
// // //             </Stack>
// // //           </Grid>
// // //         </Grid>
// // //       </Box>
// // //     </Container>
// // //   );
// // // }

// // // // Loading skeleton for the profile page
// // // function ProfileSkeleton() {
// // //   return (
// // //     <Container maxWidth="lg">
// // //       <Box sx={{ py: 4 }}>
// // //         <Skeleton
// // //           variant="rectangular"
// // //           width="100%"
// // //           height={70}
// // //           sx={{ borderRadius: 2, mb: 3 }}
// // //         />

// // //         <Grid container spacing={3}>
// // //           <Grid item xs={12} md={4}>
// // //             <Skeleton
// // //               variant="rectangular"
// // //               width="100%"
// // //               height={500}
// // //               sx={{ borderRadius: 2 }}
// // //             />
// // //           </Grid>

// // //           <Grid item xs={12} md={8}>
// // //             <Stack spacing={3}>
// // //               <Skeleton
// // //                 variant="rectangular"
// // //                 width="100%"
// // //                 height={300}
// // //                 sx={{ borderRadius: 2 }}
// // //               />
// // //               <Skeleton
// // //                 variant="rectangular"
// // //                 width="100%"
// // //                 height={200}
// // //                 sx={{ borderRadius: 2 }}
// // //               />
// // //               <Skeleton
// // //                 variant="rectangular"
// // //                 width="100%"
// // //                 height={150}
// // //                 sx={{ borderRadius: 2 }}
// // //               />
// // //             </Stack>
// // //           </Grid>
// // //         </Grid>
// // //       </Box>
// // //     </Container>
// // //   );
// // // }

// // {
// //   /* v0 Code */
// // }
// // // "use client";
// // // import { useState } from "react";
// // // import type React from "react";

// // // import {
// // //   Box,
// // //   Typography,
// // //   Stack,
// // //   Grid,
// // //   Paper,
// // //   Avatar,
// // //   Chip,
// // //   Button,
// // //   Skeleton,
// // //   Container,
// // //   Divider,
// // //   useTheme,
// // //   Tab,
// // //   Tabs,
// // // } from "@mui/material";
// // // import {
// // //   School,
// // //   Person,
// // //   Email,
// // //   CalendarToday,
// // //   Visibility,
// // //   Star,
// // //   Edit as EditIcon,
// // //   LocationOn,
// // //   Work,
// // //   Facebook,
// // //   Twitter,
// // //   LinkedIn,
// // //   Instagram,
// // // } from "@mui/icons-material";
// // // import { InfoItem } from "@/components";
// // // import { useQuery } from "@tanstack/react-query";
// // // import Image from "next/image";

// // // // Mock API function to simulate fetching profile data
// // // const fetchUserProfile = async (userId: string) => {
// // //   // In a real app, this would be an API call
// // //   // For demo purposes, we'll simulate a network delay
// // //   await new Promise((resolve) => setTimeout(resolve, 1000));

// // //   return {
// // //     date_joined: "2025-02-28T07:36:44.243272+03:00",
// // //     email: "husamohammed@gmail.com",
// // //     family_name: "mohammed",
// // //     father_name: "abdo",
// // //     followers_count: 42,
// // //     followings_count: 128,
// // //     full_name: "Husam Abdo Salim Mohammed",
// // //     gender: "M",
// // //     grand_father_name: "salim",
// // //     id: 15,
// // //     name: "husam",
// // //     pk: "15",
// // //     profile: {
// // //       background: null,
// // //       biography:
// // //         "Passionate educator with over 10 years of experience in teaching mathematics and physics. I believe in making learning fun and accessible to all students.",
// // //       is_private: false,
// // //       user: 15,
// // //       location: "Amman, Jordan",
// // //       position: "Senior Mathematics Teacher",
// // //       social: {
// // //         facebook: "husam.mohammed",
// // //         twitter: "husammohammed",
// // //         linkedin: "husam-mohammed",
// // //         instagram: "husam.teach",
// // //       },
// // //     },
// // //     profile_picture:
// // //       "http://127.0.0.1:8000/media/profile/avatars/avatar_e016bf71.png",
// // //     reach: 1250,
// // //     reputation: 88,
// // //     school: 1,
// // //     school_name: "Medrasaty International School",
// // //     short_name: "Husam Mohammed",
// // //     total_views: 3542,
// // //     type: "TEACHER",
// // //     username: "e016bf71",
// // //   };
// // // };

// // // export default function UserDetailScreen({ userId }: { userId: string }) {
// // //   const theme = useTheme();
// // //   const [activeTab, setActiveTab] = useState(0);

// // //   const {
// // //     data: profile,
// // //     isLoading,
// // //     error,
// // //   } = useQuery({
// // //     queryKey: ["userProfile", userId],
// // //     queryFn: () => fetchUserProfile(userId),
// // //   });

// // //   const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
// // //     setActiveTab(newValue);
// // //   };

// // //   if (isLoading) {
// // //     return <ProfileSkeleton />;
// // //   }

// // //   if (error || !profile) {
// // //     return (
// // //       <Container maxWidth="lg" sx={{ py: 8, textAlign: "center" }}>
// // //         <Typography variant="h5" color="error" gutterBottom>
// // //           Error loading profile
// // //         </Typography>
// // //         <Typography>
// // //           There was a problem loading this user profile. Please try again later.
// // //         </Typography>
// // //       </Container>
// // //     );
// // //   }

// // //   const formattedJoinDate = new Date(profile.date_joined).toLocaleDateString(
// // //     "en-US",
// // //     {
// // //       year: "numeric",
// // //       month: "long",
// // //       day: "numeric",
// // //     }
// // //   );

// // //   const infoItems = [
// // //     {
// // //       label: "Joined",
// // //       icon: <CalendarToday color="primary" />,
// // //       value: formattedJoinDate,
// // //     },
// // //     {
// // //       label: "Total Views",
// // //       icon: <Visibility color="primary" />,
// // //       value: profile.total_views.toLocaleString(),
// // //     },
// // //     {
// // //       label: "Reputation",
// // //       icon: <Star color="primary" />,
// // //       value: profile.reputation.toString(),
// // //     },
// // //     {
// // //       label: "School",
// // //       icon: <School color="primary" />,
// // //       value: profile.school_name,
// // //     },
// // //     {
// // //       label: "Username",
// // //       icon: <Person color="primary" />,
// // //       value: profile.username,
// // //     },
// // //     {
// // //       label: "Email",
// // //       icon: <Email color="primary" />,
// // //       value: profile.email,
// // //     },
// // //   ];

// // //   return (
// // //     <Container maxWidth="lg">
// // //       <Box sx={{ py: 4 }}>
// // //         {/* Cover Image */}
// // //         <Paper
// // //           elevation={0}
// // //           sx={{
// // //             position: "relative",
// // //             borderRadius: 2,
// // //             overflow: "hidden",
// // //             mb: 2,
// // //             height: { xs: 150, sm: 200, md: 250 },
// // //             bgcolor: theme.palette.primary.light,
// // //           }}
// // //         >
// // //           {profile.profile.background ? (
// // //             <Image
// // //               src={profile.profile.background || "/placeholder.svg"}
// // //               alt="Profile background"
// // //               fill
// // //               style={{ objectFit: "cover" }}
// // //             />
// // //           ) : (
// // //             <Box
// // //               sx={{
// // //                 background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
// // //                 width: "100%",
// // //                 height: "100%",
// // //               }}
// // //             />
// // //           )}
// // //           <Button
// // //             variant="contained"
// // //             size="small"
// // //             startIcon={<EditIcon />}
// // //             sx={{
// // //               position: "absolute",
// // //               bottom: 16,
// // //               right: 16,
// // //               bgcolor: "rgba(255, 255, 255, 0.8)",
// // //               color: "text.primary",
// // //               "&:hover": {
// // //                 bgcolor: "rgba(255, 255, 255, 0.9)",
// // //               },
// // //             }}
// // //           >
// // //             Edit Cover
// // //           </Button>
// // //         </Paper>

// // //         <Grid container spacing={3}>
// // //           {/* Left Column - Profile Info */}
// // //           <Grid item xs={12} md={4}>
// // //             <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
// // //               <Box display="flex" flexDirection="column" alignItems="center">
// // //                 <Box sx={{ position: "relative", mb: 2 }}>
// // //                   <Avatar
// // //                     src={profile.profile_picture}
// // //                     alt={profile.full_name}
// // //                     sx={{
// // //                       width: 150,
// // //                       height: 150,
// // //                       border: `4px solid ${theme.palette.background.paper}`,
// // //                       boxShadow: theme.shadows[3],
// // //                     }}
// // //                   />
// // //                   <Button
// // //                     variant="contained"
// // //                     size="small"
// // //                     sx={{
// // //                       minWidth: "auto",
// // //                       width: 36,
// // //                       height: 36,
// // //                       borderRadius: "50%",
// // //                       p: 0,
// // //                       position: "absolute",
// // //                       bottom: 5,
// // //                       right: 5,
// // //                     }}
// // //                   >
// // //                     <EditIcon fontSize="small" />
// // //                   </Button>
// // //                 </Box>

// // //                 <Typography
// // //                   variant="h5"
// // //                   fontWeight="bold"
// // //                   gutterBottom
// // //                   align="center"
// // //                 >
// // //                   {profile.full_name}
// // //                 </Typography>

// // //                 <Chip label={profile.type} color="primary" sx={{ mb: 2 }} />

// // //                 {profile.profile.biography && (
// // //                   <Typography
// // //                     variant="body2"
// // //                     color="text.secondary"
// // //                     align="center"
// // //                     sx={{ mb: 2 }}
// // //                   >
// // //                     {profile.profile.biography}
// // //                   </Typography>
// // //                 )}

// // //                 <Divider sx={{ width: "100%", my: 2 }} />

// // //                 {/* Additional profile info */}
// // //                 {profile.profile.location && (
// // //                   <Box
// // //                     display="flex"
// // //                     alignItems="center"
// // //                     sx={{ mb: 1, width: "100%" }}
// // //                   >
// // //                     <LocationOn
// // //                       color="action"
// // //                       sx={{ mr: 1 }}
// // //                       fontSize="small"
// // //                     />
// // //                     <Typography variant="body2">
// // //                       {profile.profile.location}
// // //                     </Typography>
// // //                   </Box>
// // //                 )}

// // //                 {profile.profile.position && (
// // //                   <Box
// // //                     display="flex"
// // //                     alignItems="center"
// // //                     sx={{ mb: 1, width: "100%" }}
// // //                   >
// // //                     <Work color="action" sx={{ mr: 1 }} fontSize="small" />
// // //                     <Typography variant="body2">
// // //                       {profile.profile.position}
// // //                     </Typography>
// // //                   </Box>
// // //                 )}

// // //                 <Divider sx={{ width: "100%", my: 2 }} />

// // //                 {/* Social links */}
// // //                 {profile.profile.social && (
// // //                   <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
// // //                     {profile.profile.social.facebook && (
// // //                       <Button size="small" sx={{ minWidth: "auto", p: 1 }}>
// // //                         <Facebook color="action" />
// // //                       </Button>
// // //                     )}
// // //                     {profile.profile.social.twitter && (
// // //                       <Button size="small" sx={{ minWidth: "auto", p: 1 }}>
// // //                         <Twitter color="action" />
// // //                       </Button>
// // //                     )}
// // //                     {profile.profile.social.linkedin && (
// // //                       <Button size="small" sx={{ minWidth: "auto", p: 1 }}>
// // //                         <LinkedIn color="action" />
// // //                       </Button>
// // //                     )}
// // //                     {profile.profile.social.instagram && (
// // //                       <Button size="small" sx={{ minWidth: "auto", p: 1 }}>
// // //                         <Instagram color="action" />
// // //                       </Button>
// // //                     )}
// // //                   </Stack>
// // //                 )}

// // //                 <Divider sx={{ width: "100%", my: 2 }} />

// // //                 {/* Stats */}
// // //                 <Grid container spacing={2} sx={{ textAlign: "center" }}>
// // //                   <Grid item xs={4}>
// // //                     <Typography variant="h6" fontWeight="bold">
// // //                       {profile.followers_count}
// // //                     </Typography>
// // //                     <Typography variant="body2" color="text.secondary">
// // //                       Followers
// // //                     </Typography>
// // //                   </Grid>
// // //                   <Grid item xs={4}>
// // //                     <Typography variant="h6" fontWeight="bold">
// // //                       {profile.followings_count}
// // //                     </Typography>
// // //                     <Typography variant="body2" color="text.secondary">
// // //                       Following
// // //                     </Typography>
// // //                   </Grid>
// // //                   <Grid item xs={4}>
// // //                     <Typography variant="h6" fontWeight="bold">
// // //                       {profile.reach}
// // //                     </Typography>
// // //                     <Typography variant="body2" color="text.secondary">
// // //                       Reach
// // //                     </Typography>
// // //                   </Grid>
// // //                 </Grid>
// // //               </Box>
// // //             </Paper>
// // //           </Grid>

// // //           {/* Right Column - Tabs and Content */}
// // //           <Grid item xs={12} md={8}>
// // //             <Paper elevation={2} sx={{ borderRadius: 2, overflow: "hidden" }}>
// // //               <Tabs
// // //                 value={activeTab}
// // //                 onChange={handleTabChange}
// // //                 variant="fullWidth"
// // //                 sx={{ borderBottom: 1, borderColor: "divider" }}
// // //               >
// // //                 <Tab label="Overview" />
// // //                 <Tab label="Activity" />
// // //                 <Tab label="Settings" />
// // //               </Tabs>

// // //               <Box sx={{ p: 3 }}>
// // //                 {activeTab === 0 && (
// // //                   <Grid container spacing={3}>
// // //                     {infoItems.map((info, index) => (
// // //                       <Grid item xs={12} sm={6} key={index}>
// // //                         <InfoItem
// // //                           icon={info.icon}
// // //                           label={info.label}
// // //                           value={info.value}
// // //                         />
// // //                       </Grid>
// // //                     ))}
// // //                   </Grid>
// // //                 )}

// // //                 {activeTab === 1 && (
// // //                   <Box sx={{ p: 2 }}>
// // //                     <Typography variant="h6" gutterBottom>
// // //                       Recent Activity
// // //                     </Typography>
// // //                     <Typography color="text.secondary">
// // //                       No recent activity to display.
// // //                     </Typography>
// // //                   </Box>
// // //                 )}

// // //                 {activeTab === 2 && (
// // //                   <Box sx={{ p: 2 }}>
// // //                     <Typography variant="h6" gutterBottom>
// // //                       Profile Settings
// // //                     </Typography>
// // //                     <Typography color="text.secondary">
// // //                       Settings panel would go here.
// // //                     </Typography>
// // //                   </Box>
// // //                 )}
// // //               </Box>
// // //             </Paper>
// // //           </Grid>
// // //         </Grid>
// // //       </Box>
// // //     </Container>
// // //   );
// // // }

// // // // Loading skeleton for the profile page
// // // function ProfileSkeleton() {
// // //   return (
// // //     <Container maxWidth="lg">
// // //       <Box sx={{ py: 4 }}>
// // //         {/* Cover Image Skeleton */}
// // //         <Skeleton
// // //           variant="rectangular"
// // //           width="100%"
// // //           height={250}
// // //           sx={{ borderRadius: 2, mb: 2 }}
// // //         />

// // //         <Grid container spacing={3}>
// // //           {/* Left Column Skeleton */}
// // //           <Grid item xs={12} md={4}>
// // //             <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
// // //               <Box display="flex" flexDirection="column" alignItems="center">
// // //                 <Skeleton
// // //                   variant="circular"
// // //                   width={150}
// // //                   height={150}
// // //                   sx={{ mb: 2 }}
// // //                 />
// // //                 <Skeleton
// // //                   variant="text"
// // //                   width="80%"
// // //                   height={40}
// // //                   sx={{ mb: 1 }}
// // //                 />
// // //                 <Skeleton
// // //                   variant="rectangular"
// // //                   width={100}
// // //                   height={32}
// // //                   sx={{ mb: 2, borderRadius: 16 }}
// // //                 />
// // //                 <Skeleton variant="text" width="100%" height={20} />
// // //                 <Skeleton variant="text" width="100%" height={20} />
// // //                 <Skeleton
// // //                   variant="text"
// // //                   width="80%"
// // //                   height={20}
// // //                   sx={{ mb: 2 }}
// // //                 />

// // //                 <Divider sx={{ width: "100%", my: 2 }} />

// // //                 <Skeleton
// // //                   variant="text"
// // //                   width="100%"
// // //                   height={24}
// // //                   sx={{ mb: 1 }}
// // //                 />
// // //                 <Skeleton
// // //                   variant="text"
// // //                   width="100%"
// // //                   height={24}
// // //                   sx={{ mb: 1 }}
// // //                 />

// // //                 <Divider sx={{ width: "100%", my: 2 }} />

// // //                 <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
// // //                   <Skeleton variant="circular" width={40} height={40} />
// // //                   <Skeleton variant="circular" width={40} height={40} />
// // //                   <Skeleton variant="circular" width={40} height={40} />
// // //                   <Skeleton variant="circular" width={40} height={40} />
// // //                 </Stack>

// // //                 <Divider sx={{ width: "100%", my: 2 }} />

// // //                 <Grid container spacing={2}>
// // //                   <Grid item xs={4}>
// // //                     <Skeleton variant="text" width="100%" height={30} />
// // //                     <Skeleton variant="text" width="100%" height={20} />
// // //                   </Grid>
// // //                   <Grid item xs={4}>
// // //                     <Skeleton variant="text" width="100%" height={30} />
// // //                     <Skeleton variant="text" width="100%" height={20} />
// // //                   </Grid>
// // //                   <Grid item xs={4}>
// // //                     <Skeleton variant="text" width="100%" height={30} />
// // //                     <Skeleton variant="text" width="100%" height={20} />
// // //                   </Grid>
// // //                 </Grid>
// // //               </Box>
// // //             </Paper>
// // //           </Grid>

// // //           {/* Right Column Skeleton */}
// // //           <Grid item xs={12} md={8}>
// // //             <Paper elevation={2} sx={{ borderRadius: 2, overflow: "hidden" }}>
// // //               <Skeleton variant="rectangular" width="100%" height={48} />

// // //               <Box sx={{ p: 3 }}>
// // //                 <Grid container spacing={3}>
// // //                   {[...Array(6)].map((_, index) => (
// // //                     <Grid item xs={12} sm={6} key={index}>
// // //                       <Skeleton
// // //                         variant="rectangular"
// // //                         width="100%"
// // //                         height={80}
// // //                         sx={{ borderRadius: 1 }}
// // //                       />
// // //                     </Grid>
// // //                   ))}
// // //                 </Grid>
// // //               </Box>
// // //             </Paper>
// // //           </Grid>
// // //         </Grid>
// // //       </Box>
// // //     </Container>
// // //   );
// // // }

// // {
// //   /* DeepSeek Code */
// // }
// // // "use client";
// // // import React from "react";
// // // import {
// // //   useTheme,
// // //   Box,
// // //   Typography,
// // //   Stack,
// // //   Grid,
// // //   Paper,
// // //   Avatar,
// // //   Chip,
// // //   Skeleton,
// // // } from "@mui/material";
// // // import {
// // //   School,
// // //   Person,
// // //   Email,
// // //   CalendarToday,
// // //   Visibility,
// // //   Star,
// // // } from "@mui/icons-material";
// // // import { InfoItem } from "@/components";
// // // import Image from "next/image";
// // // import { useQuery } from "@tanstack/react-query";

// // // const fetchProfile = async (userId: string) => {
// // //   // Simulate an API call
// // //   return new Promise((resolve) => {
// // //     setTimeout(() => {
// // //       resolve({
// // //         date_joined: "2025-02-28T07:36:44.243272+03:00",
// // //         email: "husamohammed@gmail.com",
// // //         family_name: "mohammed",
// // //         father_name: "abdo",
// // //         followers_count: 0,
// // //         followings_count: 0,
// // //         full_name: "husam abdo salim mohammed",
// // //         gender: "M",
// // //         grand_father_name: "salim",
// // //         id: 15,
// // //         name: "husam",
// // //         pk: "15",
// // //         profile: {
// // //           background: null,
// // //           biography: "",
// // //           is_private: false,
// // //           user: 15,
// // //         },
// // //         profile_picture:
// // //           "http://127.0.0.1:8000/media/profile/avatars/avatar_e016bf71.png",
// // //         reach: 0,
// // //         reputation: 1,
// // //         school: 1,
// // //         school_name: "medrasaty",
// // //         short_name: "husam mohammed",
// // //         total_views: 0,
// // //         type: "TEACHER",
// // //         username: "e016bf71",
// // //       });
// // //     }, 1000);
// // //   });
// // // };

// // // export default function UserDetailScreen({ userId }: { userId: string }) {
// // //   const {
// // //     data: profile,
// // //     isLoading,
// // //     isError,
// // //   } = useQuery({
// // //     queryKey: ["profile", userId],
// // //     queryFn: () => fetchProfile(userId),
// // //   });

// // //   const InfoData = React.useMemo(
// // //     () =>
// // //       profile
// // //         ? [
// // //             {
// // //               label: "Joined",
// // //               icon: <CalendarToday />,
// // //               value: new Date(profile.date_joined).toLocaleString(),
// // //             },
// // //             {
// // //               label: "Total Views",
// // //               icon: <Visibility />,
// // //               value: profile.total_views.toString(),
// // //             },
// // //             {
// // //               label: "Reputation",
// // //               icon: <Star />,
// // //               value: profile.reputation.toString(),
// // //             },
// // //             {
// // //               label: "School",
// // //               icon: <School />,
// // //               value: profile.school_name,
// // //             },
// // //             {
// // //               label: "Username",
// // //               icon: <Person />,
// // //               value: profile.username,
// // //             },
// // //             {
// // //               label: "Email",
// // //               icon: <Email />,
// // //               value: profile.email,
// // //             },
// // //           ]
// // //         : [],
// // //     [profile]
// // //   );

// // //   if (isLoading) {
// // //     return (
// // //       <Box sx={{ py: 4 }}>
// // //         <Skeleton variant="rectangular" width="100%" height={200} />
// // //         <Skeleton variant="circular" width={200} height={200} />
// // //         <Skeleton variant="text" width="60%" height={40} />
// // //         <Skeleton variant="text" width="40%" height={30} />
// // //       </Box>
// // //     );
// // //   }

// // //   if (isError) {
// // //     return <Typography color="error">Error loading profile data.</Typography>;
// // //   }

// // //   return (
// // //     <Box sx={{ py: 4 }}>
// // //       <Paper elevation={3} sx={{ p: 3 }}>
// // //         <Grid container spacing={3}>
// // //           {/* Profile Background Image */}
// // //           <Grid item xs={12}>
// // //             <Box
// // //               sx={{
// // //                 borderRadius: 2,
// // //                 backgroundColor: "#333",
// // //                 height: 200,
// // //                 position: "relative",
// // //                 overflow: "hidden",
// // //               }}
// // //             >
// // //               {profile.profile.background && (
// // //                 <Image
// // //                   src={profile.profile.background}
// // //                   alt="background"
// // //                   layout="fill"
// // //                   objectFit="cover"
// // //                 />
// // //               )}
// // //             </Box>
// // //           </Grid>

// // //           {/* Profile Picture and Basic Info */}
// // //           <Grid item xs={12} display="flex" justifyContent="center">
// // //             <Avatar
// // //               sx={{
// // //                 width: 200,
// // //                 height: 200,
// // //                 mt: -10,
// // //                 border: "4px solid white",
// // //               }}
// // //               alt={profile.full_name}
// // //               src={profile.profile_picture}
// // //             />
// // //           </Grid>
// // //           <Grid item xs={12} display="flex" justifyContent="center">
// // //             <Stack alignItems="center" spacing={1}>
// // //               <Typography variant="h4" component="h1">
// // //                 {profile.full_name}
// // //               </Typography>
// // //               <Chip label={profile.type} color="primary" />
// // //               <Typography variant="body1" color="textSecondary">
// // //                 {profile.email}
// // //               </Typography>
// // //             </Stack>
// // //           </Grid>

// // //           {/* Profile Details */}
// // //           <Grid item xs={12}>
// // //             <Grid container spacing={3} sx={{ p: 2 }}>
// // //               {InfoData.map((info, index) => (
// // //                 <Grid item xs={12} sm={6} md={4} key={index}>
// // //                   <InfoItem
// // //                     icon={info.icon}
// // //                     label={info.label}
// // //                     value={info.value}
// // //                   />
// // //                 </Grid>
// // //               ))}
// // //             </Grid>
// // //           </Grid>
// // //         </Grid>
// // //       </Paper>
// // //     </Box>
// // //   );
// // // }

// // {
// //   /* Original Code */
// // }
// // // "use client";
// // // import type React from "react";
// // // import {
// // //   useTheme,
// // //   Box,
// // //   Typography,
// // //   Stack,
// // //   Grid2,
// // //   Paper,
// // //   Avatar,
// // // } from "@mui/material";
// // // import {
// // //   School,
// // //   Person,
// // //   Email,
// // //   CalendarToday,
// // //   Visibility,
// // //   Star,
// // //   BorderColor,
// // // } from "@mui/icons-material";
// // // import { InfoItem } from "@/components";
// // // import Image from "next/image";
// // // import { InfoItemProps } from "@/components/InfoItem";
// // // import { useMemo } from "react";

// // // const profile = {
// // //   date_joined: "2025-02-28T07:36:44.243272+03:00",
// // //   email: "husamohammed@gmail.com",
// // //   family_name: "mohammed",
// // //   father_name: "abdo",
// // //   followers_count: 0,
// // //   followings_count: 0,
// // //   full_name: "husam abdo salim mohammed",
// // //   gender: "M",
// // //   grand_father_name: "salim",
// // //   id: 15,
// // //   name: "husam",
// // //   pk: "15",
// // //   profile: {
// // //     background: null,
// // //     biography: "",
// // //     is_private: false,
// // //     user: 15,
// // //   },
// // //   profile_picture:
// // //     "http://127.0.0.1:8000/media/profile/avatars/avatar_e016bf71.png",
// // //   reach: 0,
// // //   reputation: 1,
// // //   school: 1,
// // //   school_name: "medrasaty",
// // //   short_name: "husam mohammed",
// // //   total_views: 0,
// // //   type: "TEACHER",
// // //   username: "e016bf71",
// // // };

// // // export default function UserDetailScreen({ userId }: { userId: string }) {
// // //   const InfoData = useMemo(
// // //     () =>
// // //       [
// // //         {
// // //           label: "Joined",
// // //           icon: <CalendarToday />,
// // //           value: new Date(profile.date_joined).toLocaleString(),
// // //         },
// // //         {
// // //           label: "Total Views",
// // //           icon: <Visibility />,
// // //           value: profile.total_views.toString(),
// // //         },
// // //         {
// // //           label: "Reputation",
// // //           icon: <Star />,
// // //           value: "88",
// // //         },
// // //         {
// // //           label: "School",
// // //           icon: <School />,
// // //           value: profile.school_name,
// // //         },
// // //         {
// // //           label: "Username",
// // //           icon: <Person />,
// // //           value: profile.username,
// // //         },
// // //         {
// // //           label: "Email",
// // //           icon: <Email />,
// // //           value: profile.email,
// // //         },
// // //       ] satisfies InfoItemProps[],
// // //     []
// // //   );
// // //   return (
// // //     <Box
// // //       sx={{
// // //         py: 4,
// // //       }}
// // //     >
// // //       {/* Profile Background Image */}
// // //       <Grid2 container spacing={3} columns={{ xs: 4, sm: 8, md: 12 }}>
// // //         <Grid2 size={12}>
// // //           {profile.profile.background ? (
// // //             <Image src={profile.profile.background} alt={"back"} />
// // //           ) : (
// // //             <Box
// // //               sx={{
// // //                 borderRadius: 2,
// // //                 backgroundColor: "#333",
// // //                 borderWidth: 2,
// // //                 height: 200,
// // //               }}
// // //             />
// // //           )}
// // //         </Grid2>

// // //         <Grid2 display="flex" justifyContent="center">
// // //           <Avatar
// // //             sx={{ width: 200, height: 200 }}
// // //             alt={"solo"}
// // //             src={profile.profile_picture}
// // //           />
// // //         </Grid2>
// // //         <Grid2 display="flex" justifyContent="center">
// // //           <Stack
// // //             display={"flex"}
// // //             alignItems={"start"}
// // //             justifyContent={"center"}
// // //           >
// // //             <Typography component={"h4"} variant="h4">
// // //               ahmed abdolelah haider shayea
// // //             </Typography>
// // //             <Typography>display name ....</Typography>
// // //             <Typography>someinfo</Typography>
// // //             <Typography>{profile.email}</Typography>
// // //           </Stack>
// // //         </Grid2>

// // //         <Grid2
// // //           container
// // //           size={{ xs: 4, sm: 8, md: 12 }}
// // //           spacing={5}
// // //           sx={{
// // //             borderRadius: 2,
// // //             borderWidth: 2,
// // //             p: 2,
// // //           }}
// // //         >
// // //           {InfoData.map((info, index) => (
// // //             <Grid2 key={index} size={{ xs: 4, sm: 4, md: 4 }}>
// // //               <InfoItem
// // //                 icon={info.icon}
// // //                 label={info.label}
// // //                 value={info.value}
// // //               />
// // //             </Grid2>
// // //           ))}
// // //         </Grid2>
// // //       </Grid2>
// // //     </Box>
// // //   );
// // // }

// // // // export default function UserDetailScreen({ userId }: { userId: string }) {
// // // //   return (
// // // //     <Box
// // // //       sx={{
// // // //         minHeight: "100vh",
// // // //         py: 4,
// // // //       }}
// // // //     >
// // // //       <Paper elevation={10} sx={{ padding: 3 }}>
// // // //         <Grid container spacing={4}>
// // // //           <Grid item xs={12} md={4}>
// // // //             <Box display="flex" flexDirection="column" alignItems="center">
// // // //               <Avatar
// // // //                 src={user.profile_picture}
// // // //                 alt={user.full_name}
// // // //                 sx={{ width: 200, height: 200, mb: 2 }}
// // // //               />
// // // //               <Typography variant="h4" gutterBottom>
// // // //                 {user.full_name}
// // // //               </Typography>
// // // //               <Chip label={user.type} color="primary" />
// // // //             </Box>
// // // //           </Grid>
// // // //           <Grid item xs={12} md={8}>
// // // //             <Grid container spacing={4}>
// // // //               <Grid item xs={12} sm={6}>
// // // //                 <InfoItem
// // // //                   icon={<School color="primary" />}
// // // //                   label="School"
// // // //                   value={user.school_name}
// // // //                 />
// // // //                 <InfoItem
// // // //                   icon={<Person color="primary" />}
// // // //                   label="Username"
// // // //                   value={user.username}
// // // //                 />
// // // //                 <InfoItem
// // // //                   icon={<Email color="primary" />}
// // // //                   label="Email"
// // // //                   value={user.email}
// // // //                 />
// // // //               </Grid>
// // // //               <Grid item xs={12} sm={6}>
// // // //                 <InfoItem
// // // //                   icon={<CalendarToday color="primary" />}
// // // //                   label="Joined"
// // // //                   value={new Date(user.date_joined).toLocaleDateString()}
// // // //                 />
// // // //                 <InfoItem
// // // //                   icon={<Visibility color="primary" />}
// // // //                   label="Total Views"
// // // //                   value={user.total_views.toString()}
// // // //                 />
// // // //                 <InfoItem
// // // //                   icon={<Star color="primary" />}
// // // //                   label="Reputation"
// // // //                   value={user.reputation.toString()}
// // // //                 />
// // // //               </Grid>
// // // //             </Grid>
// // // //           </Grid>
// // // //         </Grid>
// // // //       </Paper>
// // // //     </Box>
// // // //   );
// // // // }
