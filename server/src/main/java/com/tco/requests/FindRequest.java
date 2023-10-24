package com.tco.requests;

import com.tco.database.accessDb;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class FindRequest extends Request{

    private static final transient Logger log = LoggerFactory.getLogger(FindRequest.class);

    private String match;
    private Integer limit;
    private String[] type;
    private String[] where;
    private Integer found;
    private Places places;

    @Override
    public void buildResponse() {
      QueryParams queryParams = new QueryParams(match, type, where, limit);
      try {
        found = accessDb.getFoundCount(queryParams);
        places = accessDb.outputPlaces(queryParams);
        log.trace("buildResponse -> {}", this);
      } catch (Exception e) {
        System.err.println("Exception: " + e.getMessage());
      }
    }

    /* The following methods exist only for testing purposes and are not used
  during normal execution, including the constructor. */

  public FindRequest(String match, Integer limit) {
    this.requestType = "find";
    this.match = match;
    this.limit = limit;
  }

  public FindRequest(String match, Integer limit, String[] type) {
    this(match, limit);
    this.type = type;
  }

  public FindRequest(String match, String[] where, Integer limit) {
    this(match, limit);
    this.where = where;
  }

  public FindRequest(String match, Integer limit, String[] type, String[] where) {
    this(match, limit, type);
    this.where = where;
  }

  public String getMatch() {
    return this.match;
  }

  public Integer getLimit() {
    return this.limit;
  }

  public String[] getType() {
    return this.type;
  }

  public String[] getWhere() {
    return this.where;
  }

  public Integer getFound() {
    return this.found;
  }

  public Places getPlaces() {
    return this.places;
  }

}
