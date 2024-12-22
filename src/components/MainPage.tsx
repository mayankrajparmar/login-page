import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Define the structure of the user data
interface UserData {
  username: string;
  email?: string; // Optional since email may not always be provided
  gender?: string; // Optional
}

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    } else {
      navigate("/auth/login"); // Redirect to login if no user data is found
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    navigate("/auth/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFFFF] px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-8 w-full max-w-md   p-6 sm:p-8">
        {/* Welcome Section */}
        <h1 className="text-3xl sm:text-4xl font-medium text-center">
          Welcome to <br />
          <span className="text-4xl sm:text-5xl font-black text-primary">
            Unstop
          </span>
        </h1>

        {/* User Info Section */}
        <div className="w-full border border-[#E2E2E2] shadow-lg rounded-2xl flex flex-col items-center gap-5 py-5 px-6">
          <img
            src="../assets/Ellipse 1.png"
            alt="User Avatar"
            className="h-24 w-24 rounded-full object-cover"
          />
          <div className="flex flex-col items-center text-center">
            {userData ? (
              <>
                <h3 className="font-bold text-lg text-primary">
                  {userData.username}
                </h3>
                <p className="text-sm font-medium text-gray-600">
                  {userData.email || "Email not provided"}
                  <br />
                  <span>{userData.gender || "Gender not provided"}</span>
                </p>
              </>
            ) : (
              <p>Loading user data...</p>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="rounded-2xl bg-primary px-6 py-2 text-white font-medium hover:bg-primary-dark transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
