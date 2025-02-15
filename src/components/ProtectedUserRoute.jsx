import { useAuth, useSignIn, useUser} from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ProtectedUserRoute = ({ children }) => {
  const { isSignedIn, user } = useUser();
  const { signOut } = useAuth(); 

  // **Ensure admin gets logged out before accessing user route**
  useEffect(() => {
    if (isSignedIn && user?.publicMetadata?.role === "admin") {
      signOut(); 
    }
  }, [isSignedIn, user]);

  if (!isSignedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedUserRoute;
