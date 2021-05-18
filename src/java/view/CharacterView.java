package view;

// classes imported from java.sql.*
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import model.characters.*;

// classes in my project
import dbUtils.*;

public class CharacterView {

    public static StringDataList getAllCharacters(DbConn dbc) {

        // sdl will be an empty array and DbError with "" 
        StringDataList sdl = new StringDataList(); 
        
        // sd will have all of it's fields initialized to ""
        StringData sd = new StringData();
        
        try {
            String sql = "SELECT characters_id, characters_name, characters_img, characters_mainFaction, characters_buffBool, characters_factionNum, characters.web_user_id, user_email "
                    + "FROM characters, web_user WHERE characters.web_user_id = web_user.web_user_id "
                    + "ORDER BY characters_id ";  // you always want to order by something, not just random order.
            
            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            ResultSet results = stmt.executeQuery();

            while (results.next()) {
                
                sd = new StringData();
                
                // the formatUtils methods do not throw exceptions, but if they find illegal data, they write 
                // a message right in the field that they are trying to format.

                // plainInteger returns integer converted to string with no commas.
                sd.charactersId = FormatUtils.plainInteger(results.getObject("characters_id"));
                sd.charactersName = FormatUtils.formatString(results.getObject("characters_name"));
                sd.charactersImg = FormatUtils.formatString(results.getObject("characters_img"));
                sd.charactersMainFaction = FormatUtils.formatString(results.getObject("characters_mainFaction"));
                sd.charactersBuffBool = FormatUtils.plainInteger(results.getObject("characters_buffBool"));
                sd.charactersFactionNum = FormatUtils.plainInteger(results.getObject("characters_factionNum"));
                sd.webUserId = FormatUtils.plainInteger(results.getObject("web_user_id"));
                sd.userEmail = FormatUtils.formatString(results.getObject("user_email"));
                sdl.add(sd);
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            sd.errorMsg = "Exception thrown in WebUserView.getAllUsers(): " + e.getMessage();
            sdl.add(sd);
        }
        return sdl;
    }
}