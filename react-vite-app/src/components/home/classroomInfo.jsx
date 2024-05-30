import React from "react";

const ClassroomInfo = ({classroom, isNarrowScreen}) => {
    if (isNarrowScreen) {
      return (
        <div className="w-full">
        <div className="flex flex-row justify-between bg-gradient-to-tr rounded-xl px-10 py-2 from-gradient-light-start via-gradient-light-mid to-gradient-light-end w-full h-full bg-opacity-40">
            <div className="flex flex-col justify-center items-center">
                <div className="font-bold text-sm">{classroom.cName}</div>
                <div className="mt-2 text-sm">Name</div>
            </div>
            <div className="flex flex-col justify-center items-center">
                <div className="font-bold text-sm">{classroom.students.length}</div>
                <div className="mt-2 text-sm">Students</div>
            </div>
            <div className="flex flex-col justify-center items-center">
                <div className="font-bold text-sm">{classroom.cards}</div>
                <div className="mt-2 text-sm">Cards</div>
            </div>
            <div className="flex flex-col justify-center items-center">
                <div className="font-bold text-sm">{classroom.posts}</div>
                <div className="mt-2 text-sm">Posts</div>
            </div>
        </div>
      </div>
      );
    }

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