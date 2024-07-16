import { LeftSidebar } from "./components/home/leftSideBar";
import { doSignOut } from "./firebase/auth";
import { useAuth } from "./auth/index";
import SmallMenuSidebar from "./components/home/smallMenuSidebar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const MainLayout = ({ children }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate(); // Hook for navigation

  const signOut = async (e) => {
    e.preventDefault();
    try {
      const user = await doSignOut();
    } catch (error) {
      // Handle errors here, such as displaying a message to the user
      console.error("Log out failed:", error);
      alert("Failed to log out: " + error.message);
      return;
    }
    navigate("/");
  };

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [])
  return (
    <div className="flex h-screen">
      <LeftSidebar user={currentUser} signOut={signOut}/>
      <div className="w-full h-full md:ml-64">
        {children}
      </div>
      
      <SmallMenuSidebar
        user={currentUser}
        signOut={signOut}
      />
    </div>
  );
};

export default MainLayout;
