package com.tco.misc;

import com.tco.requests.Place;

import java.lang.Math;
import java.util.HashMap;

import org.javatuples.Pair;

public class GreatCircleDistance {
    private final static double MAX_LAT = 90.0;
    private final static double MIN_LAT = -90.0;
    private final static double MAX_LON = 180.0;
    private final static double MIN_LON = -180.0;

    private GreatCircleDistance() {}; // private constructor to prevent instantiation

    public static long calculateDistance(Pair<Place, Place> pairOfPlaces, double earthRadius) throws IllegalArgumentException {
        try {
            checkArguments(pairOfPlaces, earthRadius);
        }
        catch (Exception e) {
            throw e;
        }

        double centralAngle = calculateCentralAngle(pairOfPlaces);

        double distance = earthRadius * centralAngle;
        
        return Math.round(distance);
        
    }

    private static void checkArguments(Pair<Place, Place> pairOfPlaces, double earthRadius) throws IllegalArgumentException {
        if (earthRadius <= 0) {
            throw new IllegalArgumentException("The radius of the Earth must be greater than zero.");
        }
        try {
            checkCoordinateRange(pairOfPlaces);
        }
        catch (Exception e) {
            throw e;
        }
    }

    private static void checkCoordinateRange(Pair<Place, Place> pairOfPlaces) throws IllegalArgumentException {
        Place place1 = pairOfPlaces.getValue0(); Place place2 = pairOfPlaces.getValue1();

        if (place1.latRadians() > MAX_LAT || place1.latRadians() < MIN_LAT || place2.latRadians() > MAX_LAT || place2.latRadians() < MIN_LAT) {
            throw new IllegalArgumentException("Latitude must be between -90 and 90 (-pi/2 and pi/2 radians).");
        }
        if (place1.lonRadians() > MAX_LON || place1.lonRadians() < MIN_LON || place2.lonRadians() > MAX_LON || place2.lonRadians() < MIN_LON) {
            throw new IllegalArgumentException("Longitude must be between -180 and 180 (-pi and pi radians).");
        }
    }

    private static double calculateCentralAngle(Pair<Place, Place> pairOfPlaces) {
        double radianLatitude1 = pairOfPlaces.getValue0().latRadians();
        double radianLatitude2 = pairOfPlaces.getValue1().latRadians();
        double radianLongitudeDiff = pairOfPlaces.getValue1().lonRadians() - pairOfPlaces.getValue0().lonRadians();
        double numerator1 = (Math.cos(radianLatitude2) * Math.sin(radianLongitudeDiff));
        double numerator2 = (Math.cos(radianLatitude1) * Math.sin(radianLatitude2) - Math.sin(radianLatitude1) * Math.cos(radianLatitude2) * Math.cos(radianLongitudeDiff));
        double y = Math.sqrt((numerator1 * numerator1) + (numerator2 * numerator2));
        double x = (Math.sin(radianLatitude1) * Math.sin(radianLatitude2)) + (Math.cos(radianLatitude1) * Math.cos(radianLatitude2) * Math.cos(radianLongitudeDiff));

        double centralAngle = Math.atan2(y, x);

        return centralAngle;
    }
}
