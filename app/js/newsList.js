var names = {}
window.name.split('&').map(function(item){
    names[item.split('=')[0]]=item.split('=')[1];
});
var selectDataList = {type:names.type,childType:names.childType};
if(names){
    var selectData={};
    $(".middleContent .left .listName").text(names.title);
    $(".category").each(function(index,item){
        if($(this).find('.topnav').text()==names.title){
            var str = '';
            $(this).find('.down')&&$(this).find('.down li').length>0&&$(this).find('.down li').each(function(index,item){
                selectData.type = $(this).attr('type');

                str+="<li type='"+$(this).attr('type')+"' childType='"+$(this).attr('childType')+"'>"+$(this).text()+"</li>"
            })
            $('.middleContent .left .list').html(str);
        }
    })
    $('.right .crumbs').append($("<span> / "+names.title+"</span>"))
    $('.middleContent .left .list').on('click','li',function(){
        $('.right .crumbs span').remove('.curList');
        $('.right .crumbs').append($("<span class='curList'> / "+$(this).text()+"</span>"));
        window.name = "type="+$(this).attr('type')+"&childType="+$(this).attr('childType')+"&title="+$(this).text();
        window.name.split('&').map(function(item){
            names[item.split('=')[0]]=item.split('=')[1];
        });
        pagegetList({type:names.type,childType:names.childType});  
    })
    pagegetList(selectDataList);
    function pagegetList(data){
        $.ajax({
            url:'/getContent',
            data:data,
            type:'get',
            success:function(res){
                var str="";
                res.length>0&&res.map(function(item){
                    str+="<li><span class='datetime'>"+item.time+"</span><a href='/detail/"+item.title+"' title='"+item.title+"'>"+item.title+"</a></li>"
                })
                $('.r_list').html(str?str:'暂无数据');
            }
        })
    }
    
}
