//复选框选中

$(function(){
	$(".check").each(function(){
        if($(this).children("input").is(":checked") == true)
        {
            $(this).addClass("on");
        }else{
        	$(this).removeClass("on");
        }

        $(this).click(function(){
        	if($(this).children("input").is(":checked") == true)
	        {
	            $(this).addClass("on");
	        }else{
	        	$(this).removeClass("on");
	        }
        });

    });

    $(".all-check input").click(function(){
        var ischeck = $(this).is(":checked");
        $(".check input").prop("checked", ischeck);
        if($(this).is(":checked") == true)
        {
            $(".check").addClass("on");
        }else{
        	 $(".check").removeClass("on");
        }

    });
});




$(function(){
    $(".radio input").each(function(){
        $(this).click(function(){
            $(".radio").removeClass("on");
            $(this).parent().addClass("on");

        });
    });
});





























