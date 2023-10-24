import { useState } from 'react';
import { LOG } from '../utils/constants';
import { getDistancesResponse } from '../components/Trip/Itinerary/DistancesRequest'

export function useDistances(places, earthRadius) {
    const [distances, setDistances] = useState([]);

    const context = { places, setDistances, earthRadius };

    const distanceActions = {
        refresh: () => refreshDistances(context),
        clear: () => clear(context),
        setDistances
    };

    return {distances, distanceActions}
}

async function refreshDistances(context) {
    const { places, setDistances, earthRadius } = context;
    if(places.length > 1){
        let distanceList = await getDistancesResponse(places, earthRadius);
        setDistances(distanceList);
    }
}

function clear(context) {
    const { setDistances } = context;
    setDistances([]);
}
