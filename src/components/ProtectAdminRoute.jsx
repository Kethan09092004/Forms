import { useSignIn, useUser, useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectAdminRoute = ({ children }) => {
  const { signIn, isLoaded } = useSignIn();
  const { isSignedIn, user } = useUser();
  const { signOut } = useAuth(); // Import signOut
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");

  // **Force logout of user when accessing admin route**
  useEffect(() => {
    if (isSignedIn && user?.publicMetadata?.role !== "admin") {
      signOut(); // Ensure normal users get logged out before admin login
    }
  }, [isSignedIn, user]);

  useEffect(() => {
    if (isLoaded && !otpSent) {
      sendOtp();
    }
  }, [isLoaded]);

  const sendOtp = async () => {
    try {
      if (!signIn) throw new Error("Clerk SignIn instance not available");

      await signIn.create({ identifier: "kethan09092004@gmail.com", strategy: "email_code" });
      setOtpSent(true);
    } catch (err) {
      console.error("Failed to send OTP:", err);
      setError("Failed to send OTP. Make sure admin account exists in Clerk.");
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await signIn.attemptFirstFactor({ strategy: "email_code", code: otp });

      if (response.status === "complete") {
        localStorage.setItem("isAdminAuthenticated", "true");
        setIsVerified(true);
      } else {
        setError("Invalid OTP. Try again.");
      }
    } catch (err) {
      setError("Invalid OTP. Try again.");
      console.error(err);
    }
  };

  if (!isLoaded) return <p>Loading...</p>;
  if (!otpSent) return <p>Sending OTP...</p>;
  if (isVerified || localStorage.getItem("isAdminAuthenticated") === "true") return children;

  return (
    <div>
      <h2>Admin Verification</h2>
      <form onSubmit={verifyOtp}>
        <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
        <button type="submit">Verify OTP</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ProtectAdminRoute;
