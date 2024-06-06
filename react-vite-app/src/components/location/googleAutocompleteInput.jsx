import React, { useEffect, useRef } from "react";

const GoogleAutocompleteInput = ({ value, onChange, className, placeholder, required }) => {
  const autocompleteRef = useRef(null);
  const inputRef = useRef(null);

  const formatAddress = (components) => {
    let city = "";
    let state = "";
    let country = "";

    components.forEach(component => {
      if (component.types.includes("locality")) {
        city = component.long_name;
      }
      if (component.types.includes("country")) {
        country = component.long_name;
      }
    });

    components.forEach(component => {
      if (component.types.includes("administrative_area_level_1")) {
        if (country === "United States") {
          state = component.short_name;
        } else {
          state = component.long_name;
        }
      }
    });

    return `${city}${state ? ', ' + state : ''}, ${country}`;
  };

  useEffect(() => {
    if (window.google && window.google.maps) {
      autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ["(cities)"],
      });

      autocompleteRef.current.addListener("place_changed", () => {
        const place = autocompleteRef.current.getPlace();
        const formattedAddress = formatAddress(place.address_components);
        onChange(formattedAddress);
      });
    }
  }, []);

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder={placeholder || "Enter your city"}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={className || "border p-2 rounded w-full"}
      required={required}
    />
  );
};

export default GoogleAutocompleteInput;