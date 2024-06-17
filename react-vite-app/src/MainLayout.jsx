import { LeftSidebar } from "./components/home/leftSideBar";
import { doSignOut } from "./firebase/auth";
import { useAuth } from "./auth/index";
import SmallMenuSidebar from "./components/home/smallMenuSidebar";
import { useState} from "react";
import { useNavigate } from "react-router-dom";
const MainLayout = ({ children }) => {
  const { currentUser } = useAuth();
  // const [page, setPage] = useState("Feed");
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
    //console.log("user logged out: " + user);
    navigate("/");
  };
  return (
    <div className="flex h-screen">
      <LeftSidebar user={currentUser} signOut={signOut}/>
      {children}
      <SmallMenuSidebar
        user={currentUser}
        signOut={signOut}
      />
    </div>
  );
};

export default MainLayout;
