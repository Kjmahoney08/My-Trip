package com.tco.requests;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestTypeAndWhereRequest {
   
    private FindRequest find;
    Integer found;
    Places places;

    @BeforeEach
    public void buildFindForTest() {
        String match = "";
        Integer limit = 0;
        String[] type = {"airport"};
        String[] where = {"Canada"};
        find = new FindRequest(match, limit, type, where);
        find.buildResponse();
    }

    @Test
    @DisplayName("kjm43: Testing Getter")
    public void testGetter(){
        assertEquals("airport", find.getType()[0]);
        assertEquals("Canada", find.getWhere()[0]);
    }
}
