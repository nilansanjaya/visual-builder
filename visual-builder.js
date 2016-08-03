var app_container = "#app_container";
var source_container = "raw_source";
var codemirror_ele = ".CodeMirror";
var app_width = '400px';
var app_height = '600px';
var current_editor = 0;
var code_mirror_instance;

var snippet_list = [
    {"name": "Header", "id": "header" },
    {"name": "Paragraph", "id": "paragraph"},
    {"name": "Simple Card", "id": "card_simple"},
    {"name": "Card with Header and Footer", "id": "card_advance"}
];

$(document).ready(function(){

    code_mirror_instance = CodeMirror.fromTextArea(document.getElementById(source_container), {
        lineNumbers: true,
        mode: "xml",
        htmlMode: true,
        lineWrapping: true,
        matchTags: {bothTags: true},
    });

    initApp();
    //initSnippets();

    $( "#app_container" ).sortable({cancel: ':input,button,[contenteditable]', placeholder: "ui-state-highlight", forcePlaceholderSize: true});

    window.top.postMessage('VISUAL_BUILDER_READY', '*');

    $('#app_form').submit(function() {
        toggleSource();
        return true;
    });

});

function toggleSource(){

    if(current_editor==0){
        code_mirror_instance.doc.setValue( $(app_container).html() );
        current_editor = 1;
    }else if(current_editor==1){
        $(app_container).html( code_mirror_instance.doc.getValue() );
        //initSnippets();
        current_editor = 0;
    }

    $(app_container).toggle();
    $(codemirror_ele).toggle();

    code_mirror_instance.refresh();

}

function initApp(){

    $("#id").val(getUrlParameter("id"));

    $(app_container).css({
        width: app_width,
        minHeight: app_height,
    });

    code_mirror_instance.setSize(app_width, app_height);

    loadSnippetList();

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

function addSnippet(btn_ele){

    var snippet_id =  $(btn_ele).attr("data-id");

    var el = $('<div class="object"></div>');

    $(app_container).append(el).attr("snippet-type", snippet_id);

    loadSnippet(snippet_id, el);

}

function loadSnippetList(){

    var snippet_template = $("#snippet_template").html();

    $.each( snippet_list, function( key, value ) {
        var $html = $('<div />',{html:snippet_template});
        $html.find('h3').html(value.name);
        $html.find('button').attr("data-id", value.id);
        $("#snippet_list").append($html);
    });

}

function postContent(){

    toggleSource();
    setTimeout(function(){ $("#app_form").submit(); },500);

}

window.onmessage = function(e){
    if (e.data.action == 'APP_LOAD_CONTENT') {
        $(app_container).html(e.data.content);
        code_mirror_instance.refresh();
    }
};

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