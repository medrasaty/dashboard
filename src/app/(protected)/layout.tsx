import { AuthSessionProvider } from "@/features/auth/contexts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * Root layout for all protected routes, it wrapps the entire app with AuthSessionProvider that exposes an authenticated user
 * @param param0 children {react node}
 */
export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthSessionProvider>
      {children}
      <ToastContainer hideProgressBar theme="light" position="bottom-right" />
    </AuthSessionProvider>
  );
}
