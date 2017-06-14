$(function(){
    $("#back").click(function(event){
        window.history.back();
        return false;
    });
});

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

function setGraphListeners() {
    $("#p1a").on("change keyup", function(event){
        x = parseFloat($("#p1a").val());
        y = parseFloat($("#p1b").val());
        p1.setPosition(JXG.COORDS_BY_USER, [x,y]);
        b.fullUpdate();
        $("#x1").val($("#p1a").val());
        $("#2x1").val($("#p1a").val());
        $("#x2").val($("#p2a").val());
        $("#m2").val($("#x2").val()-$("#x1").val());
        $("#2m2").val($("#x2").val()-$("#x1").val());
    });
  
    
    $("#p1b").on("change keyup", function(event){
        x = parseFloat($("#p1a").val());
        y = parseFloat($("#p1b").val());
        p1.setPosition(JXG.COORDS_BY_USER, [x,y]);
        b.fullUpdate();
        $("#y1").val($("#p1b").val());
        $("#2y1").val($("#p1b").val());
        $("#y2").val($("#p2b").val());
        $("#m1").val($("#y2").val()-$("#y1").val());
        $("#2m1").val($("#y2").val()-$("#y1").val());
    });
    
    $("#p2a").on("change keyup", function(event){
        x = parseFloat($("#p2a").val());
        y = parseFloat($("#p2b").val());
        p2.setPosition(JXG.COORDS_BY_USER, [x,y]);
        $("#x1").val($("#p1a").val());
        $("#x2").val($("#p2a").val());
        $("#m2").val($("#x2").val()-$("#x1").val());
        $("#2m2").val($("#x2").val()-$("#x1").val());
        b.fullUpdate();
    });
    
    $("#p2b").on("change keyup", function(event){
        x = parseFloat($("#p2a").val());
        y = parseFloat($("#p2b").val());
        p2.setPosition(JXG.COORDS_BY_USER, [x,y]);
        b.fullUpdate();
        $("#y1").val($("#p1b").val());
        $("#y2").val($("#p2b").val());
        $("#m1").val($("#y2").val()-$("#y1").val());
        $("#2m1").val($("#y2").val()-$("#y1").val());
    });

    $("#x1").on("change keyup", function(event){
        x = parseFloat($("#x1").val());
        y = parseFloat($("#y1").val());
        p1.setPosition(JXG.COORDS_BY_USER, [x,y]);
        b.fullUpdate();
        $("#p1a").val($("#x1").val());
        $("#2x1").val($("#x1").val());
        $("#m2").val($("#x2").val()-$("#x1").val());
        $("#2m2").val($("#x2").val()-$("#x1").val());
    });
    
    $("#x2").on("change keyup", function(event){
        x = parseFloat($("#x2").val());
        y = parseFloat($("#y2").val());
        p2.setPosition(JXG.COORDS_BY_USER, [x,y]);
        b.fullUpdate();
        $("#p2a").val($("#x2").val());
        $("#m2").val($("#x2").val()-$("#x1").val());
        $("#2m2").val($("#x2").val()-$("#x1").val());
    });
    
    $("#y1").on("change keyup", function(event){
        x = parseFloat($("#x1").val());
        y = parseFloat($("#y1").val());
        p1.setPosition(JXG.COORDS_BY_USER, [x,y]);
        b.fullUpdate();
        $("#p1b").val($("#y1").val());
        $("#2y1").val($("#y1").val());
        $("#m1").val($("#y2").val()-$("#y1").val());
        $("#2m1").val($("#y2").val()-$("#y1").val());
    });
    
    $("#y2").on("change keyup", function(event){
        x = parseFloat($("#x2").val());
        y = parseFloat($("#y2").val());
        p2.setPosition(JXG.COORDS_BY_USER, [x,y]);
        b.fullUpdate();
        $("#p2b").val($("#y2").val());
        $("#m1").val($("#y2").val()-$("#y1").val());
        $("#2m1").val($("#y2").val()-$("#y1").val());
    });
    
    $("#2y1").on("change keyup", function(event){
        x = parseFloat($("#2x1").val());
        y = parseFloat($("#2y1").val());
        p1.setPosition(JXG.COORDS_BY_USER, [x,y]);
        b.fullUpdate();
        $("#p1b").val($("#2y1").val());
        $("#y1").val($("#2y1").val());
        $("#m1").val($("#y2").val()-$("#y1").val());
        $("#2m1").val($("#y2").val()-$("#y1").val());
    });
    
    $("#2x1").on("change keyup", function(event){
        x = parseFloat($("#2x1").val());
        y = parseFloat($("#2y1").val());
        p1.setPosition(JXG.COORDS_BY_USER, [x,y]);
        b.fullUpdate();
        $("#p1a").val($("#2x1").val());
        $("#x1").val($("#2x1").val());
        $("#m2").val($("#x2").val()-$("#x1").val());
        $("#2m2").val($("#x2").val()-$("#x1").val());
    });
    
    p1.on('drag', function(){
        $("#p1a").val(p1.coords.usrCoords[1]);
        $("#p1b").val(p1.coords.usrCoords[2]);
        $("#x1").val(p1.coords.usrCoords[1]);
        $("#y1").val(p1.coords.usrCoords[2]);
        $("#2y1").val(p1.coords.usrCoords[2]);
        $("#2x1").val(p1.coords.usrCoords[1]);
        $("#m1").val($("#y2").val()-$("#y1").val());
        $("#2m1").val($("#y2").val()-$("#y1").val());
        $("#m2").val($("#x2").val()-$("#x1").val());
        $("#2m2").val($("#x2").val()-$("#x1").val());
    });
    
    p2.on('drag', function(){
        $("#p2a").val(p2.coords.usrCoords[1]);
        $("#p2b").val(p2.coords.usrCoords[2]);
        $("#x2").val(p2.coords.usrCoords[1]);
        $("#y2").val(p2.coords.usrCoords[2]);
        $("#m1").val($("#y2").val()-$("#y1").val());
        $("#2m1").val($("#y2").val()-$("#y1").val());
        $("#m2").val($("#x2").val()-$("#x1").val());
        $("#2m2").val($("#x2").val()-$("#x1").val());
    });
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
