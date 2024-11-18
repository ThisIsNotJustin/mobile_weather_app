import * as Location from 'expo-location';
import { GOOGLE_PLACES_API_KEY } from '@env';
import { LocationObject, LocationAccuracy } from 'expo-location';

interface LocationError {
    message: string;
}

interface LocationResponse {
    location?: LocationObject;
    error?: LocationError;
}

export async function getCurrentLocation(): Promise<LocationResponse> {
    try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            return {
                error: {
                    message: "Permission to access location was denied"
                }
            };
        }

        const location = await Location.getCurrentPositionAsync({
            accuracy: LocationAccuracy.High,
        });

        return {
            location
        };
    } catch (error) {
        return {
            error: {
                message: "Error getting location"
            }
        };
    }
}

export async function getLocationFromAddress(address: string): Promise<LocationResponse> {
    try {
        const encodedAddress = encodeURIComponent(address);
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${GOOGLE_PLACES_API_KEY}`
        );
        const data = await response.json();

        if (!data.results || data.status !== 'OK' || data.results.length === 0) {
            return {
                error: {
                    message: "No Location found"
                }
            };
        }

        const location = data.results[0].geometry.location;

        return {
            location: {
                coords: {
                    latitude: location.lat,
                    longitude: location.lng,
                    altitude: null,
                    accuracy: null,
                    altitudeAccuracy: null,
                    heading: null,
                    speed: null
                },
                timestamp: Date.now()
            }
        };
    } catch (error) {
        return {
            error: {
                message: "Error geocoding address"
            }
        };
    }
}

export async function getAddressFromCoordinates(
    latitude: number,
    longitude: number
): Promise<string | null> {
    try {
        const addresses = await Location.reverseGeocodeAsync({
            latitude,
            longitude
        });

        if (addresses.length > 0) {
            const address = addresses[0];
            return `${address.city}, ${address.country}`;
        }

        return null;
    } catch (error) {
        console.error("Error reverse geocoding: ", error);
        return null;
    }
}