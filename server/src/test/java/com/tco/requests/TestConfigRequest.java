package com.tco.requests;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertFalse;

public class TestConfigRequest {

    private ConfigRequest conf;

    @BeforeEach
    public void createConfigurationForTestCases() {
        conf = new ConfigRequest();
        conf.buildResponse();
    }

    @Test
    @DisplayName("base: Request type is \"config\"")
    public void testType() {
        String type = conf.getRequestType();
        assertEquals("config", type);
    }

    @Test
    @DisplayName("base: Features includes \"config\"")
    public void testFeaturesConfig(){
        assertTrue(conf.validFeature("config"));
    }

    @Test
    @DisplayName("nritter8: Features includes \"distances\"")
    public void testFeaturesDistances() {
        assertTrue(conf.validFeature("distances"));
    }

    @Test
    @DisplayName("nritter8: Features includes \"find\"")
    public void testFeaturesFind() {
        assertTrue(conf.validFeature("find"));
    }

    @Test
    @DisplayName("wittichd: Features include \"tour\" ")
    public void testFeaturesTour() {
        assertTrue(conf.validFeature("tour"));
    }

    @Test
    @DisplayName("base: Team name is correct")
    public void testServerName() {
        String name = conf.getServerName();
        assertEquals("t18 The Argon-auts", name);
    }

    @Test
    @DisplayName("nritter8: Features includes \"type\"")
    public void testFeaturesType() {
        assertTrue(conf.validFeature("type"));
    }

    @Test
    @DisplayName("nritter8: Features includes \"where\"")
    public void testFeaturesWhere() {
        assertTrue(conf.validFeature("where"));
    }

    @Test
    @DisplayName("nritter8: Response includes type array")
    public void testResponseType() {
        assertEquals(conf.getType().size(), 3);
    }

    @Test
    @DisplayName("nritter8: Response includes where array")
    public void testResponseWhere() {
        assertEquals(conf.getWhere().size(), 247);
    }
}