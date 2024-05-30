const ProfilePic = ({ username }) => {
    const colors = {
      A: "#FF8C00",
      B: "#800000",
      C: "#DC143C",
      D: "#FFFF00",
      E: "#008000",
      F: "#FF00FF",
      G: "#008000",
      H: "#FFD700",
      I: "#4B0082",
      J: "#00FF00",
      K: "#BDB76B",
      L: "#800080",
      M: "#FF00FF",
      N: "#000080",
      O: "#FFA500",
      P: "#6495ED",
      Q: "#D19275",
      R: "#FF0000",
      S: "#0000FF",
      T: "#40E0D0",
      U: "#7B68EE",
      V: "#EE82EE",
      W: "#FFFFFF",
      X: "#BC8F8F",
      Y: "#FFFF00",
      Z: "#8A2BE2",
    };
    const firstChar = username.charAt(0).toUpperCase();
    const color = colors[firstChar];
  
    return (
      <div
        className="relative w-12 h-12 rounded-full mr-3" style={{backgroundColor: color}}
      >
        <p className="text-xl text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {firstChar}
        </p>
      </div>
    );
  };

  
  export default ProfilePic;