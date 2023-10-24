import React from 'react';
import { getOriginalServerUrl, sendAPIRequest } from '../utils/restfulAPI';
import serverSettings from '../utils/serverSettings';

export async function getTourResponse(tour){
    let request = getDistancesRequest(tour);
    const response = await sendAPIRequest(request, serverSettings.activeServerUrl);
    return response;
}

export function getTourRequest(tour){
    let request = {
        requestType: "tour",
        earthRadius: 3959.0,
        response: 1,
        places: []
    }

    for(let i = 0; i < tour.length; i++){
        request["places"].push({name: tour[i].name, latitude: tour[i].latitude, longitude: tour[i].longitude});
    }
    return request;
}
