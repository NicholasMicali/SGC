import { geocodeBaseURL } from "../../firebase/googleMapsAPIKey";
import { formatLocation } from "./formatLocation.jsx"

export const fetchLocation = async () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `${geocodeBaseURL}&latlng=${latitude},${longitude}`
            );
            const data = await response.json();
            if (data.results && data.results.length > 0) {
              const addressComponents = data.results[0].address_components;
              const formattedLocation = formatLocation(addressComponents);
              resolve(formattedLocation);
            } else {
              console.error("No results found for the given coordinates.");
              //resolve('No results found for the given coordinates.');
              resolve("No location found, enter one below");
            }
          } catch (error) {
            console.error("Error fetching location:", error);
            //resolve('Error fetching location.');
            resolve("No location found, enter one below");
          }
        },
        (error) => {
          console.error("Error fetching location:", error);
          //setLocation('Error fetching location.');
          resolve("No location found, enter one below");
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      //setLocation('Geolocation is not supported by this browser.');
      resolve("No location found, enter one below");
    }
  });
};