/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package paquete;

import com.google.gson.Gson;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.jdom.Document;
import org.jdom.Element;
import org.jdom.input.SAXBuilder;

/**
 *
 * @author Yahir
 */
public class Login extends HttpServlet {

@Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        HttpSession session=request.getSession();
        if(session.getAttribute("loggedIn")!=null && (boolean)session.getAttribute("loggedIn")) {
            response.sendRedirect("Inicio");
        }
        else {
            response.sendRedirect("");
        }        
    }

 @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        PrintWriter out = response.getWriter();
        String user=String.valueOf(request.getParameter("usuario"));
        String pass=String.valueOf(request.getParameter("contra"));
        HttpSession session=request.getSession();  
        
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        List responseList = new ArrayList();
        
        boolean successLogin = false;
                
        ServletContext context=request.getServletContext();
        String path= context.getRealPath("/")+"users.xml";        
        SAXBuilder saxBuilder = new SAXBuilder();
        File inputFile = new File(path);      
        
        try {
                Document document = (Document) saxBuilder.build(inputFile);
                Element rootElement = document.getRootElement();              

                //Leemos el archivo XML
                List<Element> list = rootElement.getChildren("user");
                for (int cont = 0; cont < list.size(); cont++) {
                    Element users = list.get(cont);
                    if((user.equals(users.getChildText("name")) || user.equals(users.getChildText("mail"))) && pass.equals((String)users.getChildText("pass"))) {
                        System.out.println(user+":"+users.getChildText("name"));
                        System.out.println(pass+":"+users.getChildText("pass"));
                        successLogin = true;
                        session.setAttribute("name", users.getChildText("name"));
                        session.setAttribute("type", users.getChildText("type"));
                        session.setAttribute("id", users.getAttributeValue("id"));
                        session.setAttribute("loggedIn", true);
                        
                        responseList.add("success");
                        responseList.add(users.getChildText("type"));
                        String JSONresponse = new Gson().toJson(responseList);
                        
                        out.write(JSONresponse);
                        out.flush();
                        return;
                    }
                    else {
                        successLogin = false;
                    }
                }
                if(!successLogin) {
                    responseList.add("error");
                    responseList.add(null);
                    String JSONresponse = new Gson().toJson(responseList);
                    
                    out.write(JSONresponse);
                    out.flush();
                }
            }catch(Exception ex) {
                ex.printStackTrace();	
            }
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
