package com.tco.requests;

import com.tco.misc.GreatCircleDistance;

import java.util.List;
import java.util.ArrayList;
import java.util.HashMap;

import org.javatuples.Pair;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DistancesRequest extends Request {

    private static final transient Logger log = LoggerFactory.getLogger(DistancesRequest.class);

    private Double earthRadius;
    private Places places;
    private Distances distances;

    @Override
    public void buildResponse() {
        distances = buildDistanceList();
        log.trace("buildResponse -> {}", this);
    }


    public Distances buildDistanceList() {
        Distances distanceList = new Distances();
        Long distance = 0L;
        //TODO
        if (places.size() == 0) {}
        if (places.size() == 1) {
            distanceList.add(0L);
        }
        else {
            distanceList = fillDistanceList();
        }
        return distanceList;
    }

    private Distances fillDistanceList() {
        long distance = 0;
        Distances distanceList = new Distances();
        Place place1, place2;
        Pair<Place, Place> pairOfPlaces;

        for (int i = 0; i < places.size(); i++) {
            place1 = places.get(i);
            if (i == places.size() - 1) { // return leg
                place2 = places.get(0);
            }
            else {
                place2 = places.get(i+1);
            }
            pairOfPlaces = Pair.with(place1, place2);
            distance = GreatCircleDistance.calculateDistance(pairOfPlaces, earthRadius.doubleValue());
            distanceList.add(distance);
        }
        return distanceList;
    }

  /* The following methods exist only for testing purposes and are not used
  during normal execution, including the constructor. */

    public DistancesRequest(double earthRadius, Places places) {
        super();
        this.requestType = "distances";
        this.earthRadius = earthRadius;
        this.places = places;
    }

    public double radiusOfEarth() {
        return this.earthRadius;
    }

    public Places places() {
        return this.places;
    }

    public Distances distances() {
        return this.distances;
    }

}
