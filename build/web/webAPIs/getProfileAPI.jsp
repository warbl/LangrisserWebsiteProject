<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 
<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.webUser.*" %> 
<%@page language="java" import="view.WebUserView" %> 
<%@page language="java" import="com.google.gson.*" %>

<%
        if ( session.getAttribute("loggedOnUser") != null ) {
            StringData loggedOnWebUser = (StringData) session.getAttribute("loggedOnUser");
            Gson gson = new Gson();
            out.print(gson.toJson(loggedOnWebUser).trim());
        }
        
    %>   