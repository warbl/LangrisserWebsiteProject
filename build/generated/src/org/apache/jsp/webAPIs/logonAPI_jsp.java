package org.apache.jsp.webAPIs;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import dbUtils.*;
import model.webUser.*;
import view.WebUserView;
import com.google.gson.*;

public final class logonAPI_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static final JspFactory _jspxFactory = JspFactory.getDefaultFactory();

  private static java.util.List<String> _jspx_dependants;

  private org.glassfish.jsp.api.ResourceInjector _jspx_resourceInjector;

  public java.util.List<String> getDependants() {
    return _jspx_dependants;
  }

  public void _jspService(HttpServletRequest request, HttpServletResponse response)
        throws java.io.IOException, ServletException {

    PageContext pageContext = null;
    HttpSession session = null;
    ServletContext application = null;
    ServletConfig config = null;
    JspWriter out = null;
    Object page = this;
    JspWriter _jspx_out = null;
    PageContext _jspx_page_context = null;

    try {
      response.setContentType("application/json; charset=UTF-8");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;
      _jspx_resourceInjector = (org.glassfish.jsp.api.ResourceInjector) application.getAttribute("com.sun.appserv.jsp.resource.injector");

      out.write(" \n");
      out.write("\n");
      out.write(" \n");
      out.write(" \n");
      out.write("\n");
      out.write("\n");

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
    
      out.write("   ");
    } catch (Throwable t) {
      if (!(t instanceof SkipPageException)){
        out = _jspx_out;
        if (out != null && out.getBufferSize() != 0)
          out.clearBuffer();
        if (_jspx_page_context != null) _jspx_page_context.handlePageException(t);
        else throw new ServletException(t);
      }
    } finally {
      _jspxFactory.releasePageContext(_jspx_page_context);
    }
  }
}
