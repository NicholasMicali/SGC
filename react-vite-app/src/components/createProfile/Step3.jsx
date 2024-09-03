import React from "react";
import GoogleAutocompleteInput from "../location/googleAutocompleteInput";
import Button from "../../new componenets/Button";
const Step3 = ({ location, setLocation }) => {
  return (
    <div className="flex flex-col items-center gap-4 h-full">
      <h3 className="text-lg font-semibold max-md:mt-10">Please Provide a Location</h3>
      <GoogleAutocompleteInput
        value={location}
        onChange={setLocation}
        placeholder="Enter your city"
      />
      <div className="flex justify-end w-full mt-auto">
        <Button
          buttonText="Submit"
          className="bg-bold-blue px-8 py-1 rounded-lg w-fit text-white font-semibold hover:bg-bold-blue-hover"
        />
      </div>
    </div>
  );
};

export default Step3;
