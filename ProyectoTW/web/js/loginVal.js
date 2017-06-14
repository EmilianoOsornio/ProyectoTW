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
                    console.log("logged in but not valid", msg);
                    if( msg[1] === "estudiante")
                    {
                        window.location.href="lista-juegos.html";
                    }
                    else if( msg[1] === "profesor") {
                        window.location.href="diagramas.html";
                    }
                    else if( msg[1] === "admin") {
                        window.location.href="lista.html";
                    }
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
                if(msg[1]==="estudiante"){
                    window.location.href="lista-juegos.html";
                }
                else if(msg[1]==="profesor"){
                    window.location.href="diagramas.html";
                }
                else if(msg[1]==="admin"){
                    window.location.href="lista.html";
                }
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