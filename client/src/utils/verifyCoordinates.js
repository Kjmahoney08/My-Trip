import Coordinates from 'coordinate-parser';
import { reverseGeocode } from './reverseGeocode';
import { getFoundPlaces } from '../components/FindRequest';
import { Place } from '../models/place.model';

export default function checkSearchString(context) {
    if (context.coordString == '') {
        context.setFoundPlaces(undefined);
    }
    else {
        verifyCoordinates(context);
    }

}

async function verifyCoordinates(context) {
    const { coordString, setFoundPlaces, foundPlaces, selectedType, selectedCountries } = context;
        try {
            const latLngPlace = new Coordinates(coordString);
            const lat = latLngPlace.getLatitude();
            const lng = latLngPlace.getLongitude();
            if (isLatLngValid(lat,lng)) {
                const fullPlace = await reverseGeocode({ lat, lng });
                let foundPlacesList = [];
                foundPlacesList.push(fullPlace);
                setFoundPlaces(foundPlacesList);
            }
        } catch (error) {
            verifyStringQuery(coordString, setFoundPlaces, selectedType, selectedCountries);
        }
}


function isLatLngValid(lat,lng) {
    return (lat !== undefined && lng !== undefined);
}
 
 
async function verifyStringQuery(matchString, setFoundPlaces, selectedType, selectedCountries){
    let matchNum = 5;
    if(isSearchValid(matchString)){
        if(matchString=='#random#'){
            matchString='';
            matchNum = 1;
        }
        let returnedPlaces = await getFoundPlaces(matchString, selectedType, selectedCountries, matchNum);
        let foundPlacesList=[];
        if(returnedPlaces != undefined){
            returnedPlaces.forEach(place => foundPlacesList.push(new Place(place)));
        }
        setFoundPlaces(foundPlacesList);
    }
}

function isSearchValid(matchString) {
    return (matchString !== undefined && matchString.length >= 3);
}