<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 
<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.webUser.*" %> 
<%@page language="java" import="view.WebUserView" %> 
<%@page language="java" import="com.google.gson.*" %>

<%
        // getUserAlt.jsp

        StringData sd = new StringData();
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        System.out.println(email);
        System.out.println(password);
        
        if ((email == null) && (password == null)) {
            sd.errorMsg = "Cannot search for user: 'email' and 'password' most be supplied";
        }
        else if ((email == null) || (email.length()>45)) {
            sd.errorMsg = ValidationUtils.stringValidationMsg(email, 45, true);
        }
        else if((password == null) || (password.length()>45)){
            sd.errorMsg = ValidationUtils.stringValidationMsg(password, 45, true);
        }
        else {
            DbConn dbc = new DbConn();
            sd.errorMsg = dbc.getErr(); 
            if (sd.errorMsg.length() == 0) { 
                System.out.println("*** Ready to call logonFind");
                sd = DbMods.logonFind(dbc, email, password);  
                if(!sd.errorMsg.equals("Credentials Not Found.")){
                    session.setAttribute ("loggedOnUser", sd);
                }
            } else{
                //TODO: Logoff
                session.invalidate();
                sd = new StringData();
                sd.errorMsg = "Unable to login";
            }
            dbc.close(); 
        }
        Gson gson = new Gson();
        out.print(gson.toJson(sd).trim());
    %>   