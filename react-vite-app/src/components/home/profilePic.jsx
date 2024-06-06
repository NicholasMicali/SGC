import { animateSideFadeIn } from "../../constants/anim";
import { colors } from "../../constants/pageConstants";
import {motion} from "framer-motion";


const ProfilePic = ({ username }) => {
    const firstChar = username.charAt(0).toUpperCase();
    const color = colors[firstChar];
  
    return (
      <motion.div
      {...animateSideFadeIn(true)}
        className="relative w-12 h-12 rounded-full mr-3"
        style={{ backgroundColor: color }}
      >
        <p className="text-xl text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {firstChar}
        </p>
      </motion.div>
    );
  };

  
  export default ProfilePic;