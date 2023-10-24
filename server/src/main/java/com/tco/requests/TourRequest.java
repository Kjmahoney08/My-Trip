package com.tco.requests;

import com.tco.misc.GreatCircleDistance;
import com.tco.misc.NearestNeighbor;

import java.util.Arrays;
import org.javatuples.Pair;
import java.util.List;
import java.util.ArrayList;
import java.util.HashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class TourRequest extends Request{

  private static final transient Logger log = LoggerFactory.getLogger(TourRequest.class);

    private Double earthRadius;
    private Double responseTime;
    private Places places;

  @Override
  public void buildResponse() {
    places = buildNewTour();
    log.trace("buildResponse -> {}", this);
  }

  private Places buildNewTour() {
    return places;
  }

  public static Long[][] buildDistanceTable(Places places, Double earthRadius) {
    Long[][] distanceMatrix = new Long[places.size()][places.size()];
    Place place1, place2;
    Pair<Place, Place> pairOfPlaces;
    for(int row = 0; row < places.size(); row++) {
      for(int col = 0; col < places.size(); col++) {
        place1 = places.get(row);
        place2 = places.get(col);
        pairOfPlaces = Pair.with(place1, place2);
        distanceMatrix[row][col] = GreatCircleDistance.calculateDistance(pairOfPlaces, earthRadius);
      }
    }
    return distanceMatrix;
  }

      /* The following methods exist only for testing purposes and are not used
  during normal execution, including the constructor. */

  public TourRequest(Double earthRadius, Double responseTime, Places places) {
    this.requestType = "tour";
    this.earthRadius = earthRadius;
    this.responseTime = responseTime;
    this.places = places;
    }

  public Double getEarthRadius() {
    return this.earthRadius;
  }

  public Double getResponseTime() {
    return this.responseTime;
  }

  public Places getPlaces() {
    return this.places;
  }

  public void setPlaces(Places places){
    this.places = places;
  }
}

