var bb1=-10;
var bb2=10;
var bb3=10;
var bb4=-10;

var aciertos = 0;

var rx1 = parseInt(getRandomInt(0, 10));
var rx2 = parseInt(getRandomInt(0, 10));

var ry1 = parseInt(getRandomInt(0, 10));
var ry2 = parseInt(getRandomInt(0, 10));

var b = JXG.JSXGraph.initBoard('jxgbox', {boundingbox: [bb1, bb2, bb3, bb4], axis:true, grid:true});
var p1 = b.create('point',[rx1,ry1], {name:'A',size:4, fixed: true});
var p2 = b.create('point',[rx2,ry2], {name:'B',size:4, fixed: true});
var li = b.create('line',["A","B"], {strokeColor:'#00ff00',strokeWidth:2});

$(function() {
    obtenerPermisos("estudiante");  
    
    $("#p1a").on("change keyup", function(event) {
       $("#2x1").val($("#p1a").val()); 
    });
    
    $("#p1a").on("change keyup", function(event) {
       $("#2x1").val($("#p1a").val()); 
    });
    
    $("#p1b").on("change keyup", function(event) {
       $("#2y1").val($("#p1b").val()); 
    });
    
    $("#btn-recargar").click(function(event){
        location.reload();
    });
    
    $("#btn-comprobar").click(function(event){

        if(!$("#caliForm")[0].checkValidity()){
            $("#btn-submitGrade").click();
        }
        else {
            event.preventDefault();
            $(this).prop("disabled", true);
            $("#btn-recargar").prop("disabled", false);

           resetStatus();

           x1 = parseInt($("#p1a").val());
           y1 = parseInt($("#p1b").val());
           x2 = parseInt($("#p2a").val());
           y2 = parseInt($("#p2b").val());
           m1 = parseInt($("#2m1").val());
           m2 = parseInt($("#2m2").val());

            getAnswerStatus(x1, rx1, $("#p1a"));
            getAnswerStatus(x1, rx1, $("#2x1"));
            getAnswerStatus(x2, rx2, $("#p2a"));
            getAnswerStatus(y1, ry1, $("#p1b"));
            getAnswerStatus(y1, ry1, $("#2y1"));
            getAnswerStatus(y2, ry2, $("#p2b"));
            getAnswerStatus(m1, (ry2-ry1), $("#2m1"));
            getAnswerStatus(m2, (rx2-rx1), $("#2m2"));

            $("#aciertos").html(aciertos + "/8 aciertos");
            $("#ac").val(aciertos);
            $.post({
                url: "GuardarCalificacion",
                data: $("#caliForm").serialize(),
                success: function(msg, status, jqXHR) {
                    console.log(msg);
                },
                error: function(error) {
                    console.log(error);
                }
            });
        }
    });
    
    //GET para revisar los datos
    //$.ajax({
    //            type: "GET",
    //            url: "GuardarCalificacion",
    //            success: function(msg, status, jqXHR) {
    //                console.log("Para la lista de calificaciones",msg);
    //            },
    //            error: function(error) {
    //                console.log(error);
    //            }
    //        });
});

function getAnswerStatus(a, b, input) {
    var icon = input.next(".glyphicon"); 
    input.parent().addClass("has-feedback");
    icon.removeClass("glyphicon-ok glyphicon-remove");
    
    if(a === b) {
        input.parent().addClass("has-success");
        icon.addClass("glyphicon-ok");
        aciertos++;
    }
    else {
       input.parent().addClass("has-error"); 
       icon.addClass("glyphicon-remove");
    }
}

function resetStatus(){
    $("#p1a").parent().removeClass("has-success has-error has-feedback");
    $("#p1b").parent().removeClass("has-success has-error has-feedback");
    $("#p2a").parent().removeClass("has-success has-error has-feedback");
    $("#p2b").parent().removeClass("has-success has-error has-feedback");
    $("#2m1").parent().removeClass("has-success has-error has-feedback");
    $("#2m2").parent().removeClass("has-success has-error has-feedback");
    $("#2x1").parent().removeClass("has-success has-error has-feedback");
    $("#2y1").parent().removeClass("has-success has-error has-feedback");
}