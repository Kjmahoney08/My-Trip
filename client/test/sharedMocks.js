import { Place } from "../src/models/place.model";
export const VALID_CONFIG_RESPONSE = JSON.stringify({
    requestType: 'config',
    serverName: 't99',
    features: ['config']
});

export const INVALID_REQUEST = JSON.stringify({
    invalid: 'this is an invalid response to fail the schema'
});

export const MOCK_PLACES = [
    new Place({ name: 'Place A', latitude: "40.0", longitude: "-20.0" }),
    new Place({ name: 'Place B', latitude: "-20.0", longitude: "50.0" }),
    new Place({ name: '123 Test', city: 'expanded test', latitude: "50.0", longitude: "60.0"}),
    new Place({lat: '27.0', lng: '100.0', road: 'Main St'}),
    new Place({lat: '80', lng: '-80', suburb: 'Test Suburb', name: 'Test Place'}),
    new Place({house_number: '123', road: 'Main St', suburb: 'Test Suburb', lat: '5.0', lng: '-40.0'}),
    new Place({latitude: "0.0", longitude: "0.0", postcode: '12345'}),
    new Place({lat: '50', lng: '50', road: 'Main St', country: 'Test Country'})
];

export const MOCK_DISTANCES = [6114, 4875, 2635, 5044, 5347, 2782, 4532, 3361];

export const REVERSE_GEOCODE_RESPONSE = JSON.stringify({
    "place_id": 259127396,
    "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    "osm_type": "relation",
    "osm_id": 8539568,
    "lat": "40.57066025",
    "lng": "-105.08539645568865",
    "place_rank": 30,
    "category": "amenity",
    "type": "university",
    "importance": 0.4948531325947546,
    "addresstype": "amenity",
    "name": "Colorado State University",
    "display_name": "Colorado State University, South College Avenue, Fort Collins, Larimer County, Colorado, 80525-1725, United States",
    "address": {
        "amenity": "Colorado State University",
        "road": "South College Avenue",
        "city": "Fort Collins",
        "county": "Larimer County",
        "state": "Colorado",
        "postcode": "80525-1725",
        "country": "United States",
        "country_code": "us"
    },
    "boundingbox": [
        "40.5527786",
        "40.5789122",
        "-105.0972937",
        "-105.0721817"
    ]
});

export const MOCK_PLACE_RESPONSE = {
    country: "United States",
    defaultDisplayName: "Colorado State University",
    latitude: '40.57',
    longitude: '-105.085',
    name: 'Colorado State University',
    municipality: 'Fort Collins',
    postcode: "80525-1725",
    region: "Colorado",
    streetAddress: "South College Avenue",
};

export const MULTI_DISTANCES_RESPONSE = JSON.stringify({
    requestType: 'distances',
    earthRadius: 6371.0,
    places: MOCK_PLACES,
    distances: [6114, 4875, 2635, 5044, 5347, 2782, 4532, 3361]
});

export const FIND_DAVE_RESPONSE = JSON.stringify({
    "requestType": "find",
    "match": 'Dave\'s Airport',
    "limit": 1,
    "found": 1,
    "places": [{name:"Dave's Airport", 
    latitude: "40.0332984924", 
    longitude: "-105.124000549",
    id:"0CO1",
    altitude:"5170",
    municipality:"Louisville",
    type:"small_airport",
    region:"Colorado",
    country:"United States",
    url:"https://www.aopa.org/destinations/airports/0CO1/details"
    }]
});

export const FIND_DAVE_PLACES = [{name:"Dave's Airport", 
latitude: "40.0332984924", 
longitude: "-105.124000549",
id:"0CO1",
altitude:"5170",
municipality:"Louisville",
type:"small_airport",
region:"Colorado",
country:"United States",
url:"https://www.aopa.org/destinations/airports/0CO1/details"
}];

export const MOCK_SINGLE_PLACE = [
    new Place({name: 'Colorado State University', latitude: '40.57', longitude: '-105.085'}),
];

export const SINGLE_DISTANCE_RESPONSE = {
    requestType: 'distances',
    earthRadius: 3959.0,
    places: [{name: 'Colorado State University', latitude: '40.57', longitude: '-105.085'}],
    distances: [0]
};
