import React, { useState, useEffect } from 'react'
import { useAuth } from '../auth/index';
import { doSignOut } from '../firebase/auth.js';
import { Navigate } from 'react-router-dom';
import { LeftSidebar } from '../components/home/leftSideBar';
import SmallMenuSidebar from '../components/home/smallMenuSidebar.jsx';
import ClassroomInfo from '../components/home/classroomInfo.jsx';
import StudentInfo from '../components/home/studentInfo.jsx';
import TeacherInfo from '../components/home/teacherInfo.jsx';
import { Trash } from "lucide-react";
import CardsButton from '../components/cardsPages/cardsButton.jsx';
import Logo from "../assets/logo.svg";
import { doFetchUserProfile, doCreateClassroom, doJoinClassroom, doClassroomToProfile, doFetchClassByName, doFetchClassroom, doRemoveClassroomFromUserProfile, doRemoveStudentFromClassroom } from '../firebase/firestore.js';

const Classroom = () => {
    const { currentUser } = useAuth();
    const [isSigningOut, setIsSigningOut] = useState(false);
    const [userProfile, setUserProfile] = useState(null);
    const [toggleJoin, setToggleJoin] = useState(false);
    const [toggleCreate, setToggleCreate] = useState(false);
    const [joinName, setJoinName] = useState('');
    const [createName, setCreateName] = useState('');
    const [classrooms, setClassrooms] = useState([]);
    const [students, setStudents] = useState([]);
    const [isNarrowScreen, setIsNarrowScreen] = useState(window.innerWidth <= 820);
    const [teachers, setTeachers] = useState(null);
  
    useEffect(() => {
      const handleResize = () => {
        setIsNarrowScreen(window.innerWidth <= 820);
      };
  
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    useEffect(() => {
      const fetchUserProfile = async () => {
        try {
          const profile = await doFetchUserProfile(currentUser.uid);
          const userData = profile.data();
          setUserProfile(userData);
          if (profile && profile.data().classrooms) {
            const classes = await fetchClassrooms(profile.data().classrooms);
            setClassrooms(classes);
            if (profile.data().userType == "Teacher") {
              fetchStudents(classes);
              //console.log("fetched students");
              //console.log(students);
            }
            if (classes) {
              const teachersArray = await fetchTeachers(classes);
              setTeachers(teachersArray);
              console.log("fetched teachers:");
              console.log(teachersArray);
            }
          }
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
        }
      };
    
      if (currentUser && currentUser.uid) {
        fetchUserProfile();
      }
    }, [currentUser]);


    const fetchClassrooms = async (classIds) => {
      try {
        const classPromises = classIds.map(classId => doFetchClassroom(classId));
        const classObjects = await Promise.all(classPromises);
        return(classObjects.map(classObj => classObj.data()));
      } catch (error) {
        console.error("Failed to fetch classrooms:", error);
      }
    };


    const fetchStudents = async (classrooms) => {
      if (classrooms.length == 0) {
        console.log("no classrooms");
        return;
      }
      try {
        const students2DArray = await Promise.all(
          classrooms.map(async (classroom) => {
            const studentIds = classroom.students;
            console.log(classroom.students);
            const studentPromises = studentIds.map((studentId) => doFetchUserProfile(studentId));
            const studentObjects = await Promise.all(studentPromises);
            return studentObjects.map((studentObj) => studentObj.data());
          })
        );
        if (!students2DArray){
          console.log("No students found");
          return
        }
        //console.log(students2DArray);
        setStudents(students2DArray);
      } catch (error) {
        console.error("Failed to fetch students:", error);
      }
    };

    const fetchTeachers = async (classrooms) => {
      console.log(classrooms);
      if (classrooms.length == 0) {
        console.log("no classrooms");
        return;
      }
      try {
        const teacherPromises = classrooms.map(classroom => doFetchUserProfile(classroom.uid));
        const teacherObjects = await Promise.all(teacherPromises);
        return(teacherObjects.map(teachObj => teachObj.data()));
      } catch (error) {
        console.error("Failed to fetch teachers:", error);
      }
    };

  
    const signOut = async (e) => {
      e.preventDefault()
      try {
        const user = await doSignOut();
      } catch (error) {
      // Handle errors here, such as displaying a message to the user
        console.error('Log out failed:', error);
        alert('Failed to log out: ' + error.message);
        return;
      }
      //console.log("user logged out: " + user);
      setIsSigningOut(true);
  
    }
  

    const createClassroom = async (e) => {
      e.preventDefault();
      try {
        const created = await doCreateClassroom(currentUser.uid, userProfile.firstName, createName, []);
        await doClassroomToProfile(currentUser.uid, created.id);
        window.location.reload(); 
      } catch (error) {
        console.log("Failed to create classroom: " + error);
      }
    }

    const joinClassroom = async (e) => {
      e.preventDefault();
      try {
        const joined = await doFetchClassByName(joinName);
        if (!joined) {
          console.log("Error finding classroom");
          return;
        }
        if (joined.length == 0){
          console.log("No classroom with the name: " + joinName);
          return;
        }
        //console.log(joined);
        await doJoinClassroom(joined.id, currentUser.uid);
        await doClassroomToProfile(currentUser.uid, joined.id);
        window.location.reload(); 
      } catch (error) {
        console.log("Failed to join classroom: " + error);
      }
    }


    const leaveClassroom = async (classroom) => {
      if (window.confirm("Are you sure you want to leave this classroom? This action cannot be undone.")) {
        try {
          console.log(classroom);
          await doRemoveClassroomFromUserProfile(currentUser.uid, classroom);
          await doRemoveStudentFromClassroom(currentUser.uid, classroom);
          window.location.reload(); 
        } catch (error) {
          console.log("Failed to leave classroom: " + error);
        }
      }
    }

    const removeClassroom = async (classroom) => {
      if (window.confirm("Are you sure you want to delete this classroom? This action cannot be undone.")) {
        try {
          await doRemoveClassroomFromUserProfile(currentUser.uid, classroom);
          window.location.reload(); 
        } catch (error) {
          console.log("Failed to leave classroom: " + error);
        }
      }
    }

  
    if (isSigningOut) {
      return (<Navigate to={"/"} replace={true} />)
    }
  
    //<button className="rounded-2xl border-[1px] h-12 py-2 px-3 border-black ml-4">Delete</button>
  
    //<div className="ml-4">Student: {student.firstName} | cards: {student.card} | posts: {student.post}</div>

/*<div className="self-center max-w-sm flex flex-col justify-center items-center bg-green-500 bg-opacity-40 rounded-xl py-4 mt-10" onClick={() => setToggleJoin(true)}>
<div>+ Join Classroom</div>
</div>
*/

    return (
      // <div className="flex h-screen">
      //   {!isNarrowScreen && (
      //     <LeftSidebar user={currentUser} signOut={signOut} page="Classroom" />
      //   )}
        <div className="flex-grow flex flex-col items-center overflow-auto p-4 mt-6">
          <img src={Logo} alt="Spread Goodness logo" className="mb-6" /> 
          <div className="text-[4rem] self-start font-bold mb-4">Classrooms</div>
          {userProfile?.userType == 'Student' &&
            <div className="w-full">
              {classrooms.map((classroom, index) => (
                <div className="w-full flex flex-col mt-6">
                  <div className="w-full flex flex-row items-center">
                    <ClassroomInfo classroom={classroom} isNarrowScreen={isNarrowScreen}/>
                    <button onClick={() => leaveClassroom(userProfile.classrooms[index])} className="py-2 px-2 ml-2"><Trash></Trash></button>
                  </div>
                  <div className="w-full flex flex-col pl-12 mb-4 mt-2">
                    <div className="text-xl">Teacher</div>
                    {teachers && teachers[index] && 
                      <TeacherInfo teacher={teachers[index]} isNarrowScreen={isNarrowScreen}/>
                    }
                    </div>
                </div>
              ))}
              {!toggleJoin ?
                <CardsButton
                  width="200px"
                  height="51.75px"
                  text="Join Classroom"
                  borderColor="#BEDF3D"
                  textColor="#8DAB1C"
                  backgroundColor="#EAF4C0"
                  staticStyle={true}
                  onClick={() => setToggleJoin(true)}
                />
              :
                <>
                  <div className="flex flex-col gap-1 w-full mt-6">
                    <label htmlFor={'joinName'} className="self-start">Classroom Name</label>
                    <input
                      className="rounded-3xl border-[1px] p-2 md:p-3 border-gray-400"
                      placeholder="Enter the name of the classoorm (e.g., Smith123-1)"
                      type='text'
                      id='joinName'
                      value={joinName}
                      onChange={(e) => setJoinName(e.target.value)}
                      required
                    />
                  </div>
                  <button onClick={joinClassroom} className="w-full flex items-center justify-center bg-gradient-to-tr from-gradient-start via-gradient-mid to-gradient-end rounded-3xl p-3 mt-6 bg-opacity-60 text-white font-sans text-xl">
                    Join
                  </button>
                </>
              }
            </div>
          }
          {userProfile?.userType == 'Teacher' &&
            <>
              {classrooms.map((classroom, index) => (
                <div className="w-full flex flex-col mt-6">
                  <div className="w-full flex flex-row items-center">
                    <ClassroomInfo classroom={classroom} isNarrowScreen={isNarrowScreen}/>
                    <button onClick={() => removeClassroom(userProfile.classrooms[index])} className="py-2 px-3 ml-4"><Trash></Trash></button>
                  </div>
                  <div className="w-full flex flex-col pl-12 py-4">
                    <div className="text-xl">Students</div>
                    {students[index] && 
                      <>
                        {students[index].map((student) => (
                          <StudentInfo student={student} isNarrowScreen={isNarrowScreen}/>
                        ))}
                      </>
                    }
                  </div>
                </div>
              ))}
              {!toggleCreate ?
                <CardsButton
                  width="200px"
                  height="51.75px"
                  text="Create Classroom"
                  borderColor="#BEDF3D"
                  textColor="#8DAB1C"
                  backgroundColor="#EAF4C0"
                  staticStyle={true}
                  onClick={() => setToggleCreate(true)}
                />
              :
                <>
                  <div className="flex flex-col gap-1 w-full mt-6">
                    <label htmlFor={'createName'} className="self-start">Classroom Name</label>
                    <input
                      className="rounded-3xl border-[1px] p-2 md:p-3 border-gray-400"
                      placeholder="Enter the name of the classoorm (e.g., Smith123-1)"
                      type='text'
                      id='createName'
                      value={createName}
                      onChange={(e) => setCreateName(e.target.value)}
                      required
                    />
                  </div>
                  <button onClick={createClassroom} className="w-full flex items-center justify-center bg-gradient-to-tr from-gradient-start via-gradient-mid to-gradient-end rounded-3xl p-3 mt-6 bg-opacity-60 text-white font-sans text-xl">
                    Create
                  </button>
                </>
              }
            </>
          }
          {userProfile?.userType == 'Visitor' &&
            <div className="text-2xl mt-6">Your Account is not registed as a student or teacher {":("}</div>
          }
        </div>
      //   {isNarrowScreen && (
      //     <SmallMenuSidebar 
      //       user={currentUser} 
      //       signOut={signOut} 
      //       page="Classroom" />
      // )}
      // </div>
    );
}

export default Classroom