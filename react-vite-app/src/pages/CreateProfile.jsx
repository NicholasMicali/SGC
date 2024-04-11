import React, { useState } from 'react';
import { useAuth } from '../auth/index';
import { Navigate } from 'react-router-dom';
import { doCreateUserProfile } from '../firebase/firestore';
import CustomInput from "../components/auth/customInput.jsx";



const CreateProfilePage = () => {

  const { currentUser } = useAuth();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');
  const [isProfileCreated, setIsProfileCreated] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      await doCreateUserProfile(currentUser.uid, currentUser.email, name, age, location);
    } catch (error) {
    // Handle errors here, such as displaying a message to the user
      console.error('Profile Creation failed:', error);
      alert('Failed to Create Profile: ' + error.message);
      return;
    }
    //console.log("user logged out: " + user);
    setIsProfileCreated(true);

  }


  if (isProfileCreated) {
    return (<Navigate to={"/home"} replace={true} />)
  }

  return (
    <>
      <form onSubmit={onSubmit} className="w-full flex flex-col gap-5">
        <CustomInput
          type="name"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
          labelName="Name"
        />
        <CustomInput
          placeholder="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          id="age"
          labelName="Age"
        />
        <CustomInput
          placeholder="loaction"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          id="location"
          labelName="Location"
        />
        <button
          type="submit"
          className="  bg-gradient-to-tr rounded-xl p-2 text-white from-gradient-start via-gradient-mid to-gradient-end"
        >
          Save
        </button>
      </form>
    </>

  );
};

export default CreateProfilePage;
