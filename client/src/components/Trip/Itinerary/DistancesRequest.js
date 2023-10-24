import React from 'react';
import { getOriginalServerUrl, sendAPIRequest } from '../../../utils/restfulAPI';
import serverSettings from '../../../utils/serverSettings';

export async function getDistancesResponse(places, earthRadius){
    let request = getDistancesRequest(places, earthRadius);
    const response = await sendAPIRequest(request, serverSettings.activeServerUrl);
    if (response) {
        const distanceList = response.distances;
        return distanceList;
    }
    return [];
}

export function getDistancesRequest(places, earthRadius){
    let request = {
        requestType: "distances",
        earthRadius: earthRadius,
        places: []
    }

    for(let i = 0; i < places.length; i++){
        request["places"].push({name: places[i].name, latitude: places[i].latitude, longitude: places[i].longitude});
    }
    return request;
}

export function JSONPlaceCreation(name, latitude, longitude){
    return JSON.stringify({"name" : name, "latitude" : latitude, "longitude" : longitude});
}

export function getTotalDistance(distances){
    let totalDistance = 0;
    distances.forEach(distance => totalDistance += distance);
    return totalDistance;
}
