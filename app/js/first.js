function getdatalist() {
    $.ajax({
            url: '/getAllContent',
            type: 'get',
            dataType:'json',
            success: function (res) {
                    //校园快讯
                    var contentListOne = '';
                    res.newslist&&res.newslist.news.length>0&&res.newslist.news.slice(0,6).map(function (item) {
                            contentListOne += "<li type='newslist' childType='news'><span class='left'><a href='/detail/"+item.title+"'>"+item.title+"</a></span><span class='date'>"+item.time+"</span></li>"
                    })
                    $('.apiLine .news .list').html(contentListOne);
                    
                    //通知公告
                    var contentListTwo = '';
                    res.newslist&&res.newslist.notice.length>0&&res.newslist.notice.slice(0,6).map(function (item) {
                        contentListTwo += "<li type='newslist' childType='notice'><span class='left'><a href='/detail/"+item.title+"'>"+item.title+"</a></span><span class='date'>"+item.time+"</span></li>"
                    })
                    $('.apiLine .notice .list').html(contentListTwo);
                    //教育教学
                    var contentListThree = '';
                    res.one&&res.one.first.length>0&&res.one.first.slice(0,6).map(function (item) {
                        contentListThree += "<li type='one' childType='first'><span class='left'><a href='/detail/"+item.title+"'>"+item.title+"</a></span><span class='date'>"+item.time+"</span></li>"
                    })
                    $('.apiLine .tech .list').html(contentListThree);
                    // 技能实训
                    var contentListFour = '';
                    res.two&&res.two.first.length>0&&res.two.first.slice(0,6).map(function (item) {
                        contentListFour += "<li type='two' childType='first'><span class='left'><a href='/detail/"+item.title+"'>"+item.title+"</a></span><span class='date'>"+item.time+"</span></li>"
                    })
                    $('.apiLine .skill .list').html(contentListFour);
                    // 教学研究
                    var contentListFive = '';
                    res.three&&res.three.first.length>0&&res.three.first.slice(0,6).map(function (item) {
                        contentListFive += "<li type='three' childType='first'><span class='left'><a href='/detail/"+item.title+"'>"+item.title+"</a></span><span class='date'>"+item.time+"</span></li>"
                    })
                    $('.apiLine .research .list').html(contentListFive);
                     // 德育工作
                     var contentListSix = '';
                     res.four&&res.four.first.length>0&&res.four.first.slice(0,6).map(function (item) {
                         contentListSix += "<li type='four' childType='first'><span class='left'><a href='/detail/"+item.title+"'>"+item.title+"</a></span><span class='date'>"+item.time+"</span></li>"
                     })
                     $('.apiLine .work .list').html(contentListSix);
                      // 创业园地
                      var contentListSeven = '';
                      res.five&&res.five.first.length>0&&res.five.first.slice(0,6).map(function (item) {
                          contentListSeven += "<li type='five' childType='first'><span class='left'><a href='/detail/"+item.title+"'>"+item.title+"</a></span><span class='date'>"+item.time+"</span></li>"
                      })
                      $('.apiLine .career .list').html(contentListSeven);
            }
    })
}
getdatalist()
$('.shenbao .list').on('click','li',function(){
    window.name = "type="+$(this).attr('type')+"&childType="+$(this).attr('childType')+"&title="+$(this).find('.left').text();
})


