import React from "react";
import { ProfilePic } from "./leftSideBar";

const TeacherInfo = ({teacher, isNarrowScreen}) => {
  if (isNarrowScreen) {
    return (
      <div className="w-full">
        <div className="flex flex-row items-center justify-between bg-blue-500 rounded-xl px-10 py-2 w-full h-full bg-opacity-40">
          <div className="flex flex-row gap-2 justify-center items-center">
            {teacher.image ? (
              <img
                src={teacher.image}
                alt=""
                className="w-12 h-12 rounded-full mr-2"
              />
            ) : (
              <ProfilePic username={teacher.firstName} />
            )}
            <div className="text-sm">{teacher.firstName + " " + teacher.lastName}</div>
          </div>
          <>|</>
          <div className="text-sm">{teacher.card} Cards</div>
          <>|</>
          <div className="text-sm">{teacher.post} Posts</div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full pr-24">
        <div className="flex flex-row items-center justify-between bg-blue-500 rounded-xl px-20 py-4 w-full h-full bg-opacity-40">
              <div className="flex flex-row gap-2 justify-center items-center">
                {teacher.image ? (
                  <img
                    src={teacher.image}
                    alt=""
                    className="w-12 h-12 rounded-full mr-2"
                  />
                ) : (
                  <ProfilePic username={teacher.firstName} />
                )}
                <div className="text-xl">{teacher.firstName + " " + teacher.lastName}</div>
              </div>
              <>|</>
              <div className="text-xl">{teacher.card} Cards</div>
              <>|</>
              <div className="text-xl">{teacher.post} Posts</div>
        </div>
      </div>
    );
  }
};

export default TeacherInfo;