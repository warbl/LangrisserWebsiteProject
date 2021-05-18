/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package model.characters;

import dbUtils.DbConn;
import dbUtils.FormatUtils;
import dbUtils.PrepStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import dbUtils.ValidationUtils;

/**
 *
 * @author alexl
 */
public class DbMods {
       /*
    Returns a "StringData" object that is full of field level validation
    error messages (or it is full of all empty strings if inputData
    totally passed validation.  
     */
    public static StringData findById(DbConn dbc, String id) {
 
        // The find API needs to represent three cases: found web_user, not found, db error. 

        StringData sd = new StringData();
        try {
            String sql = "SELECT characters_id, characters_name, characters_img, characters_mainFaction, characters_buffBool, characters_factionNum, "
                    + "web_user.web_user_id, web_user.user_email "
                    + "FROM characters, web_user WHERE characters.web_user_id = web_user.web_user_id "
                    + "AND characters_id = ?";

            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);

            // Encode the id (that the user typed in) into the select statement, into the first (and only) ? 
            stmt.setString(1, id);

            ResultSet results = stmt.executeQuery();
            if (results.next()) { // id is unique, one or zero records expected in result set

                // plainInteger returns integer converted to string with no commas.
                sd.charactersId = FormatUtils.plainInteger(results.getObject("characters_id"));
                sd.charactersName = FormatUtils.formatString(results.getObject("characters_name"));
                sd.charactersImg = FormatUtils.formatString(results.getObject("characters_img"));
                sd.charactersMainFaction = FormatUtils.formatString(results.getObject("characters_mainFaction"));
                sd.charactersBuffBool = FormatUtils.plainInteger(results.getObject("characters_buffBool"));
                sd.charactersFactionNum = FormatUtils.plainInteger(results.getObject("characters_factionNum"));
                sd.webUserId = FormatUtils.plainInteger(results.getObject("web_user.web_user_id"));
                sd.userEmail = FormatUtils.formatString(results.getObject("web_user.user_email"));
                
            } else {
                sd.errorMsg = "Character Not Found.";
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            sd.errorMsg = "Exception thrown in DbMods.findById(): " + e.getMessage();
        }
        return sd;

    } // findById
    
    
    private static model.characters.StringData validate(model.characters.StringData inputData) {

        model.characters.StringData errorMsgs = new model.characters.StringData();

        /* Useful to copy field names from StringData as a reference
    public String charactersId = "";
    public String charactersName = "";
    public String charactersImg = "";
    public String charactersMainFaction = "";
    public String charactersBuffBool = "";
    public String charactersFactionNum = "";
    
    public String webUserId = "";
    public String userEmail = "";

    public String errorMsg = "";
         */
        // Validation
        errorMsgs.charactersName = ValidationUtils.stringValidationMsg(inputData.charactersName, 45, true);
        errorMsgs.charactersImg = ValidationUtils.stringValidationMsg(inputData.charactersImg, 45, false);
        errorMsgs.charactersMainFaction = ValidationUtils.stringValidationMsg(inputData.charactersMainFaction, 45, false);
        errorMsgs.charactersBuffBool = ValidationUtils.integerValidationMsg(inputData.charactersBuffBool, false);
        errorMsgs.charactersFactionNum = ValidationUtils.integerValidationMsg(inputData.charactersFactionNum, false);

        errorMsgs.webUserId = ValidationUtils.integerValidationMsg(inputData.webUserId, true);

        return errorMsgs;
    } // validate 

    public static StringData insert(StringData inputData, DbConn dbc) {

        StringData errorMsgs = new StringData();
        errorMsgs = validate(inputData);
        
        if (errorMsgs.getCharacterCount() > 0) {  // at least one field has an error, don't go any further.
            errorMsgs.errorMsg = "Please try again";
            return errorMsgs;

        } else { // all fields passed validation

            /*
                  String sql = "SELECT web_user_id, user_email, user_password, membership_fee, birthday, "+
                    "web_user.user_role_id, user_role_type "+
                    "FROM web_user, user_role where web_user.user_role_id = user_role.user_role_id " + 
                    "ORDER BY web_user_id ";
             */
            // Start preparing SQL statement
            String sql = "INSERT INTO characters (characters_name, characters_img, characters_mainFaction, characters_buffBool, characters_factionNum, web_user_id) "
                    + "values (?,?,?,?,?,?)";

            // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
            // Only difference is that Sally's class takes care of encoding null 
            // when necessary. And it also System.out.prints exception error messages.
            PrepStatement pStatement = new PrepStatement(dbc, sql);

            // Encode string values into the prepared statement (wrapper class).
            pStatement.setString(1, inputData.charactersName); // string type is simple
            pStatement.setString(2, inputData.charactersImg);
            pStatement.setString(3, inputData.charactersMainFaction);
            pStatement.setInt(4, ValidationUtils.integerConversion(inputData.charactersBuffBool));
            pStatement.setInt(5, ValidationUtils.integerConversion(inputData.charactersFactionNum));
            pStatement.setInt(6, ValidationUtils.integerConversion(inputData.webUserId));

            // here the SQL statement is actually executed
            int numRows = pStatement.executeUpdate();

            // This will return empty string if all went well, else all error messages.
            errorMsgs.errorMsg = pStatement.getErrorMsg();
            if (errorMsgs.errorMsg.length() == 0) {
                if (numRows == 1) {
                    errorMsgs.errorMsg = ""; // This means SUCCESS. Let the user interface decide how to tell this to the user.
                } else {
                    // probably never get here unless you forgot your WHERE clause and did a bulk sql update.
                    errorMsgs.errorMsg = numRows + " records were inserted when exactly 1 was expected.";
                }
            } else if (errorMsgs.errorMsg.contains("foreign key")) {
                errorMsgs.errorMsg = "Invalid Web User Id";
            } else if (errorMsgs.errorMsg.contains("Duplicate entry")) {
                errorMsgs.errorMsg = "A character with that name already exists";
            }

        } // customerId is not null and not empty string.
        return errorMsgs;
    } // insert
    
    public static model.characters.StringData update(model.characters.StringData inputData, DbConn dbc) {

        model.characters.StringData errorMsgs = new model.characters.StringData();
        errorMsgs = validate(inputData);
        if (errorMsgs.getCharacterCount() > 0) {  // at least one field has an error, don't go any further.
            errorMsgs.errorMsg = "Please try again";
            return errorMsgs;

        } else { // all fields passed validation

            /*
                String sql = "SELECT web_user_id, user_email, user_password, membership_fee, birthday, "+
                    "web_user.user_role_id, user_role_type "+
                    "FROM web_user, user_role where web_user.user_role_id = user_role.user_role_id " + 
                    "ORDER BY web_user_id ";
             */
            String sql = "UPDATE characters SET characters_name=?, characters_img=?, characters_mainFaction= ?, characters_buffBool=?, characters_factionNum=?, "
                    + "web_user_id=? WHERE characters_id = ?";

            // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
            // Only difference is that Sally's class takes care of encoding null 
            // when necessary. And it also System.out.prints exception error messages.
            PrepStatement pStatement = new PrepStatement(dbc, sql);

            
            pStatement.setString(1, inputData.charactersName); // string type is simple
            pStatement.setString(2, inputData.charactersImg);
            pStatement.setString(3, inputData.charactersMainFaction);
            pStatement.setInt(4, ValidationUtils.integerConversion(inputData.charactersBuffBool));
            pStatement.setInt(5, ValidationUtils.integerConversion(inputData.charactersFactionNum));
            pStatement.setInt(6, ValidationUtils.integerConversion(inputData.webUserId));
            pStatement.setInt(7,ValidationUtils.integerConversion(inputData.charactersId));

            // here the SQL statement is actually executed
            int numRows = pStatement.executeUpdate();

            // This will return empty string if all went well, else all error messages.
            errorMsgs.errorMsg = pStatement.getErrorMsg();
            if (errorMsgs.errorMsg.length() == 0) {
                if (numRows == 1) {
                    errorMsgs.errorMsg = ""; // This means SUCCESS. Let the user interface decide how to tell this to the user.
                } else {
                    // probably never get here unless you forgot your WHERE clause and did a bulk sql update.
                    errorMsgs.errorMsg = numRows + " records were updated (expected to update one record).";
                }
            } else if (errorMsgs.errorMsg.contains("foreign key")) {
                errorMsgs.errorMsg = "Invalid User Role Id";
            } else if (errorMsgs.errorMsg.contains("Duplicate entry")) {
                errorMsgs.errorMsg = "That email address is already taken";
            }

        } // customerId is not null and not empty string.
        return errorMsgs;
    } // update
    
    public static String delete(String charId, DbConn dbc) {

        if (charId == null) {
            return "Error in model.characters.DbMods.delete: cannot delete web_user record because 'charId' is null";
        }

        // This method assumes that the calling Web API (JSP page) has already confirmed 
        // that the database connection is OK. BUT if not, some reasonable exception should 
        // be thrown by the DB and passed back anyway... 
        String result = ""; // empty string result means the delete worked fine.
        try {

            String sql = "DELETE FROM characters WHERE characters_id = ?";

            // This line compiles the SQL statement (checking for syntax errors against your DB).
            PreparedStatement pStatement = dbc.getConn().prepareStatement(sql);

            // Encode user data into the prepared statement.
            pStatement.setString(1, charId);

            int numRowsDeleted = pStatement.executeUpdate();

            if (numRowsDeleted == 0) {
                result = "Record not deleted - there was no record with characters_id " + charId;
            } else if (numRowsDeleted > 1) {
                result = "Programmer Error: > 1 record deleted. Did you forget the WHERE clause?";
            }

        } catch (Exception e) {
            result = "Exception thrown in model.characters.DbMods.delete(): " + e.getMessage();
        }

        return result;
    }
}
