var app_container = "#app_container";
var source_container = "#raw_source";
var app_width = '400px';
var app_height = '600px';
var current_editor = 0;

var snippet_list = [
    {"name": "Header", "id": "header" },
    {"name": "Paragraph", "id": "paragraph"},
    {"name": "Simple Card", "id": "card_simple"},
    {"name": "Card with Header and Footer", "id": "card_advance"}
];

$(document).ready(function(){
    initApp();
    initSnippets();

    $( "#app_container" ).sortable({cancel: ':input,button,[contenteditable]', placeholder: "ui-state-highlight", forcePlaceholderSize: true});

});

function toggleSource(){

    if(current_editor==0){
        $(source_container).val( $(app_container).html() );
        current_editor = 1;
    }else if(current_editor==1){
        $(app_container).html( $(source_container).val() );
        current_editor = 0;
    }

    $(app_container).toggle();
    $(source_container).toggle();

}

function initApp(){

    $(app_container).css({
        width: app_width,
        minHeight: app_height,
    });

    $(source_container).css({
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