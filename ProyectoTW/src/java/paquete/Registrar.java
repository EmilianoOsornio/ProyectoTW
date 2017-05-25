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

public class Registrar extends HttpServlet {
    /*
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        HttpSession session=request.getSession();
        if(session.getAttribute("loggedIn")!=null && String.valueOf(session.getAttribute("type")).equals("admin")) {
            response.sendRedirect("");
        }
        else {
            if(session.getAttribute("loggedIn")==null ){
                response.sendRedirect("index.html");
            }else{
                response.sendRedirect("Inicio"); 
            }
        }        
    }
*/
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {        
        PrintWriter out = response.getWriter();
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        String use=String.valueOf(request.getParameter("usuario"));
        String mai=String.valueOf(request.getParameter("correo"));
        String pas=String.valueOf(request.getParameter("contra"));
        String typ=String.valueOf(request.getParameter("tipo"));
        List respuesta = new ArrayList();
        String JSONresponse;
       
        ServletContext context= request.getServletContext();
        String path= context.getRealPath("/")+"users.xml";
        
        SAXBuilder saxBuilder = new SAXBuilder();
        File inputFile = new File(path);
        
        try {
                Document document = (Document) saxBuilder.build(inputFile);
                Element rootElement = document.getRootElement();
                
                
                // Creamos nuestras entradas
                Element user = new Element("user");
		Element name = new Element("name");
		Element mail = new Element("mail");
		Element pass = new Element("pass");
		Element type = new Element("type");

                //Atributos
                
                //Calculamos el id siguiente
                List<Element> list = rootElement.getChildren("user");
                user.setAttribute("id",""+(list.size()+1)+"");

                //Llenamos con los datos ingresados por el usuario
                
                name.setText(use);
                mail.setText(mai);
                pass.setText(pas);
                type.setText(typ);
                
                //Agregamos al nodo padre y raiz
                user.addContent(name);
                user.addContent(mail);
                user.addContent(pass);
                user.addContent(type);
                rootElement.addContent(user);
                
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
                ex.printStackTrace();
                respuesta.add("error");
                respuesta.add(null);
                JSONresponse = new Gson().toJson(respuesta);      
                out.write(JSONresponse);
                out.flush();
        }
        
    }
}

