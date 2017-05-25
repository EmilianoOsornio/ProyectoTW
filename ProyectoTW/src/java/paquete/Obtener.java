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
 * @author alumno
 */
public class Obtener extends HttpServlet {


    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        ServletContext context= request.getServletContext();
        String path= context.getRealPath("/")+"users.xml";
        HttpSession session = request.getSession();
        int id = Integer.parseInt((String)session.getAttribute("id"));

            SAXBuilder saxBuilder = new SAXBuilder();
            File inputFile = new File(path);

            try {
                Document document = (Document) saxBuilder.build(inputFile);
                Element rootElement = document.getRootElement();
                ArrayList respuesta = new ArrayList();

                List<Element> list = rootElement.getChildren("user");
                Element user = list.get(id-1);
                
                respuesta.add(user.getAttributeValue("id"));
                respuesta.add(user.getChildText("name"));
                respuesta.add(user.getChildText("mail"));
                respuesta.add(user.getChildText("type"));
                
                String JSONresponse = new Gson().toJson(respuesta);                
                
                out.write(JSONresponse);
                out.flush();

                }catch(Exception ex) {
                    ex.printStackTrace();	
                }

    }



}
