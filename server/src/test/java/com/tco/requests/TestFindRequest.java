package com.tco.requests;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

public class TestFindRequest {
    
    private FindRequest find;
    Integer found;
    Places places;

    @BeforeEach
    public void buildFindForTest() {
        String match = "";
        Integer limit = 0;
        find = new FindRequest(match, limit);
        find.buildResponse();
    }
    
    @Test
    @DisplayName("kjm43: empty match random places")
    public void testEmptyMatch() {
        String match = "";
        Integer limit = 1;
        FindRequest find1 = new FindRequest(match, limit);
        FindRequest find2 = new FindRequest(match, limit);
        find1.buildResponse();
        find2.buildResponse();
        Places places1 = find1.getPlaces();
        Integer found1 = find1.getFound();
        Places places2 = find2.getPlaces();
        assertEquals("", find1.getMatch());
        assertEquals(1, find1.getLimit());
        assertEquals(1, places1.size());
        assertEquals(50427, found1);
        assertNotEquals(places1.get(0), places2.get(0));
    }

    @Test
    @DisplayName("kjm43: Testing finding multiple places")
    public void testMultiplePlaces() {
        String match = "and";
        Integer limit = 10;
        find = new FindRequest(match, limit);
        find.buildResponse();
        places = find.getPlaces();
        found = find.getFound();
        assertEquals(10, places.size());
        assertEquals(7266, found);
    }

    @Test
    @DisplayName("kjm43: protocol test 2")
    public void testProtocolMatch() {
        String match = "ryp";
        Integer limit = 0;
        FindRequest find = new FindRequest(match, limit);
        find.buildResponse();
        Places places = find.getPlaces();
        Integer found = find.getFound();
        assertEquals(4, found);
        assertEquals(4, places.size());
        assertEquals(find.getLimit(), 0);
    }

    @Test
    @DisplayName("shank007: Test request type is \"find\"")
    public void testReqType() {
        String type = find.getRequestType();
        assertEquals("find",type);
    }

    @Test
    @DisplayName("shank007: Test after add municipality")
    public void TestAfterAddMunicipality() {
        String match = "por";
        Integer limit = 10;
        FindRequest find = new FindRequest(match, limit);
        find.buildResponse();
        Places places = find.getPlaces();
        Integer found = find.getFound();
        assertEquals(40193, found);
        assertEquals(10, places.size());
    }

    @Test
    @DisplayName("shank007: Test after add country")
    public void TestAfterAddCountry() {
        String match = "Brazil";
        Integer limit = 10000000;
        FindRequest find = new FindRequest(match, limit);
        find.buildResponse();
        Places places = find.getPlaces();
        Integer found = find.getFound();
        assertEquals(3971, found);
        assertEquals(3971, places.size());
    }

    @Test
    @DisplayName("shank007: Test after adding all queries")
    public void TestAfterAddAllQueries() {
        String match = "ter";
        Integer limit = 10;
        FindRequest find = new FindRequest(match, limit);
        find.buildResponse();
        Places places = find.getPlaces();
        Integer found = find.getFound();
        assertEquals(5049, found);
        assertEquals(10, places.size());
    }

    @Test
    @DisplayName("nritter8: Test request with single type")
    public void TestOneTypeQuery() {
        String match = "dave";
        Integer limit = 10;
        String[] type = {"heliport"};
        FindRequest find = new FindRequest(match, limit, type);
        find.buildResponse();
        Places places = find.getPlaces();
        Integer found = find.getFound();
        assertEquals(4, found);
        assertEquals(4, places.size());
    }

    @Test
    @DisplayName("nritter8: Test request with single where")
    public void TestOneWhereQuery() {
        String match = "dave";
        Integer limit = 10;
        String[] where = {"United States"};
        FindRequest find = new FindRequest(match, where, limit);
        find.buildResponse();
        Places places = find.getPlaces();
        Integer found = find.getFound();
        assertEquals(22, found);
        assertEquals(10, places.size());
    }

    @Test
    @DisplayName("nritter8: Test request with two types")
    public void TestTwoTypeQuery() {
        String match = "dave";
        Integer limit = 10;
        String[] type = {"heliport", "airport"};
        FindRequest find = new FindRequest(match, limit, type);
        find.buildResponse();
        Places places = find.getPlaces();
        Integer found = find.getFound();
        assertEquals(26, found);
        assertEquals(10, places.size());
    }

    @Test
    @DisplayName("nritter8: Test request with two wheres")
    public void TestTwoWhereQuery() {
        String match = "dave";
        Integer limit = 10;
        String[] where = {"United States", "Canada"};
        FindRequest find = new FindRequest(match, where, limit);
        find.buildResponse();
        Places places = find.getPlaces();
        Integer found = find.getFound();
        assertEquals(23, found);
        assertEquals(10, places.size());
    }

    @Test
    @DisplayName("nritter8: Test request with type and where")
    public void TestOneTypeAndWhereQuery() {
        String match = "dave";
        Integer limit = 10;
        String[] type = {"heliport"};
        String[] where = {"United States"};
        FindRequest find = new FindRequest(match, limit, type, where);
        find.buildResponse();
        Places places = find.getPlaces();
        Integer found = find.getFound();
        assertEquals(3, found);
        assertEquals(3, places.size());
    }

    @Test
    @DisplayName("shank007: Test request with two type and two where")
    public void TestTwoTypeAndTwoWhereQuery() {
        String match = "dave";
        Integer limit = 10;
        String[] type = {"heliport", "airport"};
        String[] where = {"United States", "Brazil"};
        FindRequest find = new FindRequest(match, limit, type, where);
        find.buildResponse();
        Places places = find.getPlaces();
        Integer found = find.getFound();
        assertEquals(21, found);
        assertEquals(10, places.size());
    }

    @Test
    @DisplayName("shank007: Test request with ALL types")
    public void TestAllTypes() {
        String match = "dave";
        Integer limit = 10;
        String[] type = {"heliport", "airport", "balloonport"};
        String[] where = {"United States", "Brazil"};
        FindRequest find = new FindRequest(match, limit, type, where);
        find.buildResponse();
        Places places = find.getPlaces();
        Integer found = find.getFound();
        assertEquals(21, found);
        assertEquals(10, places.size());

    }

    @Test
    @DisplayName("grantcs: Test request with only airport")
    public void TestAirport() {
        String match = "dave";
        Integer limit = 10;
        String[] type = {"airport"};
        String[] where = {"United States", "Brazil"};
        FindRequest find = new FindRequest(match, limit, type, where);
        find.buildResponse();
        Places places = find.getPlaces();
        Integer found = find.getFound();
        assertEquals(18, found);
        assertEquals(10, places.size());

    }

    @Test
    @DisplayName("grantcs: Test request with only balloon port")
    public void TestBalloonport() {
        String match = "dave";
        Integer limit = 10;
        String[] type = {"balloonport"};
        String[] where = {"United States", "Brazil"};
        FindRequest find = new FindRequest(match, limit, type, where);
        find.buildResponse();
        Places places = find.getPlaces();
        Integer found = find.getFound();
        assertEquals(0, found);
        assertEquals(0, places.size());

    }
    
    @Test
    @DisplayName("grantcs: Test request with ALL types and 3 where")
    public void TestAllTypesAnd3Where() {
        String match = "dave";
        Integer limit = 5;
        String[] type = {"heliport", "airport", "balloonport"};
        String[] where = {"United States", "Brazil", "Mexico"};
        FindRequest find = new FindRequest(match, limit, type, where);
        find.buildResponse();
        Places places = find.getPlaces();
        Integer found = find.getFound();
        assertEquals(21, found);
        assertEquals(5, places.size());

    }
}
