import { useAuth} from "@clerk/clerk-react";

const AdminLogin = () => {
  const { signOut } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    signOut(); // Logs out admin session
  };

  return (
    <div>
      <h1>Welcome Admin</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AdminLogin;
