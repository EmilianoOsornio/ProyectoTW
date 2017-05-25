$(function() {
            obtenerPermisos("admin");
            $.ajax({
                type: "GET",
                url: "Admin",
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
    
    $("#greetings").text("Saludos " + msg[0][1] + " " + msg[0][0]);
    $(".userCell").remove();
    var i, j;
    for(i = 0; i< msg[1].length; i++) {
        row = "<tr class='userCell'>";
        for(j = 0; j<msg[1][i].length; j++) {
            row+="<td>"+msg[1][i][j]+"</td>";          
        }
        row+="<td><button data-id='"+msg[1][i][0]+"' class='btn btn-danger eliminar'>Eliminar</button></td>";
        row+="<td><button data-id='"+msg[1][i][0]+"' class='btn btn-primary modificar'>Modificar</button></td>";
        row+="</tr>";        
        
        $("#usersTable").append(row);
    }    
    
    $(".eliminar").on("click", function() {    
        con = confirm("¿Seguro que deseas eliminar el usuario?");
        if(con) {
            id = $(this).attr("data-id");
            window.location.href = "Eliminar?id="+id;
        }
    });
    
    $(".modificar").on("click", function() {    
        id = $(this).attr("data-id");
        window.location.href = "modificar.html?id="+id;
    });
}

