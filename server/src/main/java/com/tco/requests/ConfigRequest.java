package com.tco.requests;

import java.util.List;
import java.util.Arrays;
import java.util.ArrayList;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.tco.database.accessDb;

public class ConfigRequest extends Request {

    private static final transient Logger log = LoggerFactory.getLogger(ConfigRequest.class);

    private String serverName;
    private ArrayList<String> features;
    private ArrayList<String> type = new ArrayList<String>(Arrays.asList("airport", "balloonport", "heliport"));
    private ArrayList<String> where;

    @Override
    public void buildResponse() {
        serverName = "t18 The Argon-auts";
        features = new ArrayList<>();
        features.add("config");
        features.add("distances");
        features.add("find");
        features.add("tour");
        features.add("type");
        features.add("where");
        try {
            where = accessDb.getCountries();
        } catch (Exception e) {
            System.err.println("Exception: " + e.getMessage());
        }
        log.trace("buildResponse -> {}", this);
    }

  /* The following methods exist only for testing purposes and are not used
  during normal execution, including the constructor. */

    public ConfigRequest() {
        this.requestType = "config";
    }

    public String getServerName() {
        return serverName;
    }

    public boolean validFeature(String feature){
        return features.contains(feature);
    }

    public ArrayList<String> getType() {
        return type;
    }

    public ArrayList<String> getWhere() {
        return where;
    }
}
