import React from 'react';
import { getOriginalServerUrl, sendAPIRequest } from '../utils/restfulAPI';
import serverSettings from '../utils/serverSettings';
 
export async function getFoundPlaces(matchString, selectedType, selectedCountries, matchNum = 5){
    let response = null;
    let foundPlaces = undefined;
    response = await getFindResponse(matchString, selectedType, selectedCountries, matchNum);
 
    if(response != null){
        foundPlaces = response.places;
    }
    return foundPlaces;
}
 
export async function getFindResponse(matchString, selectedType, selectedCountries, matchNum){
    if(serverSettings.activeServerUrl == undefined){
        return "";
    }
 
    let request = getFindRequest(matchString, selectedType, selectedCountries, matchNum);
    
    const response = await sendAPIRequest(request, serverSettings.activeServerUrl);
    return response;
}
 
export function getFindRequest(matchString, selectedType, selectedCountries, matchNum){
    let request = {
        requestType: "find",
        match: matchString,
        type: selectedType,
        where: selectedCountries,
        limit: matchNum
    }
 
    return request;
}
