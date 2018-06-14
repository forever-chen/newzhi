$('img').click(function(){
    $(this).css({position:'relative'});
    var insertObj = $(this).prev();
    $("<div class='outControl' contenteditable='true'><ul class='corner'><li class='li_corner lt'></li><li class='li_corner rt'></li><li class='li_corner lb'></li><li class='li_corner rb'></li></ul></div>").css({height:$(this).height(),width:$(this).width(),left:$(this).css('left')}).append($(this)).insertAfter(insertObj);
    $(this).css({left:0})
    $(".outControl").focus()
    $(".outControl").blur(function(){
        $('.outControl').find('img').css({left:$(this).css('left')})
        
        $(this).find('img').insertAfter(insertObj);
        $(this).remove();
    })
    $('.outControl').on('mousedown','.li_corner',function(e){
        var targetLi = $(this);
        // $('.li_corner').each(function(index,item){
        //     if(item.css('top')==$(this).css('top')){
        //         nextTarget = item;
        //     }
        // })
        var ele_left = $('.outControl').offset().left;
        var ele_top = $('.outControl').offset().top;
        var initWidth =  $('.outControl').width();
        var initHeight =  $('.outControl').height();
        var target_calss = $(e.target).attr('class').split(' ')[1];
        $(document).mousemove(function(e){
            // console.log(e.pageX-ele_left)
            switch(target_calss){
                case 'rb':
                    $('.outControl').width(e.pageX-ele_left);
                    $('.outControl').find('img').width(e.pageX-ele_left);
                    $('.outControl').height(e.pageY-ele_top);
                    $('.outControl').find('img').height(e.pageY-ele_top);
                break;
                case 'lb':
                    $('.outControl').css({left:e.pageX-ele_left})
                    $('.outControl').width(initWidth - e.pageX + ele_left);
                    $('.outControl').find('img').width(initWidth - e.pageX + ele_left);
                    $('.outControl').height(e.pageY-ele_top);
                    $('.outControl').find('img').height(e.pageY-ele_top);
            }
        })
        
    })
    $(document).mouseup(function(){
        // alert(1111111)
        $(document).off('mousemove');
    })
})
