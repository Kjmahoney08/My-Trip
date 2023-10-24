package com.tco.requests;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.*;

public class TestTourRequest {

    private TourRequest request;
    private Places places;
    private Places tour;

    final static double EARTH_RADIUS_MILES = 3959.0;
    
    @BeforeEach
    public void beforeEach() {
        places = new Places();
        request = new TourRequest(EARTH_RADIUS_MILES, 1.0, places);
    }

    @Test
    @DisplayName("kjm43: testing getters.")
    public void testEmptyTour() {
         request.buildResponse();
         assertEquals(3959.0, request.getEarthRadius());
         assertEquals(1.0, request.getResponseTime());
         assertEquals(0, request.getPlaces().size());
    }

    @Test
    @DisplayName("kjm43: testing nearest neighbor with basic places") 
    public void basicTestNN() {
        Places places = new Places();
        places.add(new Place("40.58", "-105.13"));
        places.add(new Place("40.55", "-104.90"));
        places.add(new Place("40.54", "-105.09"));
        places.add(new Place("40.50", "-104.80"));

        TourRequest tourRequest = new TourRequest(EARTH_RADIUS_MILES, 1.0, places);
        tourRequest.buildResponse();

        //assertNotEquals(new Place("40.55", "-104.90"), tourRequest.getPlaces().get(1));   
    }

    @Test
    @DisplayName("grantcs: Test request type is \"tour\"")
    public void testReqType() {
        String type = request.getRequestType();
        assertEquals("tour",type);
    }
    
}
