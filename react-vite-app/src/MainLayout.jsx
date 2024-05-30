import { LeftSidebar } from "./components/home/leftSideBar";
import { doSignOut } from "./firebase/auth";
import { useAuth } from "./auth/index";
import SmallMenuSidebar from "./components/home/smallMenuSidebar";
import { useState } from "react";
const MainLayout = ({ children }) => {
  const { currentUser } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);


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
    setIsSigningOut(true);
  };
  return (
    <div className="flex h-screen">
      <LeftSidebar user={currentUser} signOut={signOut} page="Feed" />
      {children}
      <SmallMenuSidebar
        user={currentUser}
        signOut={signOut}
        page="Account Settings"
      />
    </div>
  );
};

export default MainLayout;
