var editor = new wangEditor('#editor');
    editor.customConfig.onchange = function (html) {

    }

    editor.customConfig.uploadImgServer = '/upload'

    editor.customConfig.pasteFilterStyle = false
    editor.customConfig.pasteTextHandle = function (content) {

        return content + ''
    }

    editor.create();
    $('.w-e-text-container').css('height','500px');
    $('#btn1').click(function () {

        editor.$textElem.attr('contenteditable', false)
    });

    $('#btn2').click(function () {

        editor.$textElem.attr('contenteditable', true)
        
    });
    $('#btn3').click(function () {

        editor.txt.append('<p>追加的内容</p>')
    });
    $('#btn4').click(function () {

        editor.txt.html('');
    });

    editor.txt.html('');

    editor.customConfig.zIndex = 100


$(".subNav").click(function() {
    if ($(this).attr("id")) {
        initType = $(this).attr("id");
    }
    $(".subNav").removeClass("currentDd currentDt");
    $(this).addClass('currentDd currentDt').next(".navContent").slideToggle(300).siblings(".navContent").slideUp(500);
    
})

var selectData = {
    type:"intro",
    childType:"simple"
}

var newslist = '学校简介';
var edit = false;
getdatalist(selectData);

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

        data:list,
        success:function(res){
           $('.getTitle').val(title).attr({disabled:true});
            editor.txt.html(res);
        },
        error:function(err){
 
            
        }
    })   
})

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

$('#btn6').click(function () {
    $('.newslist').css({display:'block'});
    $('.editepage').css({display:'none'});
});

$('.addButton').on('click',function(){
    $('.newslist').css({display:'none'});
    $('.editepage').css({display:'block'});
    $('.editepage .title').text(newslist);
    edit = false;
    $('.getTitle').val('').attr({disabled:false});
    editor.txt.html('');
})

$('#btn5').click(function () {

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
