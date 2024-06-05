
export const calculateDistance = async (origin, destination) => {
    return new Promise((resolve, reject) => {
        const service = new window.google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
            {
                origins: [origin],
                destinations: [destination],
                travelMode: 'DRIVING',
                unitSystem: window.google.maps.UnitSystem.IMPERIAL,
                avoidHighways: false,
                avoidTolls: false,
            },
            (response, status) => {
                if (status !== 'OK') {
                console.error('Error was:', status);
                reject(new Error('Error fetching distance'));
                return;
                }

                const distance = response.rows[0].elements[0].distance.text;
                console.log('Distance:', distance);
                const cleanedStr = distance.replace(/,/g, '').replace(/[^\d.]/g, '');
                const distanceFloat = parseFloat(cleanedStr);
                if (isNaN(distanceFloat)) {
                    reject(new Error("Distance must be a valid number"));
                }
                resolve(Math.round(distanceFloat));
            }
        );
    });
};