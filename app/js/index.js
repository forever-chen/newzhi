// 轮播转动开始
var t = n = 0, count;



$(document).ready(function () {

        count = $("#banner_list a").length;

        $("#banner_list a:not(:first-child)").hide();

        $("#banner_info").html($("#banner_list a:first-child").find("img").attr('alt'));

        $("#banner_info").click(function () { window.open($("#banner_list a:first-child").attr('href'), "_blank") });

        $("#banner li").click(function () {

                var i = $(this).text() - 1;//获取Li元素内的值，即1，2，3，4

                n = i;

                if (i >= count) return;

                $("#banner_info").html($("#banner_list a").eq(i).find("img").attr('alt'));

                $("#banner_info").unbind().click(function () { window.open($("#banner_list a").eq(i).attr('href'), "_blank") })

                $("#banner_list a").filter(":visible").fadeOut(500).parent().children().eq(i).fadeIn(1000);

                document.getElementById("banner").style.background = "";

                $(this).toggleClass("on");

                $(this).siblings().removeAttr("class");

        });

        t = setInterval("showAuto()", 3000);

        // $("#banner").hover(function () { clearInterval(t) });
        // $("#banner").mouseout(function(){
        //         t = setInterval("showAuto()", 2000);
        // })
})



function showAuto() {

        n = n >= (count - 1) ? 0 : ++n;

        $("#banner li").eq(n).trigger('click');

}
// 轮播转动结束
// 专业轮播
$(function () {

        var $banner = $('.major-banner');

        var $banner_ul = $('.banner-img');

        var $btn = $('.banner-btn');

        var $btn_a = $btn.find('a')

        var v_width = $banner.width();



        var page = 1;



        var timer = null;

        var btnClass = null;



        var page_count = $banner_ul.find('li').length;//把这个值赋给小圆点的个数



        var banner_cir = "<li class='selected' href='#'><a></a></li>";

        for (var i = 1; i < page_count; i++) {

                //动态添加小圆点

                banner_cir += "<li><a href='#'></a></li>";

        }

        $('.banner-circle').append(banner_cir);



        var cirLeft = $('.banner-circle').width() * (-0.5);

        $('.banner-circle').css({ 'marginLeft': cirLeft });



        $banner_ul.width(page_count * v_width);



        function move(obj, classname) {

                //手动及自动播放

                if (!$banner_ul.is(':animated')) {

                        if (classname == 'prevBtn') {

                                if (page == 1) {

                                        $banner_ul.animate({ left: -v_width * (page_count - 1) });

                                        page = page_count;

                                        cirMove();

                                }

                                else {

                                        $banner_ul.animate({ left: '+=' + v_width }, "slow");

                                        page--;

                                        cirMove();

                                }

                        }

                        else {

                                if (page == page_count) {

                                        $banner_ul.animate({ left: 0 });

                                        page = 1;

                                        cirMove();

                                }

                                else {

                                        $banner_ul.animate({ left: '-=' + v_width }, "slow");

                                        page++;

                                        cirMove();

                                }

                        }

                }

        }



        function cirMove() {

                //检测page的值，使当前的page与selected的小圆点一致

                $('.banner-circle li').eq(page - 1).addClass('selected')

                        .siblings().removeClass('selected');

        }



        $banner.mouseover(function () {

                $btn.css({ 'display': 'block' });

                clearInterval(timer);

        }).mouseout(function () {

                $btn.css({ 'display': 'none' });

                clearInterval(timer);

                // timer = setInterval(move, 3000);

        }).trigger("mouseout");//激活自动播放



        $btn_a.mouseover(function () {

                //实现透明渐变，阻止冒泡

                $(this).animate({ opacity: 0.6 }, 'fast');

                $btn.css({ 'display': 'block' });

                return false;

        }).mouseleave(function () {

                $(this).animate({ opacity: 0.3 }, 'fast');

                $btn.css({ 'display': 'none' });

                return false;

        }).click(function () {

                //手动点击清除计时器

                btnClass = this.className;

                clearInterval(timer);

                timer = setInterval(move, 3000);

                move($(this), this.className);

        });



        $('.banner-circle li').live('click', function () {

                var index = $('.banner-circle li').index(this);

                $banner_ul.animate({ left: -v_width * index }, 'slow');

                page = index + 1;

                cirMove();

        });

});
// 专业轮播结束   

// 头部时间显示

var changeTime = $('.time');
setInterval(function () {
        var time = new Date();
        var y = time.getFullYear() + "年";
        var week = time.getDay();
        var mou = (Number(time.getMonth()) + 1 < 10 ? '0' + (Number(time.getMonth()) + 1) : (Number(time.getMonth() + 1))) + "月";
        var day = (Number(time.getDate()) < 10 ? '0' + (Number(time.getDate())) : (Number(time.getDate()))) + "日";
        var hour = (Number(time.getHours()) < 10 ? '0' + (Number(time.getHours())) : (Number(time.getHours()))) + ":";
        var min = (Number(time.getMinutes()) < 10 ? '0' + (Number(time.getMinutes())) : (Number(time.getMinutes()))) + ":";
        var s = (Number(time.getSeconds()) < 10 ? '0' + (Number(time.getSeconds())) : (Number(time.getSeconds())));
        changeTime.html("<p>" + hour + min + s + "&nbsp;&nbsp;&nbsp;" + y + mou + day + "<p>")
}, 1000)

// 视频播放
// var myPlayer = videojs('my-video');
//         videojs("my-video").ready(function(){
//         var myPlayer = this;
//         myPlayer.play();
// });

// videojs.options.flash.swf = "http://jq22com.qiniudn.com/jq22-sp.mp4";

// 浮动窗口
var x = 50, y = 60
var x1 = 250, y1 = 260
var xin = true, yin = true;
var step = 1
var delay = 20
var obj = document.getElementById("op")
function moveF() {
        if (!obj) {
                return;
        }
        var L = 0;
        var T = 0;
        var R = document.documentElement.clientWidth - obj.offsetWidth
        var B = document.documentElement.clientHeight - obj.offsetHeight
        obj.style.left = (x + document.documentElement.scrollLeft) + "px";
        obj.style.top = (y + document.documentElement.scrollTop) + "px";
        //		document.getElementById("op").style.right=x+"px";
        //		document.getElementById("op").style.top=y+"px";		
        x = x + step * (xin ? 1 : -1);
        if (x < L) { xin = true; x = L }
        if (x > R) { xin = false; x = R }
        y = y + step * (yin ? 1 : -1);
        if (y < T) { yin = true; y = T; }
        if (y > B) { yin = false; y = B }

        //setTimeout("moveF()",delay);
}
if (obj) {
        var itl = setInterval("moveF()", delay);
        obj.onmouseover = function () { clearInterval(itl) }
        obj.onmouseout = function () { itl = setInterval("moveF()", delay) }
}
function hidead() {
        document.getElementById("op").style.display = "none";
}
$('.category').on('click','.down li',function () {
        // var selectedData = {
        //         type:$(this).attr('type'),
        //         childType:$(this).attr('childType'),
        //         title:$(this).parent().prev().text()
        // }
        window.name = "type="+$(this).attr('type')+"&childType="+$(this).attr('childType')+"&title="+$(this).parent().prev().text();
        window.location.href = '/list';
        
}) 
// 顶部导航跳转 
$('.category').on('click','span',function () {
        // var selectedData = {
        //         title:$(this).text(),     
        //         type:$(this).next('.down').find('li').eq(0).attr('type'),
        //         childType:$(this).next('.down').find('li').eq(0).attr('childType')
        // }
        if($(this).text()=='学校简介'){
                window.name = "type=intro&childType=simple&title="+$(this).text();
        }else{
                window.name = "type="+$(this).next('.down').find('li').eq(0).attr('type')+"&childType="+$(this).next('.down').find('li').eq(0).attr('childType')+"&title="+$(this).text();
        }
        
        
        window.location.href = '/list';
        
})

// 首页标签跳转申报页面
// $('.shenbaoline').on('click','.list li',function () {
//         // console.log($(this).parent('.list').prev().find('b').text())
//         window.name = $(this).parent().prev().find('b').text();
//         window.location.href = '/index.html';
        
// })
