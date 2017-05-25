package paquete;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.jdom.Document;
import org.jdom.Element;
import org.jdom.input.SAXBuilder;
import org.jdom.output.Format;
import org.jdom.output.XMLOutputter;

public class Admin extends HttpServlet {
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        response.setContentType("application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        HttpSession session=request.getSession();
        String user=(String)session.getAttribute("name");
        String type=(String)session.getAttribute("type");
        ArrayList res = new ArrayList();
        ArrayList userList = new ArrayList();
        ArrayList userData = new ArrayList();
        userData.add(user);
        userData.add(type);

        if(type!=null && type.equals("admin")) {
            ServletContext context= request.getServletContext();
            String path= context.getRealPath("/")+"users.xml";

            SAXBuilder saxBuilder = new SAXBuilder();
            File inputFile = new File(path);

            try {

                    Document document = (Document) saxBuilder.build(inputFile);
                    Element rootElement = document.getRootElement();

                    List<Element> list = rootElement.getChildren("user");
                    for (int cont = 0; cont < list.size(); cont++) {
                        Element users = list.get(cont);
                        ArrayList userInfo = new ArrayList();
                        userInfo.add(users.getAttributeValue("id"));
                        userInfo.add(users.getChildText("name"));
                        userInfo.add(users.getChildText("mail"));
                        userInfo.add(users.getChildText("type"));
                        userList.add(userInfo);
                    }
                    res.add(userData);
                    res.add(userList);
                    String JSONresponse = new Gson().toJson(res);
                    
                    out.write(JSONresponse);
                    out.flush();
                    
                }catch(Exception ex) {
                    ex.printStackTrace();	
                }
        }
        else {
            response.setContentType("text/html;charset=UTF-8");
            out.println("No tienes acceso");
        }
    }

}
