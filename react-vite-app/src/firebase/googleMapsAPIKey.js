const key = import.meta.env.GOOGLE_API_KEY;
export const src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`;
export const geocodeBaseURL = `https://maps.googleapis.com/maps/api/geocode/json?key=${key}`;