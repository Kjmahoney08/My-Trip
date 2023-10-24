package com.tco.misc;

import com.tco.requests.Place;

import java.util.HashMap;

import org.javatuples.Pair;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.*;

public class TestGreatCircleDistance {
    final static double EARTH_RADIUS_KILOMETERS = 6371.0;
    final static double EARTH_RADIUS_MILES = 3959.0;
    final static double EARTH_RADIUS_NAUTICAL_MILES = 3440.0;
    final static double EARTH_RADIUS_CUSTOM_NRITTER8 = 37952.0;

    private void test(Place place1, Place place2, double earthRadius, int expectedDistance, boolean valid) {
        long distance = -1;

        Pair<Place,Place> pairOfPlaces = Pair.with(place1, place2);

        try {
            distance = GreatCircleDistance.calculateDistance(pairOfPlaces, earthRadius);
        }
        catch (Exception e) {
            assertFalse(valid);
        }

        if (distance == expectedDistance) {
            assertTrue(valid);
        }
        else {
            assertFalse(valid);
        }
    }

    @Test
    @DisplayName("nritter8: Initial test for fixed return value of 0")
    public void testFixedReturn() {
        Place place1 = new Place("0.0", "0.0");
        Place place2 = new Place("0.0", "0.0");

        test(place1, place2, EARTH_RADIUS_KILOMETERS, 0, true);
    }

    @Test
    @DisplayName("nritter8: The Earth radius being less than or equal to 0 should throw an exception")
    public void testEarthRadiusTooSmall() {
        Place place1 = new Place("0.0", "0.0");
        Place place2 = new Place("0.0", "0.0");

        test(place1, place2, 0, 0, false);
    }

    @Test
    @DisplayName("nritter8: The first latitude being greater than 90 should throw an exception")
    public void testLatitude1TooLarge() {
        Place place1 = new Place("91.0", "0.0");
        Place place2 = new Place("0.0", "0.0");

        test(place1, place2, EARTH_RADIUS_KILOMETERS, 0, false);
    }

    @Test
    @DisplayName("nritter8: The first latitude being less than -90 should throw an exception")
    public void testLatitude1TooSmall() {
        Place place1 = new Place("-91.0", "0.0");
        Place place2 = new Place("0.0", "0.0");

        test(place1, place2, EARTH_RADIUS_KILOMETERS, 0, false);
    }

    @Test
    @DisplayName("nritter8: The second latitude being greater than 90 should throw an exception")
    public void testLatitude2TooLarge() {
        Place place1 = new Place("0.0", "0.0");
        Place place2 = new Place("91.0", "0.0");

        test(place1, place2, EARTH_RADIUS_KILOMETERS, 0, false);
    }

    @Test
    @DisplayName("nritter8: The second latitude being less than -90 should throw an exception")
    public void testLatitude2TooSmall() {
        Place place1 = new Place("0.0", "0.0");
        Place place2 = new Place("-91.0", "0.0");

        test(place1, place2, EARTH_RADIUS_KILOMETERS, 0, false);
    }

    @Test
    @DisplayName("nritter8: The first longitude being greater than 180 should throw an exception")
    public void testLongitude1TooLarge() {
        Place place1 = new Place("0.0", "181.0");
        Place place2 = new Place("0.0", "0.0");

        test(place1, place2, EARTH_RADIUS_KILOMETERS, 0, false);
    }

    @Test
    @DisplayName("nritter8: The first longitude being less than -180 should throw an exception")
    public void testLongitude1TooSmall() {
        Place place1 = new Place("0.0", "-181.0");
        Place place2 = new Place("0.0", "0.0");

        test(place1, place2, EARTH_RADIUS_KILOMETERS, 0, false);
    }

    @Test
    @DisplayName("nritter8: The second longitude being greater than 180 should throw an exception")
    public void testLongitude2TooLarge() {
        Place place1 = new Place("0.0", "0.0");
        Place place2 = new Place("0.0", "181.0");

        test(place1, place2, EARTH_RADIUS_KILOMETERS, 0, false);
    }

    @Test
    @DisplayName("nritter8: The second longitude being less than -180 should throw an exception")
    public void testLongitude2TooSmall() {
        Place place1 = new Place("0.0", "0.0");
        Place place2 = new Place("0.0", "-181.0");

        test(place1, place2, EARTH_RADIUS_KILOMETERS, 0, false);
    }

    @Test
    @DisplayName("nritter8: Distance in kilometers from north pole to south pole should be 20015")
    public void testPoleDistanceKilometer() {
        Place place1 = new Place("-90.0", "0.0");
        Place place2 = new Place("90.0", "0.0");

        test(place1, place2, EARTH_RADIUS_KILOMETERS, 20015, true);
    }

    @Test
    @DisplayName("nritter8: Distance in custom units from Copper Kettle Brewing Company to South African Breweries in student/test/nritter8.json should be 92978")
    public void testNritter8Distance1() {
        Place place1 = new Place("39.692761", "-104.891285");
        Place place2 = new Place("-33.83783", "25.54191");

        test(place1, place2, EARTH_RADIUS_CUSTOM_NRITTER8, 92978, true);
    }

    @Test
    @DisplayName("nritter8: Distance in custom units from South African Breweries to Beerhouse & Craft Kitchen in student/test/nritter8.json should be 58631")
    public void testNritter8Distance2() {
        Place place1 = new Place("-33.83783", "25.54191");
        Place place2 = new Place("54.6780379", "25.2849308");

        test(place1, place2, EARTH_RADIUS_CUSTOM_NRITTER8, 58632, true);
    }

    @Test
    @DisplayName("nritter8: Distance in custom units from Beerhouse & Craft Kitchen to Arctic Circle 1 in student/test/nritter8.json should be 23792")
    public void testNritter8Distance3() {
        Place place1 = new Place("54.6780379", "25.2849308");
        Place place2 = new Place("89.337852", "179.551973");

        test(place1, place2, EARTH_RADIUS_CUSTOM_NRITTER8, 23793, true);
    }

    @Test
    @DisplayName("nritter8: Distance in custom units from Arctic Circle 1 to Arctic Circle 2 in student/test/nritter8.json should be 773")
    public void testNritter8Distance4() {
        Place place1 = new Place("89.337852", "179.551973");
        Place place2 = new Place("88.170039", "-178.579638");

        test(place1, place2, EARTH_RADIUS_CUSTOM_NRITTER8, 774, true);
    }

    @Test
    @DisplayName("nritter8: Distance in custom units from Arctic Circle 2 to Arctic Circle 3 in student/test/nritter8.json should be 2541")
    public void testNritter8Distance5() {
        Place place1 = new Place("88.170039", "-178.579638");
        Place place2 = new Place("87.993578", "1.023589");

        test(place1, place2, EARTH_RADIUS_CUSTOM_NRITTER8, 2541, true);
    }

    @Test
    @DisplayName("nritter8: Distance in custom units from Arctic Circle 3 to North Pole in student/test/nritter8.json should be 1329")
    public void testNritter8Distance6() {
        Place place1 = new Place("87.993578", "1.023589");
        Place place2 = new Place("90.0", "-0.0");

        test(place1, place2, EARTH_RADIUS_CUSTOM_NRITTER8, 1329, true);
    }

    @Test
    @DisplayName("nritter8: Distance in custom units from North Pole to South Pole in student/test/nritter8.json should be 119229")
    public void testNritter8Distance7() {
        Place place1 = new Place("90.0", "-0.0");
        Place place2 = new Place("-90.0", "0.0");

        test(place1, place2, EARTH_RADIUS_CUSTOM_NRITTER8, 119230, true);
    }

    @Test
    @DisplayName("nritter8: Distance in custom units from South Pole to Raya Brewing in student/test/nritter8.json should be 68077")
    public void testNritter8Distance8() {
        Place place1 = new Place("-90.0", "0.0");
        Place place2 = new Place("12.7761365", "39.5303249");

        test(place1, place2, EARTH_RADIUS_CUSTOM_NRITTER8, 68078, true);
    }

    @Test
    @DisplayName("nritter8: Distance in custom units from Raya Brewing to Opposite Raya in student/test/nritter8.json should be 54606")
    public void testNritter8Distance9() {
        Place place1 = new Place("12.7761365", "39.5303249");
        Place place2 = new Place("-12.7761365", "-39.5303249");

        test(place1, place2, EARTH_RADIUS_CUSTOM_NRITTER8, 54606, true);
    }

    @Test
    @DisplayName("nritter8: Distance in custom units from Opposite Raya to Copper Kettle Brewing Company in student/test/nritter8.json should be 53069")
    public void testNritter8Distance10() {
        Place place1 = new Place("-12.7761365", "-39.5303249");
        Place place2 = new Place("39.692761", "-104.891285");

        test(place1, place2, EARTH_RADIUS_CUSTOM_NRITTER8, 53069, true);
    }

    @Test
    @DisplayName("kjm43: Test for latitude thrown errors.")
    public void testLatitudeError() {
        Place place1 = new Place("5213.92", "1.0");
        Place place2 = new Place("-5213.92", "1.0");

        Pair<Place,Place> pairOfPlaces = Pair.with(place1, place2);
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
                GreatCircleDistance.calculateDistance(pairOfPlaces, EARTH_RADIUS_MILES);
            });
        assertEquals("Latitude must be between -90 and 90 (-pi/2 and pi/2 radians).", exception.getMessage());
    }

    @Test
    @DisplayName("kjm43: Test for longitude thrown errors.")
    public void testLongitudeError() {
        Place place1 = new Place("1.0", "10370.5");
        Place place2 = new Place("1.0", "-10370.5");

        Pair<Place, Place> pairOfPlaces = Pair.with(place1, place2);
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
                GreatCircleDistance.calculateDistance(pairOfPlaces, EARTH_RADIUS_MILES);
            });
        assertEquals("Longitude must be between -180 and 180 (-pi and pi radians).", exception.getMessage());
    }
}
