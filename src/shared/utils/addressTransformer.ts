import env from "../../api/env";

export const getAddressFromCoordinates = async (coords: { latitude: any; longitude: any; }) => {

    if (!coords.latitude || !coords.longitude) return null

    const GOOGLE_API_KEY = env.GOOGLE_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords?.latitude},${coords?.longitude}&key=${GOOGLE_API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === 'OK') {
            const address = data.results[0]?.formatted_address;
            return address;
        } else {
            console.log('Geocoding error:', data.status);
            return null;
        }
    } catch (error) {
        console.error('Error in reverse geocoding:', error);
        return null;
    }
};

export const getCityCountryFromCoordinates = async (coords: { latitude: any; longitude: any; }) => {

    if (!coords.latitude || !coords.longitude) return null

    const GOOGLE_API_KEY = env.GOOGLE_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords?.latitude},${coords?.longitude}&key=${GOOGLE_API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === 'OK' && data.results.length > 0) {
            const addressComponents = data.results[0].address_components;

            const city =
                addressComponents.find((comp: any) =>
                    comp.types.includes('locality')
                )?.long_name ||
                addressComponents.find((comp: any) =>
                    comp.types.includes('administrative_area_level_2')
                )?.long_name ||
                '';

            const country =
                addressComponents.find((comp: any) =>
                    comp.types.includes('country')
                )?.long_name || '';

            return { city, country };
        } else {
            console.log('Geocoding error:', data.status);
            return null;
        }
    } catch (error) {
        console.error('Error in reverse geocoding:', error);
        return null;
    }
};