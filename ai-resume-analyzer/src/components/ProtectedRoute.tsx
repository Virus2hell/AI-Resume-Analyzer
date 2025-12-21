// src/components/ProtectedRoute.tsx
import { ReactNode } from "react";
import { useUser } from "@clerk/clerk-react";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isSignedIn, isLoaded } = useUser();
  const location = useLocation();

  if (!isLoaded) {
    // while Clerk loads, you can show a spinner or nothing
    return null;
  }

  if (!isSignedIn) {
    // redirect to sign-in and remember where user wanted to go
    return (
      <Navigate
        to="/sign-in"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
