$(function() {
    var initType = 'schoolManage';
    $('.right').on('click', '.ember', function() {
        var fileNameType = $(this).attr('type');
        var fileName = $(this).find('span').eq(0).text();
        // console.log(fileNameType,fileName)
        if(fileNameType){
            var srcName = '../ziliao/'+fileNameType+'/'+fileName+'.swf';
            $(".navbox .right").html("<embed height='700' width='100%' wmode='transparent' src="+srcName+" type='application/x-shockwave-flash' play='true' loop='true' menu='true'>")
        }else{
            fileName = $(this).text(); 
            var srcName = '../ziliao/'+fileName+'.swf';
            $(".navbox .right").html("<embed height='700' width='100%' wmode='transparent' src="+srcName+" type='application/x-shockwave-flash' play='true' loop='true' menu='true'>")
        }
    })
    
    $(".subNav").click(function() {
        if ($(this).attr("id")) {
            initType = $(this).attr("id");
        }
        $(".subNav").removeClass("currentDd currentDt");
        $(this).addClass('currentDd currentDt').next(".navContent").slideToggle(300).siblings(".navContent").slideUp(500);
        if ($(this).text() !== '佐证材料') {
            if ($(this).hasClass('index')) {
                // console.log($(this).text())
                $(".navbox .right").html("<div class='navContent'><div class='ember'>" + $(this).text() + "</div></div>");
            } else {
                var div = $(this).next(".navContent").html();
                $(".navbox .right").html("<div class='navContent'>" + div + "</div>")
            }
        }
        $(".navContent li").click(function() {
            $.ajax({
                url: '/getData',
                type: "GET",
                cache: false,
                data: "data=" + $(this).attr("class") + '&' + 'type=' + initType,
                success: function(data) {
                    // console.log(typeof data);
                    var str='';
                    if(data&&data.length>0){
                        data.map(function(item){
                            str+="<div type="+initType+" class='ember'><span href='javascript:;'>" + item + "</span><span class='date'>2018-05-22</span></div>"
                        })
                    }
                    $(".navbox .right").html(str);
                }
            })
        })
    })
    // if(window.name){
    //     $('.subNav').each(function(index,item){
    //         if($(this).text()==window.name){
    //             $(this).click();
    //         }
    //     })
    // }
})