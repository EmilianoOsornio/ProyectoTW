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
import org.jdom.Document;
import org.jdom.Element;
import org.jdom.input.SAXBuilder;
import org.jdom.output.Format;
import org.jdom.output.XMLOutputter;

public class Modificar extends HttpServlet {
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();    
        int id=Integer.parseInt(request.getParameter("id")); 
        List respuesta = new ArrayList();
                
        ServletContext context= request.getServletContext();
        String path= context.getRealPath("/")+"users.xml";        
        
        SAXBuilder saxBuilder = new SAXBuilder();
        File inputFile = new File(path);
        
        try {

                Document document = (Document) saxBuilder.build(inputFile);
                Element rootElement = document.getRootElement();
                
                List<Element> list = rootElement.getChildren("user");
                Element users = list.get(id-1);
               
                //Obtenemos tipo para la seleccion del combo
                String type=users.getChildText("type");
                
                respuesta.add(id);
                respuesta.add(users.getChildText("name"));
                respuesta.add(users.getChildText("mail"));
                respuesta.add(type);

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
                ex.printStackTrace();	
        }
    }
}