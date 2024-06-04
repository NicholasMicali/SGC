export const formatLocation = (components) => {
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