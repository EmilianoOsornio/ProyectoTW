/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package paquete;

import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;


public class Acceso extends HttpServlet {

 @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        HttpSession session=request.getSession();
        String type=(String)session.getAttribute("type");

        List respuesta=new ArrayList();
        String JSONresponse;
        
        if(session.getAttribute("loggedIn")!=null && (boolean)session.getAttribute("loggedIn")) {
            respuesta.add("loggedIn");
            respuesta.add(type);
            JSONresponse = new Gson().toJson(respuesta);      
            out.write(JSONresponse);
            out.flush();
        }
        else {
            respuesta.add(null);
            respuesta.add(null);
            JSONresponse = new Gson().toJson(respuesta);      
            out.write(JSONresponse);
            out.flush();
        }        
    }
}