var params = decodeURI(location.href.split('?')[0].split('/')[location.href.split('/').length-1]);
var names = {}
window.name.split('&').map(function(item){
    names[item.split('=')[0]]=item.split('=')[1];
});
$.ajax({
    url:'/getDetailContent',
    type:'get',
    // dataType:'json',
    data:{title:params,type:names.type,childType:names.childType},
    success:function(res){
        $('.crumbs span').text(' / '+params);
        $('.innerHtml').html(res);
    }
})