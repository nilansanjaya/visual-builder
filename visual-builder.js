var app_container = "#app_container";
var app_width = '800px';
var app_height = '1000px';

$(document).ready(function(){
    initApp();
    $( "#app_container" ).sortable();
    initSnippets();
});

function initApp(){

    $(app_container).css({
        width: app_width,
        minHeight: app_height,
    });

}

function initSnippets(){

    $('div[snippet-type]').each(function(i,e){

        loadSnippet($(e).attr("snippet-type"), e);

    });

}



function loadSnippet(snippetName,element){

    $.get( "snippets/"+snippetName+".txt", function( data ) {

        $(element).html( data );

    });

}