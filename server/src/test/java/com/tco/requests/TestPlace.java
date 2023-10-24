package com.tco.requests;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class TestPlace {

    private Place place;
    
    @BeforeEach
    public void createPlaceForTests() {
        place = new Place();
    }

    @Test
    @DisplayName("kjm43: testing one lat and one lon")
    public void testNoInput() {
        place = new Place("180.0", "90.0");
        assertEquals(3.141592653589793, place.latRadians());
        assertEquals(1.5707963267948966, place.lonRadians());
    }
}
