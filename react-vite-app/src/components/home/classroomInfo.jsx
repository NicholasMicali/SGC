import React from "react";

const ClassroomInfo = ({classroom}) => {
  
    return (
      <div className="w-full">
        <div className="flex flex-row justify-between bg-gradient-to-tr rounded-xl px-20 py-4 from-gradient-light-start via-gradient-light-mid to-gradient-light-end w-full h-full bg-opacity-40">
            <div className="flex flex-col justify-center items-center">
                <div className="font-bold text-xl">{classroom.cName}</div>
                <div className="mt-2">Name</div>
            </div>
            <div className="flex flex-col justify-center items-center">
                <div className="font-bold text-xl">{classroom.students.length}</div>
                <div className="mt-2">Students</div>
            </div>
            <div className="flex flex-col justify-center items-center">
                <div className="font-bold text-xl">{classroom.cards}</div>
                <div className="mt-2">Cards</div>
            </div>
            <div className="flex flex-col justify-center items-center">
                <div className="font-bold text-xl">{classroom.posts}</div>
                <div className="mt-2">Posts</div>
            </div>
        </div>
      </div>
    );
};

export default ClassroomInfo;