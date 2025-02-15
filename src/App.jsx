import { Route, Routes, Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import AdminLogin from "./components/adminLogin";
import UserLogin from "./components/userLogin";
import ProtectAdminRoute from "./components/ProtectAdminRoute";
import ProtectedUserRoute from "./components/ProtectedUserRoute";
import UserPage from "./components/UserPage";

const App = () => {
  const { isSignedIn, user } = useUser();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<UserLogin />} />

      {/* Protected Admin Route */}
      <Route
        path="/admin"
        element={
          <ProtectAdminRoute>
            <AdminLogin />
          </ProtectAdminRoute>
        }
      />

      {/* Protected User Route */}
      <Route
        path="/user"
        element={
          <ProtectedUserRoute>
            <UserPage />
          </ProtectedUserRoute>
        }
      />

      {/* Redirect based on authentication */}
      <Route
        path="/"
        element={
          isSignedIn ? (
            user?.publicMetadata?.role === "admin" ? (
              <Navigate to="/admin" />
            ) : (
              <Navigate to="/user" />
            )
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
