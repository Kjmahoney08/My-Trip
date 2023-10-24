package com.tco.requests;

public class QueryParams {
    public String match;
    public String[] type;
    public String[] where;
    public Integer limit;

    public QueryParams(String match, String[] type, String[] where, Integer limit) {
        this.match = match;
        this.type = type;
        this.where = where;
        this.limit = limit;
    }
}
