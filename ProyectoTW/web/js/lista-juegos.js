$(function() {
    obtenerPermisos("estudiante");
    $.ajax({
        type: "GET",
        url: "GuardarCalificacion",
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
    $("#greetings").text("Examenes realizados de " + msg[0][0]);
    $(".diagramCell").remove();
    var i, j;
    console.log(msg[1].length, msg[1]);
    for(i = 0; i< msg[1].length; i++) {
        row = "<tr class='diagramCell'>";
        for(j = 0; j<msg[1][i].length; j++) {
            row+="<td>"+msg[1][i][j]+"</td>";          
        }
        row+="</tr>";        
        
        $("#diagramTable").append(row);
    }
}
