var params = decodeURI(location.href.split('?')[0].split('/')[location.href.split('/').length-1]);
var type = location.href.split('?')[1].split('=')[1];
$.ajax({
    url:'/getDetailContent',
    type:'get',
    dataType:'json',
    data:{title:params,type:type},
    success:function(res){
        $('.crumbs span').text(' / '+params);
        $('.innerHtml').html(res);
    }
})