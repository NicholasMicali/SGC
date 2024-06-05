import { distanceMatrixBaseURL } from "../../firebase/googleMapsAPIKey";

export const calculateDistance = async (origin, destination) => {
    try {
        // const response = await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&key=AIzaSyD_PjWNi5kbBmIJ5yShDrqtMT_6mbYxSeY&origins=1600%20Amphitheatre%20Parkway,%20Mountain%20View,%20CA&destinations=1%20Infinite%20Loop,%20Cupertino,%20CA`)
        const response = await fetch(`${distanceMatrixBaseURL}&origins=1600%20Amphitheatre%20Parkway,%20Mountain%20View,%20CA&destinations=1%20Infinite%20Loop,%20Cupertino,%20CA`);
        const data = await response.json();
        if (data.results && data.results.length > 0) {
            const distance = data.rows[0].elements[0].distance.text;
            console.log(distance);
        } else {
            console.error("No results found for the given coordinates.");
        }
        return distance;
    } catch (error) {
        console.log("Google Maps Error:" + error);
    }
};