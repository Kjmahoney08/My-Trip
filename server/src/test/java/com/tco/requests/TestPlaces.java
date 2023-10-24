package com.tco.requests;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;


public class TestPlaces {
 
    @Test
    @DisplayName("wittichd: Testing pulling a place out of places.")
    public void testOneItem() {
        Place place = new Place("180.0", "90.0");
        Places places = new Places();
        places.add(place);
 
        Place test = places.get(0);
        assertEquals(3.141592653589793, test.latRadians());
        assertEquals(1.5707963267948966, test.lonRadians());
    }
 
    @Test
    @DisplayName("wittichd: Testing adding multiple places.")
    public void testThreeItems() {
        Place place1 = new Place("180.0", "90.0");
        Place place2 = new Place("270.0", "190.0");
        Place place3 = new Place("180.0", "150.0");
 
 
        Places places = new Places();
        places.add(place1);
        places.add(place2);
        places.add(place3);
 
        Place testPlace = places.get(2);
 
        assertEquals(testPlace.latRadians(), place3.latRadians());
    }
}
