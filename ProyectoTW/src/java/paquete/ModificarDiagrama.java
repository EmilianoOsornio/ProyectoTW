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

public class ModificarDiagrama extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();  
        int id=Integer.parseInt(request.getParameter("id"));
  
        List respuesta = new ArrayList();
        ServletContext context= request.getServletContext();
        String path= context.getRealPath("/")+"plots.xml";        
        
        SAXBuilder saxBuilder = new SAXBuilder();
        File inputFile = new File(path);
        
        try {

                Document document = (Document) saxBuilder.build(inputFile);
                Element rootElement = document.getRootElement();
                
                List<Element> list = rootElement.getChildren("plot");
                Element plots = list.get(id-1);
                               
                respuesta.add(id);
                respuesta.add(plots.getChildText("name"));
                respuesta.add(plots.getChildText("p1a"));
                respuesta.add(plots.getChildText("p1b"));
                respuesta.add(plots.getChildText("p2a"));
                respuesta.add(plots.getChildText("p2b"));
                respuesta.add(plots.getChildText("bb1"));
                respuesta.add(plots.getChildText("bb2"));
                respuesta.add(plots.getChildText("bb3"));
                respuesta.add(plots.getChildText("bb4"));

                //Escribimos en el archivo
                XMLOutputter fmt = new XMLOutputter();
                FileWriter writer = new FileWriter(path);
                fmt.setFormat(Format.getPrettyFormat());
                fmt.output(document, writer);
                writer.flush();
                writer.close();
                
                String JSONresponse = new Gson().toJson(respuesta);      
                out.write(JSONresponse);
                out.flush();

        }catch(Exception ex) {
                respuesta.add(null);
                String JSONresponse = new Gson().toJson(respuesta);      
                out.write(JSONresponse);
                out.flush();
                ex.printStackTrace();	
        }
    }
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        HttpSession session= request.getSession();
        String idprof=(String)session.getAttribute("id");
        
        int id=Integer.parseInt(request.getParameter("id"));
        String nombre=String.valueOf(request.getParameter("name"));
        String p1a=String.valueOf(request.getParameter("p1a"));
        String p1b=String.valueOf(request.getParameter("p1b"));
        String p2a=String.valueOf(request.getParameter("p2a"));
        String p2b=String.valueOf(request.getParameter("p2b"));
        String bb1=String.valueOf(request.getParameter("bb1"));
        String bb2=String.valueOf(request.getParameter("bb2"));
        String bb3=String.valueOf(request.getParameter("bb3"));
        String bb4=String.valueOf(request.getParameter("bb4"));

        
        List respuesta = new ArrayList();
        String JSONresponse;
       
        ServletContext context= request.getServletContext();
        String path= context.getRealPath("/")+"plots.xml";
        
        SAXBuilder saxBuilder = new SAXBuilder();
        File inputFile = new File(path);
        
        try {

                Document document = (Document) saxBuilder.build(inputFile);
                Element rootElement = document.getRootElement();

                List<Element> list = rootElement.getChildren("plot");
                Element plots = list.get(id-1);
                
                //Borramos los datos previos
                String idprofesor=plots.getAttributeValue("idprof");
                
                //Checamos si el profesor tiene permiso de modificar el diagrama
                if(idprof.equals(idprofesor)){
                    plots.removeContent();

                    // Creamos nuestras entradas
                    Element name = new Element("name");
                    Element p11 = new Element("p1a");
                    Element p12 = new Element("p1b");
                    Element p21 = new Element("p2a");
                    Element p22 = new Element("p2b");
                    Element b1 = new Element("bb1");
                    Element b2 = new Element("bb2");
                    Element b3 = new Element("bb3");
                    Element b4 = new Element("bb4");

                    //Llenamos con los datos ingresados por el usuario
                    name.setText(nombre);
                    p11.setText(p1a);
                    p12.setText(p1b);
                    p21.setText(p2a);
                    p22.setText(p2b);
                    b1.setText(bb1);
                    b2.setText(bb2);
                    b3.setText(bb3);
                    b4.setText(bb4);


                    //Añadimos al nodo padre
                    plots.addContent(name);
                    plots.addContent(p11);
                    plots.addContent(p12);
                    plots.addContent(p21);
                    plots.addContent(p22);
                    plots.addContent(b1);
                    plots.addContent(b2);
                    plots.addContent(b3);
                    plots.addContent(b4);

                    //Escribimos en el archivo
                    XMLOutputter fmt = new XMLOutputter();
                    FileWriter writer = new FileWriter(path);
                    fmt.setFormat(Format.getPrettyFormat());
                    fmt.output(document, writer);
                    writer.flush();
                    writer.close();

                    respuesta.add("success");
                    respuesta.add(nombre);
                    JSONresponse = new Gson().toJson(respuesta);      
                    out.write(JSONresponse);
                    out.flush();
                }else{
                    respuesta.add("error");
                    respuesta.add(null);
                    JSONresponse = new Gson().toJson(respuesta);      
                    out.write(JSONresponse);
                    out.flush();
                }
                
        }catch(Exception ex) {
            
                respuesta.add("error");
                respuesta.add(null);
                JSONresponse = new Gson().toJson(respuesta);      
                out.write(JSONresponse);
                out.flush();
                ex.printStackTrace();	
        }
    }
}
