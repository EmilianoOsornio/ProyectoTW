package paquete;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Iterator;
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

public class Eliminar extends HttpServlet {
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        int id=Integer.parseInt(request.getParameter("id"));       
    
        ServletContext context= request.getServletContext();
        String path= context.getRealPath("/")+"users.xml";
        
        SAXBuilder saxBuilder = new SAXBuilder();
        File inputFile = new File(path);
        
        try {

                Document document = (Document) saxBuilder.build(inputFile);
                Element rootElement = document.getRootElement();

                List<Element> list = rootElement.getChildren("user");
                Iterator itr = list.iterator();
                while (itr.hasNext()) {
                Element child = (Element) itr.next();
                String att = child.getAttributeValue("id"); 
                    if( Integer.parseInt(att) == id){
                        itr.remove();
                    }
                }
                
                //Reasignamos los ids
                List<Element> newlist = rootElement.getChildren("user");
                for (int cont = 0; cont < newlist.size(); cont++) {
                    Element users = list.get(cont);
                    users = newlist.get(cont);
                    users.setAttribute("id",""+(cont+1)+"");
                }
                //Borramos los datos
                
                //Escribimos en el archivo
                XMLOutputter fmt = new XMLOutputter();
                FileWriter writer = new FileWriter(path);
                fmt.setFormat(Format.getPrettyFormat());
                fmt.output(document, writer);
                writer.flush();
                writer.close();
                
               
                
                out.println("<script>alert('Usuario Eliminado'); location='lista.html';</script>");
                }catch(Exception ex) {
                out.println("<script>alert('Usuario no eliminado'); location='Borrar';</script>");
                ex.printStackTrace();	
                }
    }
}