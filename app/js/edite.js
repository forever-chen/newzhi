$(".subNav").click(function() {
    if ($(this).attr("id")) {
        initType = $(this).attr("id");
    }
    $(".subNav").removeClass("currentDd currentDt");
    $(this).addClass('currentDd currentDt').next(".navContent").slideToggle(300).siblings(".navContent").slideUp(500);
    
})
// 新闻列表信息
var selectData = {
    type:"intro",
    childType:"simple"
}
// 新闻标题
var newslist = '学校简介';
var edit = false;
getdatalist(selectData);
//获取文档数据
function getdatalist(data){
    $.ajax({
        url:'/getContent',
        type:'get',
        data:data,
        cache:false,
        dataType:'json',
        success:function(res){
            var contentListOne = '';
            if(res.length>0){
                res.map(function(item){
                    contentListOne += "<li class='title'><span class='leftTitle'>"+item.title+"</span><span class='titleTime'>"+item.time+"</span><span class='deleteData' type="+selectData.type+">删除</span></li>"
                  })  
            }else{
                contentListOne = '<div style="text-align:center;color:#787777;padding: 10px;">暂无上传数据</div>'
            }
            
            $('.contentList .innerList').html(contentListOne);
        }
    })
}
// 删除新闻
$('.contentList').on('click','.deleteData',function(){
    $.ajax({
        url:'/deleteData',
        type:'get',
        // dataType:'json',
        data:{
            type:$(this).attr('type'),
            title:$(this).prev().prev().text().replace('删除',''),
            childType:selectData.childType
        },
        success:function(res){
            getdatalist(selectData);
        },
        error:function(err){
            // getdatalist();
        }
    })
})
// 点击新闻跳转编辑页面
$('.contentList').on('click','.leftTitle',function(){
    $('.newslist').css({display:'none'});
    $('.editepage').css({display:'block'});
    $('.editepage .title').text(newslist);
    var title = $(this).text();
    var list = selectData;
    list.title = $(this).text();
    edit = true;
    $.ajax({
        url:'/getDetailContent',
        type:'get',
        // dataType:'json',
        data:list,
        success:function(res){
           $('.getTitle').val(title).attr({disabled:true});
            editor.txt.html(res);
        },
        error:function(err){
            // console.log(err)
            
        }
    })   
})
// 点击左侧菜单跳转新闻列表页面
$('.subNavBox .navContent li').click(function(){
    selectData = {
        type:$(this).attr('type'),
        childType:$(this).attr('childType')
    }
    newslist = $(this).text();
    $('.r_inner .contentList .title b').text($(this).text());
    getdatalist(selectData);
    $('.newslist').css({display:'block'});
    $('.editepage').css({display:'none'});

})
// 返回按钮
$('#btn6').click(function () {
    $('.newslist').css({display:'block'});
    $('.editepage').css({display:'none'});
});
// 新增按钮
$('.addButton').on('click',function(){
    $('.newslist').css({display:'none'});
    $('.editepage').css({display:'block'});
    $('.editepage .title').text(newslist);
    edit = false;
    $('.getTitle').val('').attr({disabled:false});
    editor.txt.html('');
})
// 保存数据
$('#btn5').click(function () {
    // 创建编辑器之后继续追加内容
    var title = $('.getTitle').val();
    if(!title){
        alert('请输入文章标题');
        return;
    }
    if(editor.txt.html()=='<p><br></p>'){
        alert('请输入文章内容');
        return;
    }
    $.ajax({
        url:'/addContent',
        type:'post',
        data:{data:JSON.stringify({
                type:selectData.type,
                childType:selectData.childType,
                title: $('.getTitle').val(),
                content:editor.txt.html(),
                edit:edit
            })
        },
        success:function(res){
            if(res=='ok'){
                alert('保存数据成功');
                getdatalist(selectData);
                $('.getTitle').val('')
                editor.txt.html('');
                $('.newslist').css({display:'block'});
                $('.editepage').css({display:'none'});
            }else{
                alert(res);
            }
        }
    })
})

// // 图片自由缩放
// $('#text-elem8106753412938723 img').click(function(){
//     alert(1)
//     var click = $(this).prev()
//     // console.log($(this).width())
//     $(this).css({width:'100%',height:'100%'});
//     $("<div class='out_btn'><div class='fuceng'></div><button onclick='blowup()' class='btn_up'>放大</button><button class='btn_down' onclick='reduce()'>缩小</button></div>").css({width:$(this).width(),height:$(this).height()}).append($(this)).insertAfter(click)
// })
// function blowup(){
//     $(this).parent().css({width:$(this).parent().width()+20,height:$(this).parent().height()+20})
// }