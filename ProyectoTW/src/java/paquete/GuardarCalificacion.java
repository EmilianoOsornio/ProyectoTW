package paquete;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileWriter;
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
import org.jdom.output.Format;
import org.jdom.output.XMLOutputter;

public class GuardarCalificacion extends HttpServlet {
    
     @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        response.setContentType("application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        HttpSession session=request.getSession();
        String user=(String)session.getAttribute("name");
        String id=(String)session.getAttribute("id");
        String type=(String)session.getAttribute("type");
        ArrayList res = new ArrayList();
        ArrayList plotList = new ArrayList();
        ArrayList userData = new ArrayList();
        userData.add(user);
        userData.add(type);
        if(type!=null && type.equals("estudiante")) {
            ServletContext context= request.getServletContext();
            String path= context.getRealPath("/")+"grades.xml";

            SAXBuilder saxBuilder = new SAXBuilder();
            File inputFile = new File(path);

            try {

                    Document document = (Document) saxBuilder.build(inputFile);
                    Element rootElement = document.getRootElement();
                    List<Element> list = rootElement.getChildren("test");
                    for (int cont = 0; cont < list.size(); cont++) {
                        //gradeList.clear();
                        Element tests = list.get(cont);
                        ArrayList userInfo = new ArrayList();
                        if(tests.getAttributeValue("idest").equals(id)){
                            userInfo.add(tests.getAttributeValue("id"));
                            userInfo.add("Examen " + tests.getAttributeValue("id"));
                            userInfo.add(tests.getChildText("grade"));
                            plotList.add(userInfo);
                        }
                    }
                    res.add(userData);
                    res.add(plotList);
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
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {        
        PrintWriter out = response.getWriter();
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        HttpSession session=request.getSession();
        
        String estid=(String)session.getAttribute("id");
        
        String calif=String.valueOf(request.getParameter("ac"));
        
        List respuesta = new ArrayList();
        String JSONresponse;
        

       
       
        ServletContext context= request.getServletContext();
        String path= context.getRealPath("/")+"grades.xml";
        
        SAXBuilder saxBuilder = new SAXBuilder();
        File inputFile = new File(path);
        
        try {
                Document document = (Document) saxBuilder.build(inputFile);
                Element rootElement = document.getRootElement();
                
                
                // Creamos nuestras entradas
                Element test = new Element("test");
		Element grade = new Element("grade");
		

                //Atributos
                
                //Calculamos el id siguiente
                List<Element> list = rootElement.getChildren("test");
                test.setAttribute("id",""+(list.size()+1)+"");
                test.setAttribute("idest",estid);

                //Llenamos con los datos ingresados por el usuario
                
                grade.setText(calif);
                
                
                //Agregamos al nodo padre y raiz
                test.addContent(grade);
                rootElement.addContent(test);
                
                //Escribimos en el archivo
                XMLOutputter fmt = new XMLOutputter();
                FileWriter writer = new FileWriter(path);
                fmt.setFormat(Format.getPrettyFormat());
                fmt.output(document, writer);
                writer.flush();
                writer.close();
                
                
                respuesta.add("success");
                respuesta.add(calif);
                JSONresponse = new Gson().toJson(respuesta);      
                out.write(JSONresponse);
                out.flush();
        }catch(Exception ex) {
                ex.printStackTrace();
                respuesta.add("error");
                respuesta.add(estid);
                JSONresponse = new Gson().toJson(respuesta);      
                out.write(JSONresponse);
                out.flush();
        }        
    }
}
