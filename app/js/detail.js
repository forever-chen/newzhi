var params = decodeURI(location.href.split('/')[location.href.split('/').length-1]);
$.ajax({
    url:'/getDetailContent',
    type:'get',
    data:{title:params},
    success:function(res){
        console.log(res);
        $('.crumbs span').text(' / '+params);
        $('.innerHtml').html(res);
    }
})