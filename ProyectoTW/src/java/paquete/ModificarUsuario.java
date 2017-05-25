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
import org.jdom.Document;
import org.jdom.Element;
import org.jdom.input.SAXBuilder;
import org.jdom.output.Format;
import org.jdom.output.XMLOutputter;

public class ModificarUsuario extends HttpServlet {
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        String use=String.valueOf(request.getParameter("usuario"));
        String mai=String.valueOf(request.getParameter("correo"));
        String pas=String.valueOf(request.getParameter("contra"));
        String typ=String.valueOf(request.getParameter("tipo"));
        int id=Integer.parseInt(request.getParameter("id"));
        
        List respuesta=new ArrayList();
        String JSONresponse;
        
        
        ServletContext context= request.getServletContext();
        String path= context.getRealPath("/")+"users.xml";
        
        SAXBuilder saxBuilder = new SAXBuilder();
        File inputFile = new File(path);
        
        try {

                Document document = (Document) saxBuilder.build(inputFile);
                Element rootElement = document.getRootElement();

                List<Element> list = rootElement.getChildren("user");
                Element users = list.get(id-1);
                
                //Borramos los datos previos
                users.removeContent();
                
                // Creamos nuestras entradas
		Element name = new Element("name");
		Element mail = new Element("mail");
		Element pass = new Element("pass");
		Element type = new Element("type");
                
                //Llenamos con los datos ingresados por el usuario
                name.setText(use);
                mail.setText(mai);
                pass.setText(pas);
                type.setText(typ);
                
                //Añadimos al nodo padre
                users.addContent(name);
                users.addContent(mail);
                users.addContent(pass);
                users.addContent(type);
                
                //Escribimos en el archivo
                XMLOutputter fmt = new XMLOutputter();
                FileWriter writer = new FileWriter(path);
                fmt.setFormat(Format.getPrettyFormat());
                fmt.output(document, writer);
                writer.flush();
                writer.close();
                
                respuesta.add("success");
                respuesta.add(use);
                JSONresponse = new Gson().toJson(respuesta);      
                out.write(JSONresponse);
                out.flush();
                
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
