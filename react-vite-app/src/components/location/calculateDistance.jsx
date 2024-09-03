
import { geocodeBaseURL } from "../../firebase/googleMapsAPIKey";

const getCoordinates = async (address) => {
    const url = `${geocodeBaseURL}&address=${encodeURIComponent(address)}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        return { lat: location.lat, lng: location.lng };
      } else {
        throw new Error("No results found for the given address.");
      }
    } catch (error) {
      console.error("Geocoding Error:", error);
      throw error;
    }
  };

const haversinesFormula = (coords1, coords2) => {
    const toRad = (x) => (x * Math.PI) / 180;

    const lat1 = coords1.lat;
    const lon1 = coords1.lng;
    const lat2 = coords2.lat;
    const lon2 = coords2.lng;

    const R = 6371; // Radius of the Earth in km

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let distance = R * c; // Distance in km
    distance *= 0.621371; // Convert km to miles
    distance = Math.round(distance);

    return distance;
};

export const calculateDistance = async (origin, destination) => {
    try {
        const originCoordinates = await getCoordinates(origin);
        console.log(originCoordinates);
        const destinationCoordinates = await getCoordinates(destination);
        console.log(destinationCoordinates);
        const distance = haversinesFormula(originCoordinates, destinationCoordinates);
        console.log(`Distance: ${distance} miles`);
        //const cleanedStr = distance.replace(/,/g, '').replace(/[^\d.]/g, '');
        //const distanceFloat = parseFloat(cleanedStr);
        if (isNaN(distance)) {
            console.log("Distance must be a valid number");
            return 0;
        }
        return distance;
    } catch (error) {
        console.error("Error calculating distance:", error);
        throw error;
    }
};
