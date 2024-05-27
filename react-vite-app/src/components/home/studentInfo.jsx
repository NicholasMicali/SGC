import React from "react";

const StudentInfo = ({student}) => {
  
    return (
      <div className="w-full max-w-lg">
        <div className="flex flex-row justify-between bg-yellow-500 rounded-xl px-20 py-4 w-full h-full bg-opacity-40">
              <div className="text-xl">{student.firstName}</div>
              <>|</>
              <div className="text-xl">{student.card} Cards</div>
              <>|</>
              <div className="text-xl">{student.post} Posts</div>
        </div>
      </div>
    );
};

export default StudentInfo;