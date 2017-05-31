// Check off specific todos by clicking
$("ul").on('click', "li", function(){
    $(this).toggleClass("completed")
});


// Click on X to delete TODO
$("ul").on('click', 'span', function(event){
    event.stopPropagation();
    $(this).parent().fadeOut(500, function(){
        $(this).remove(); //this now is the parent
    });
});

// create todo
$("input[type='text']").keypress(function(event){
    if(event.which === 13){ //check enter key
        var todoText = $(this).val();
        $(this).val("");
        $("ul").append("<li><span><i class='fa fa-trash'></i></span> " + todoText + "</li>");
    }
});

$(".fa-plus").click(function(){
    $("input[type='text']").fadeToggle();
});