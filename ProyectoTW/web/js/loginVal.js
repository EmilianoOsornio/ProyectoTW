function obtenerPermisos(permiso) {
    $.ajax({
        type: "GET",
        url: "Acceso",
        success: function(msg, status, jqXHR) {
            console.log(msg);
            if(msg[0]==="loggedIn" && msg[1]===permiso){
                console.log("logged in and valid");
                return true;
            }else{
                if(msg[0]!=="loggedIn"){
                    console.log("not logged in", msg);
                    window.location.href="index.html";
                }else{
                    window.location.href="home.html";
                    console.log("logged in", msg);
                }
            }
        },
        error: function(error) {
            console.log(error);
        }
    });
}

function isLoggedIn() {
    $.ajax({
        type: "GET",
        url: "Acceso",
        success: function(msg, status, jqXHR) {
            console.log(msg);
            if(msg[0]==="loggedIn") {
                window.location.href="home.html";
            }
            else {
                return false;
            }
        },
        error: function(error) {
            console.log(error);
        }
    });
}