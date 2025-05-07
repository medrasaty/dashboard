"use client";

import { useState } from "react";
import {
  Button,
  DialogContent,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import {
  StyledDialog as Dialog,
  StyledDialogTitle,
} from "@/components/styled/Dialog";
import { CreateUserForm } from "./forms/CreateUserForm";
// import { Button } from "@/components/ui/button";

export default function AddUserDialog() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant={"contained"} color="primary" onClick={handleClickOpen}>
        Add New User
      </Button>
      <Dialog
        open={open}
        fullScreen={fullScreen}
        maxWidth="md"
        fullWidth
        TransitionProps={{
          enter: theme.transitions.duration.enteringScreen,
          exit: theme.transitions.duration.leavingScreen,
        }}
      >
        <StyledDialogTitle>
          Add New User
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </StyledDialogTitle>
        <DialogContent sx={{ padding: 0 }}>
          <CreateUserForm onSuccess={handleClose} />
        </DialogContent>
      </Dialog>
    </>
  );
}

// "use client";

// import { useState } from "react";
// import {
//   Button,
//   Dialog as MuiDialog,
//   DialogContent,
//   DialogTitle,
//   IconButton,
//   styled,
//   useTheme,
// } from "@mui/material";
// import { Close as CloseIcon } from "@mui/icons-material";
// import AddNewUserForm from "./AddNewUserForm";

// const Dialog = styled(MuiDialog)(({ theme }) => ({
//   "& .MuiBackdrop-root": {
//     backgroundColor: "rgba(0, 0, 0, 0.2)", // Adjust the opacity here
//   },
//   "& .MuiDialog-paper": {
//     display: "flex",
//     flexDirection: "column",
//     width: "100%",
//     padding: theme.spacing(4),
//     gap: theme.spacing(2),
//     margin: "auto",
//     [theme.breakpoints.up("sm")]: {
//       maxWidth: "450px",
//     },
//     backgroundColor: "rgba(255, 255, 255, 0.8)", // Adjust the opacity here
//     backdropFilter: "blur(10px)", // This creates the frosted glass effect
//     WebkitBackdropFilter: "blur(10px)", // For Safari support
//     boxShadow:
//       "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
//     ...theme.applyStyles?.("dark", {
//       backgroundColor: "rgba(18, 18, 18, 0.8)", // Adjust for dark mode
//       boxShadow:
//         "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
//     }),
//     "&::before": {
//       content: '""',
//       display: "block",
//       position: "absolute",
//       zIndex: -1,
//       inset: 0,
//       backgroundImage:
//         "radial-gradient(ellipse at 50% 50%, hsla(220, 100%, 97%, 0.5), hsla(0, 0%, 100%, 0.5))",
//       backgroundRepeat: "no-repeat",
//       ...theme.applyStyles?.("dark", {
//         backgroundImage:
//           "radial-gradient(at 50% 50%, hsla(220, 100%, 16%, 0.3), hsla(220, 30%, 5%, 0.3))",
//       }),
//     },
//   },
// }));

// const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
//   padding: 0,
//   marginBottom: theme.spacing(2),
// }));

// export default function AddUserDialog() {
//   const [open, setOpen] = useState(false);
//   const theme = useTheme();

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <>
//       <Button variant="contained" color="primary" onClick={handleClickOpen}>
//         Add New User
//       </Button>
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         maxWidth="md"
//         fullWidth
//         // Add these props for a smoother opening/closing effect
//         TransitionProps={{
//           enter: theme.transitions.duration.enteringScreen,
//           exit: theme.transitions.duration.leavingScreen,
//         }}
//       >
//         <StyledDialogTitle>
//           Add New User
//           <IconButton
//             aria-label="close"
//             onClick={handleClose}
//             sx={{
//               position: "absolute",
//               right: 8,
//               top: 8,
//               color: (theme) => theme.palette.grey[500],
//             }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </StyledDialogTitle>
//         <DialogContent sx={{ padding: 0 }}>
//           <AddNewUserForm onClose={handleClose} />
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }

// // "use client";
// // import { useState } from "react";
// // import {
// //   Button,
// //   DialogContent,
// //   DialogTitle,
// //   IconButton,
// //   Dialog as MuiDialog,
// //   styled,
// //   useTheme,
// // } from "@mui/material";
// // import { Close as CloseIcon } from "@mui/icons-material";
// // import AddNewUserForm from "./AddNewUserForm";

// // const Dialog = styled(MuiDialog)(({ theme }) => ({
// //   "& .MuiBackdrop-root": {
// //     backgroundColor: "rgba(0, 0, 0, 0.2)", // Adjust the opacity here
// //   },
// //   "& .MuiDialog-paper": {
// //     display: "flex",
// //     flexDirection: "column",
// //     width: "100%",
// //     padding: theme.spacing(4),
// //     gap: theme.spacing(2),
// //     margin: "auto",
// //     [theme.breakpoints.up("sm")]: {
// //       maxWidth: "450px",
// //     },
// //     backgroundColor: "rgba(255, 255, 255, 0.8)", // Adjust the opacity here
// //     backdropFilter: "blur(10px)", // This creates the frosted glass effect
// //     WebkitBackdropFilter: "blur(10px)", // For Safari support
// //     boxShadow:
// //       "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
// //     ...theme.applyStyles?.("dark", {
// //       backgroundColor: "rgba(18, 18, 18, 0.8)", // Adjust for dark mode
// //       boxShadow:
// //         "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
// //     }),
// //     "&::before": {
// //       content: '""',
// //       display: "block",
// //       position: "absolute",
// //       zIndex: -1,
// //       inset: 0,
// //       backgroundImage:
// //         "radial-gradient(ellipse at 50% 50%, hsla(220, 100%, 97%, 0.5), hsla(0, 0%, 100%, 0.5))",
// //       backgroundRepeat: "no-repeat",
// //       ...theme.applyStyles?.("dark", {
// //         backgroundImage:
// //           "radial-gradient(at 50% 50%, hsla(220, 100%, 16%, 0.3), hsla(220, 30%, 5%, 0.3))",
// //       }),
// //     },
// //   },
// // }));

// // const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
// //   padding: 0,
// //   marginBottom: theme.spacing(2),
// // }));

// // export default function AddUserDialog() {
// //   const [open, setOpen] = useState(false);

// //   const handleClickOpen = () => {
// //     setOpen(true);
// //   };

// //   const handleClose = () => {
// //     setOpen(false);
// //   };

// //   return (
// //     <>
// //       <Button variant="contained" color="primary" onClick={handleClickOpen}>
// //         Add New User
// //       </Button>
// //       <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
// //         <DialogTitle>
// //           Add New User
// //           <IconButton
// //             aria-label="close"
// //             onClick={handleClose}
// //             sx={{
// //               position: "absolute",
// //               right: 8,
// //               top: 8,
// //               color: (theme) => theme.palette.grey[500],
// //             }}
// //           >
// //             <CloseIcon />
// //           </IconButton>
// //         </DialogTitle>
// //         <DialogContent>
// //           <AddNewUserForm onClose={handleClose} />
// //         </DialogContent>
// //       </Dialog>
// //     </>
// //   );
// // }
