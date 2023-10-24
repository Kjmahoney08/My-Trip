package com.tco.requests;

import static java.lang.Math.toRadians;
import static java.lang.Double.parseDouble;

import java.util.HashMap;
import com.tco.misc.GeographicCoordinate;

public class Place extends HashMap<String,String> implements GeographicCoordinate{
    
    //TESTING ONLY
    public Place(String lat, String lon) {
        this.put("latitude", lat);
        this.put("longitude", lon);
    }

    public Place() {}

    //implements of GeographicCoordinator

    public Double latRadians() {
        return toRadians(parseDouble(this.get("latitude")));
    }

    public Double lonRadians() {
        return toRadians(parseDouble(this.get("longitude")));
    }

}
