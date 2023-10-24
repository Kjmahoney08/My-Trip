package com.tco.misc;

import com.tco.requests.Place;
import com.tco.requests.Places;
import com.tco.misc.GreatCircleDistance;
import java.util.Arrays;
import java.util.Collections;
import org.javatuples.Pair;
import java.lang.*;
import java.util.List;
import java.util.ArrayList;
import java.util.HashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class NearestNeighbor {

  private static ArrayList<Integer> unvisitedCities;
  private static Long totalDistance;

  public static Places findBestNearestNeighbor(Places places, Long[][] distanceMatrix) {
    Places best = new Places();
    Long bestDistance = Long.parseLong("10000000000", 10);
    for(Place start: places) {
      Places current = createNearestNeighborTour(places, start, distanceMatrix);
      if(totalDistance < bestDistance){
        best = current;
        bestDistance = totalDistance;
      }
    }
     return places;
  }

  public static Places createNearestNeighborTour(Places places, Place start, Long[][] distanceMatrix){
    unvisitedCities = buildUnvisitedArray(places);
    Places tour = new Places();
    tour.add(start);
    unvisitedCities.remove(places.indexOf(start));
    Place next = start;
    while(unvisitedCities.size() != 0) {
      next = closest(unvisitedCities, places, next, distanceMatrix);
      tour.add(next);
      unvisitedCities.remove(places.indexOf(next));
    }
    return tour;
  }

  public static Place closest(ArrayList<Integer> unvisited, Places places, Place next, Long[][] distanceMatrix) {
    Place closest = new Place();
    long lowestDistance = distanceMatrix[places.indexOf(next)][0];
    if(distanceMatrix[places.indexOf(next)][places.indexOf(next) + 1] > 0){
      lowestDistance = distanceMatrix[places.indexOf(next)][places.indexOf(next) + 1];
    }
    for(int col = 0; col < places.size(); col++) {
      if(col != places.indexOf(next)) {
        if(distanceMatrix[places.indexOf(next)][col] < lowestDistance) {
          closest = places.get(col);
          totalDistance += distanceMatrix[places.indexOf(next)][col];
        }
      }
    }
    return closest;
  }
    
  public static ArrayList<Integer> buildUnvisitedArray(Places places) {
    ArrayList<Integer> array = new ArrayList<Integer>();
    for(int i = 0; i < places.size(); i++) {
      array.add(i);
    }
    return array;
  }
}


