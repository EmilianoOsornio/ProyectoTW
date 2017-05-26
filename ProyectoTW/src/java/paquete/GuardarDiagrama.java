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

public class GuardarDiagrama extends HttpServlet {
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {        
        PrintWriter out = response.getWriter();
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        
        String nombre=String.valueOf(request.getParameter("name"));
        String p1a=String.valueOf(request.getParameter("p1a"));
        String p1b=String.valueOf(request.getParameter("p1b"));
        String p2a=String.valueOf(request.getParameter("p2a"));
        String p2b=String.valueOf(request.getParameter("p2b"));
        
        List respuesta = new ArrayList();
        String JSONresponse;
        

       
       
        ServletContext context= request.getServletContext();
        String path= context.getRealPath("/")+"plots.xml";
        
        SAXBuilder saxBuilder = new SAXBuilder();
        File inputFile = new File(path);
        
        try {
                Document document = (Document) saxBuilder.build(inputFile);
                Element rootElement = document.getRootElement();
                
                
                // Creamos nuestras entradas
                Element plot = new Element("plot");
		Element name = new Element("name");
		Element a1 = new Element("p1a");
		Element b1 = new Element("p1b");
		Element a2 = new Element("p2a");
		Element b2 = new Element("p2b");

                //Atributos
                
                //Calculamos el id siguiente
                List<Element> list = rootElement.getChildren("plot");
                plot.setAttribute("id",""+(list.size()+1)+"");

                //Llenamos con los datos ingresados por el usuario
                
                name.setText(nombre);
                a1.setText(p1a);
                b1.setText(p1b);
                a2.setText(p2a);
                b2.setText(p2b);
                
                //Agregamos al nodo padre y raiz
                plot.addContent(name);
                plot.addContent(a1);
                plot.addContent(b1);
                plot.addContent(a2);
                plot.addContent(b2);
                rootElement.addContent(plot);
                
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
        }catch(Exception ex) {
                ex.printStackTrace();
                respuesta.add("error");
                respuesta.add(null);
                JSONresponse = new Gson().toJson(respuesta);      
                out.write(JSONresponse);
                out.flush();
        }        
    }
}
