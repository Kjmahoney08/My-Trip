package com.tco.database;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashMap;
import java.lang.Exception;
import com.tco.requests.Place;
import com.tco.requests.Places;
import com.tco.requests.QueryParams;


public class accessDb {
    private final static String TABLE = "world";

	private final static String DB_COLUMNS = 
		"world.id as id, world.name as name, world.municipality as municipality, " +
		"region.name as region, country.name as country, continent.name as continent, " +
		"world.type as type, world.latitude as latitude, world.longitude as longitude, world.altitude as altitude";
	private final static String RESULTS_COLUMNS = 
		"id,name,municipality,region,country,continent,type,latitude,longitude,altitude";

	private final static String JOIN_CONTINENT = " INNER JOIN continent ON world.continent = continent.id ";
	private final static String JOIN_COUNTRY = " INNER JOIN country ON world.iso_country = country.id ";
	private final static String JOIN_REGION = " INNER JOIN region ON world.iso_region = region.id ";
	private final static String JOIN_ALL = JOIN_CONTINENT + JOIN_COUNTRY + JOIN_REGION;

	private final static String ORDER = "continent.name, country.name, region.name, world.municipality, world.name ASC";

    public static Places outputPlaces(QueryParams queryParams) throws Exception{
        Places places = new Places();
        try {
            return Database.places(queryParams);
        }
        catch (Exception e) {
            throw e;
        }
        
    }

    public static Integer getFoundCount(QueryParams queryParams) throws Exception{
        try {
            return Database.found(queryParams);
        }
        catch (Exception e) {
            throw e;
        }
    }

    public static ArrayList<String> getCountries() throws Exception {
        try {
            return Database.countries();
        }
        catch (Exception e) {
            throw e;
        }
    }

    static class Database {
        static Integer found(QueryParams queryParams) throws Exception {
            String sql = Select.found(queryParams);
            try (
                // connect to the database and query
                Connection conn = DriverManager.getConnection(Credential.url(), Credential.USER, Credential.PASSWORD);
                Statement query = conn.createStatement();
                ResultSet results = query.executeQuery(sql)
            ) {
                return count(results);
            } catch (Exception e) {
                throw e;
            }
        }  
        
        private static Integer count(ResultSet results) throws Exception {
            if (results.next()) {
                return results.getInt("count");
            }
                throw new Exception("No count results in found query.");
        }

        static Places places(QueryParams queryParams) throws Exception {
            String sql      = Select.match(queryParams);
            String url      = Credential.url();
            String user     = Credential.USER;
            String password = Credential.PASSWORD;
            try (
                // connect to the database and query
                Connection conn    = DriverManager.getConnection(url, user, password);
                Statement  query   = conn.createStatement();
                ResultSet  results = query.executeQuery(sql)
            ) {
                return convertQueryResultsToPlaces(results, RESULTS_COLUMNS);
            } catch (Exception e) {
                throw e;
            }
        }

        private static Places convertQueryResultsToPlaces(ResultSet results, String columns) throws Exception {
			int count = 0;
			String[] cols = columns.split(",");
			Places places = new Places();
			while (results.next()) {
				Place place = new Place();
				for (String col: cols) {
					place.put(col, results.getString(col));
				}
				place.put("index", String.format("%d",++count));
				places.add(place);
			}
			return places;
		}

        static ArrayList<String> countries() throws Exception {
            String sql = Select.countries();
            ArrayList<String> countryList = new ArrayList<String>();
            try (
                // connect to the database and query
                Connection conn = DriverManager.getConnection(Credential.url(), Credential.USER, Credential.PASSWORD);
                Statement query = conn.createStatement();
                ResultSet results = query.executeQuery(sql)
            ) {
                while (results.next()) {
                    countryList.add(results.getString("name"));
                }
                return countryList;
            } catch (Exception e) {
                throw e;
            }

        }
    }

    static class Credential {
        // shared user with read-only access
        final static String USER = "cs314-db";
        final static String PASSWORD = "eiK5liet1uej";
        // connection information when using port forwarding from localhost
        //final static String URL = "jdbc:mariadb://127.0.0.1:56247/cs314";
        static String url() {
            String dburl = "";
            String useTunnel = System.getenv("CS314_USE_DATABASE_TUNNEL");
    // Note that if the variable isn't defined, System.getenv will return null
            if(useTunnel != null && useTunnel.equals("true")) {
            dburl = "jdbc:mariadb://127.0.0.1:56247/cs314";
        }
            else {
        dburl = "jdbc:mariadb://faure.cs.colostate.edu/cs314";
            }
            return dburl;
        }

    }

    static class Select {
        static String match(QueryParams queryParams) {
            int limit = queryParams.limit;
            String limitString = limit > 0 ? "LIMIT " + limit : "";
            String where;

            if (queryParams.match.length() == 0) {
                where = getRandWhere();
            }
            else {
                where = getWhereClause(queryParams);
            }

            return statement(where, "DISTINCT " + DB_COLUMNS, limitString);
        }

        static String found(QueryParams queryParams) {
            String where = getWhereClause(queryParams);
            return statement(where, "COUNT(*) AS count", "");
        }

        static String countries() {
            return "SELECT DISTINCT name FROM country;";
        }

        private static String getWhereClause(QueryParams queryParams) {
            String match = queryParams.match;
            String[] type = queryParams.type;
            String[] where = queryParams.where;
            String whereClause = " WHERE (world.name LIKE \"%" + match + "%\" "
                + " OR world.id LIKE \"%" + match + "%\" "
                + " OR world.municipality LIKE \"%" + match + "%\" "
                + " OR region.name LIKE  \"%" + match + "%\" " 
                + " OR country.name LIKE  \"%" + match + "%\") ";

            if (type != null && type.length > 0) {
                whereClause += addSection(type, "world.type");
            }
            if (where != null && where.length > 0) {
                whereClause += addSection(where, "country.name");
            }

            return whereClause;
        }

        private static String addSection(String[] matches, String column) {
            String whereClause = "AND (";
            for (int i = 0; i < matches.length; i++) {
                if (i > 0) {
                    whereClause += "OR ";
                }
                whereClause += column + " LIKE \"%" + matches[i] + "%\" ";
            }
            whereClause += ") ";

            return whereClause;
        }

        private static String getRandWhere() {
            return " WHERE world.index >= FLOOR("
                + "(SELECT MIN(world.index)) + RAND() * "
                + "(SELECT MAX(world.index))"
                + ") ";
        }

        static String statement(String where, String data, String limit) {
            return "SELECT "
                + data
                + " FROM " + TABLE
                + JOIN_ALL
                + where
                + limit
                + " ;";
        }
   
    }

}
