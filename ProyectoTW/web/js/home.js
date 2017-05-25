$(function() {
    $.ajax({
        type: "GET",
        url: "Obtener",
        success: function(msg, status, jqXHR) {
            buildPage(msg);
        },
        error: function(error) {
            console.log(error);
        }
    });
});

function buildPage(data) {
    console.log(data);
    $("#greetings").text("Bienvenido " + data[3] + " " + data[1]);
    $("#mail").text(data[2]);
}