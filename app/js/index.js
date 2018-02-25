// 轮播转动开始
var t = n =0, count;

$(document).ready(function(){ 

count=$("#banner_list a").length;

$("#banner_list a:not(:first-child)").hide();

$("#banner_info").html($("#banner_list a:first-child").find("img").attr('alt'));

$("#banner_info").click(function(){window.open($("#banner_list a:first-child").attr('href'), "_blank")});

$("#banner li").click(function() {

var i = $(this).text() -1;//获取Li元素内的值，即1，2，3，4

n = i;

if (i >= count) return;

$("#banner_info").html($("#banner_list a").eq(i).find("img").attr('alt'));

$("#banner_info").unbind().click(function(){window.open($("#banner_list a").eq(i).attr('href'), "_blank")})

$("#banner_list a").filter(":visible").fadeOut(500).parent().children().eq(i).fadeIn(1000);

document.getElementById("banner").style.background="";

$(this).toggleClass("on");

$(this).siblings().removeAttr("class");

});

t = setInterval("showAuto()", 2000);

$("#banner").hover(function(){clearInterval(t)}, function(){t = setInterval("showAuto()", 2000);});

})



function showAuto()

{

n = n >=(count -1) ?0 : ++n;

$("#banner li").eq(n).trigger('click');

}
// 轮播转动结束
// 专业轮播
$(function(){
    
            var $banner=$('.major-banner');
    
            var $banner_ul=$('.banner-img');
    
            var $btn=$('.banner-btn');
    
            var $btn_a=$btn.find('a')
    
            var v_width=$banner.width();
    
            
    
            var page=1;
    
            
    
            var timer=null;
    
            var btnClass=null;
    
    
    
            var page_count=$banner_ul.find('li').length;//把这个值赋给小圆点的个数
    
            
    
            var banner_cir="<li class='selected' href='#'><a></a></li>";
    
            for(var i=1;i<page_count;i++){
    
                    //动态添加小圆点
    
                    banner_cir+="<li><a href='#'></a></li>";
    
                    }
    
            $('.banner-circle').append(banner_cir);
    
            
    
            var cirLeft=$('.banner-circle').width()*(-0.5);
    
            $('.banner-circle').css({'marginLeft':cirLeft});
    
            
    
            $banner_ul.width(page_count*v_width);
    
            
    
            function move(obj,classname){
    
                    //手动及自动播放
    
            if(!$banner_ul.is(':animated')){
    
                    if(classname=='prevBtn'){
    
                            if(page==1){
    
                                            $banner_ul.animate({left:-v_width*(page_count-1)});
    
                                            page=page_count; 
    
                                            cirMove();
    
                            }
    
                            else{
    
                                            $banner_ul.animate({left:'+='+v_width},"slow");
    
                                            page--;
    
                                            cirMove();
    
                            }        
    
                    }
    
                    else{
    
                            if(page==page_count){
    
                                            $banner_ul.animate({left:0});
    
                                            page=1;
    
                                            cirMove();
    
                                    }
    
                            else{
    
                                            $banner_ul.animate({left:'-='+v_width},"slow");
    
                                            page++;
    
                                            cirMove();
    
                                    }
    
                            }
    
                    }
    
            }
    
            
    
            function cirMove(){
    
                    //检测page的值，使当前的page与selected的小圆点一致
    
                    $('.banner-circle li').eq(page-1).addClass('selected')
    
                                                                                                    .siblings().removeClass('selected');
    
            }
    
            
    
            $banner.mouseover(function(){
    
                    $btn.css({'display':'block'});
    
                    clearInterval(timer);
    
                                    }).mouseout(function(){
    
                    $btn.css({'display':'none'});                
    
                    clearInterval(timer);
    
                    timer=setInterval(move,3000);
    
                                    }).trigger("mouseout");//激活自动播放
    
    
    
            $btn_a.mouseover(function(){
    
                    //实现透明渐变，阻止冒泡
    
                            $(this).animate({opacity:0.6},'fast');
    
                            $btn.css({'display':'block'});
    
                             return false;
    
                    }).mouseleave(function(){
    
                            $(this).animate({opacity:0.3},'fast');
    
                            $btn.css({'display':'none'});
    
                             return false;
    
                    }).click(function(){
    
                            //手动点击清除计时器
    
                            btnClass=this.className;
    
                            clearInterval(timer);
    
                            timer=setInterval(move,3000);
    
                            move($(this),this.className);
    
                    });
    
                    
    
            $('.banner-circle li').live('click',function(){
    
                            var index=$('.banner-circle li').index(this);
    
                            $banner_ul.animate({left:-v_width*index},'slow');
    
                            page=index+1;
    
                            cirMove();
    
                    });
    
    });
// 专业轮播结束    