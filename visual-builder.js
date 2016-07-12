var app_container = "#app_container";
var app_width = '800px';
var app_height = '1000px';

var snippet_list = [
    {
        "name": "Header",
        "id": "header"
    },
    {
        "name": "Paragraph",
        "id": "paragraph"
    }
];

$(document).ready(function(){
    initApp();
    initSnippets();

    $( "#app_container" ).sortable({cancel: ':input,button,[contenteditable]'});

});

function initApp(){

    $(app_container).css({
        width: app_width,
        minHeight: app_height,
    });

    $.each( snippet_list, function( key, value ) {
        $("#snippet_list").append("<option value='"+value.id+"'>"+value.name+"</option>")
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

function addSnippet(){

    var snippet_id =  $("#snippet_list").val();

    var el = $('<div class="object"></div>');

    $(app_container).append(el).attr("snippet-type", snippet_id);

    loadSnippet(snippet_id, el);

}