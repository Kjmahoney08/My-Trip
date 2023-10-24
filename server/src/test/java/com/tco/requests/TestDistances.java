package com.tco.requests;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class TestDistances {
    
    @Test
    @DisplayName("kjm43: testing no distances")
    public void  testNoDistances() {
        Distances distances = new Distances();
        assertEquals(0, distances.size());
        assertEquals(0L, distances.total());
    }

    @Test
    @DisplayName("kjm43: testing one distance")
    public void testOneDistances() {
        Distances distances = new Distances();
        distances.add(100L);
        assertEquals(1, distances.size());
        assertEquals(100L, distances.total());
    }

    @Test
    @DisplayName("kjm43: testing multiple distances")
    public void testMultipleDistances() {
        Distances distances = new Distances();
        distances.add(100L);
        distances.add(500L);
        distances.add(5L);
        distances.add(25L);
        distances.add(1500L);
        distances.add(10000L);
        assertEquals(6, distances.size());
        assertEquals(12130L, distances.total()); 
    }
}
