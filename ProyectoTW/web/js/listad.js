$(function() {
            obtenerPermisos("profesor");
            $.ajax({
                type: "GET",
                url: "ObtenerDiagramas",
                success: function(msg, status, jqXHR) {
                    console.log(msg);
                    buildPage(msg);
                },
                error: function(error) {
                    console.log(error);
                }
            });
});

function buildPage(msg) {
    $("#greetings").text("Diagramas creados por " + msg[0][0]);
    $(".diagramCell").remove();
    var i, j;
    for(i = 0; i< msg[1].length; i++) {
        row = "<tr class='diagramCell'>";
        for(j = 0; j<msg[1][i].length; j++) {
            row+="<td>"+msg[1][i][j]+"</td>";          
        }
        row+="<td><button data-id='"+msg[1][i][0]+"' class='btn btn-danger eliminar'>Eliminar</button></td>";
        row+="<td><button data-id='"+msg[1][i][0]+"' class='btn btn-primary modificar'>Modificar</button></td>";
        row+="</tr>";        
        
        $("#diagramTable").append(row);
    }    
    
    $(".eliminar").on("click", function() {    
        con = confirm("¿Seguro que deseas eliminar el diagrama?");
        if(con) {
            id = $(this).attr("data-id");
            window.location.href = "EliminarDiagrama?id="+id;
        }
    });
    
    $(".modificar").on("click", function() {    
        id = $(this).attr("data-id");
        window.location.href = "modificarDiagrama.html?id="+id;
    });
}

