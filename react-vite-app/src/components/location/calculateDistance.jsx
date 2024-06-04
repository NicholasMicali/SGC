import { distanceMatrixBaseURL } from "../../firebase/googleMapsAPIKey";

export const calculateDistance = async (origin, destination) => {
    const response = await fetch(`${distanceMatrixBaseURL}&origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}`);
    const data = await response.json();
    const distance = data.rows[0].elements[0].distance.text;
    return distance;
};