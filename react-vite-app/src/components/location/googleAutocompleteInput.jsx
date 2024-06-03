import React, { useEffect, useRef } from "react";

const GoogleAutocompleteInput = ({ value, onChange }) => {
  const autocompleteRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (window.google && window.google.maps) {
      autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ["(cities)"],
      });

      autocompleteRef.current.addListener("place_changed", () => {
        const place = autocompleteRef.current.getPlace();
        onChange(place.formatted_address);
      });
    }
  }, []);

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder="Enter your city"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border p-2 rounded w-full"
    />
  );
};

export default GoogleAutocompleteInput;