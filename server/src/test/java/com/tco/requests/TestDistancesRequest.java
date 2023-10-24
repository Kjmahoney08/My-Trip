package com.tco.requests;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class TestDistancesRequest {

    DistancesRequest request;
    Places places;
    Distances distances;

    final static double EARTH_RADIUS_KILOMETERS = 6371.0;
    final static double EARTH_RADIUS_MILES = 3959.0;
    final static double EARTH_RADIUS_NAUTICAL_MILES = 3440.0;

    final static long bigRadius = 1000000;
    final static long bigPi = Math.round(Math.PI * bigRadius);
    final static long bigPiHalf = Math.round(Math.PI / 2.0 * bigRadius);

    @BeforeEach
    public void beforeEach() {
        places = new Places();
        request = new DistancesRequest(bigRadius, places);
    }

    @Test
    @DisplayName("shank007: empty places")
    public void testEmptyPlaces() {
        request.buildResponse();
        distances = request.distances();
        assertEquals(0, distances.size());
        assertEquals(0L, distances.total());
        assertEquals(0,request.places().size());
        assertEquals(bigRadius, request.radiusOfEarth());
    }

    @Test
    @DisplayName("nritter8: Having a request with one place should return a distances list with one entry")
    public void testBuildDistanceListOnePlace() {
        places.add(new Place("0.0", "0.0"));
        DistancesRequest requestOnePlace = new DistancesRequest(EARTH_RADIUS_KILOMETERS, places);
        requestOnePlace.buildResponse();
        assertEquals(1, requestOnePlace.distances().size());
    }

    @Test
    @DisplayName("grantcs: Request with five places, should return a distance list with five")
    public void testBuildDistanceListFivePlaces(){
        Places places = new Places();
        places.add(new Place("45.12","-113.89"));
        places.add(new Place("38.96","-119.95"));
        places.add(new Place("37.86","-25.76"));
        places.add(new Place("29.90", "-81.31"));
        places.add(new Place("69.22", "-51.11"));

        DistancesRequest request = new DistancesRequest(EARTH_RADIUS_KILOMETERS, places);
        request.buildResponse();

        assertEquals(5, request.distances().size());
        assertEquals(848, request.distances().get(0));
        assertEquals(7790, request.distances().get(1));
        assertEquals(5129, request.distances().get(2));
        assertEquals(4777, request.distances().get(3));
        assertEquals(4338, request.distances().get(4));
    }

    @Test
    @DisplayName("wittichd: Having a request with four places, should return a distance list with four")
    public void testBuildDistanceListFourPlaces(){
        Places places = new Places();
        places.add(new Place("90.0","0"));
        places.add(new Place("-90.0","0"));
        places.add(new Place("0","0"));
        places.add(new Place("38.90", "-77.04"));

        DistancesRequest request = new DistancesRequest(1.0, places);
        request.buildResponse();

        assertEquals(4, request.distances().size());
        assertEquals(3, request.distances().get(0));
        assertEquals(2, request.distances().get(1));
        assertEquals(1, request.distances().get(2));
        assertEquals(1, request.distances().get(3));
    }
  
    @Test
    @DisplayName("wittichd: Having a request with four places, testing calculator")
    public void testCircleCalculation1(){
        Places places = new Places();
        places.add(new Place("33.48", "-86.79"));
        places.add(new Place("39.38", "-104.86"));
        places.add(new Place("33.66", "-118.00"));
        places.add(new Place("40.57", "-105.08"));

        DistancesRequest request = new DistancesRequest(10000, places);
        request.buildResponse();

        assertEquals(4, request.distances().size());
        assertEquals(2732, request.distances().get(0));
        assertEquals(2093, request.distances().get(1));
        assertEquals(2162, request.distances().get(2));
        assertEquals(2826, request.distances().get(3));

    }
  
    @DisplayName("kjm43: Testing a request wiht three places, should return a distance with three")
    public void testBuildDistanceListThreePlaces() {
        Places places = new Places();
        places.add(new Place("0.0", "0.0"));
        places.add(new Place("90.0", "-135.0"));
        places.add(new Place("-90.0", "45.0"));

        DistancesRequest request = new DistancesRequest(EARTH_RADIUS_KILOMETERS, places);
        request.buildResponse();

        assertEquals(3, request.distances().size());
        assertEquals(10007, request.distances().get(0));
        assertEquals(20015, request.distances().get(1));
        assertEquals(10007, request.distances().get(2));
    }
    
    @Test
    @DisplayName("grantcs: Test request type is \"distances\"")
    public void testReqType() {
        String type = request.getRequestType();
        assertEquals("distances",type);
    }

    @Test
    @DisplayName("grantcs: Request with six places, should return a distance list with six")
    public void testBuildDistanceListSixPlaces(){
        Places places = new Places();
        places.add(new Place("51.5","45.0"));
        places.add(new Place("51.5","-0.14"));
        places.add(new Place("51.5","-0.15"));
        places.add(new Place("29.90", "-81.31"));
        places.add(new Place("69.22", "-51.11"));
        places.add(new Place("33.66", "-118.00"));

        DistancesRequest request = new DistancesRequest(EARTH_RADIUS_KILOMETERS, places);
        request.buildResponse();

        assertEquals(6, request.distances().size());
        assertEquals(3074, request.distances().get(0));
        assertEquals(1, request.distances().get(1));
        assertEquals(6868, request.distances().get(2));
        assertEquals(4777, request.distances().get(3));
        assertEquals(5632, request.distances().get(4));
        assertEquals(10401, request.distances().get(5));
    }

    @Test
    @DisplayName("grantcs: Request with seven places, should return a distance list with seven")
    public void testBuildDistanceListSevenPlaces(){
        Places places = new Places();
        places.add(new Place("45.12","-113.89"));
        places.add(new Place("90.0","0"));
        places.add(new Place("33.48", "-86.79"));
        places.add(new Place("29.90", "-81.31"));
        places.add(new Place("69.22", "-51.11"));
        places.add(new Place("90.0", "-135.0"));
        places.add(new Place("35.76", "-82.26"));

        DistancesRequest request = new DistancesRequest(EARTH_RADIUS_KILOMETERS, places);
        request.buildResponse();

        assertEquals(7, request.distances().size());
        assertEquals(4990, request.distances().get(0));
        assertEquals(6285, request.distances().get(1));
        assertEquals(653, request.distances().get(2));
        assertEquals(4777, request.distances().get(3));
        assertEquals(2311, request.distances().get(4));
        assertEquals(6031, request.distances().get(5));
        assertEquals(2850, request.distances().get(6));
    }
}
