

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head><meta http-equiv="Content-Type" content="text/html; charset=gb2312" /><title>

</title><link href="../style/css/style.css" rel="stylesheet" />
    <script src="../js/jquery.js"></script>
    <!--弹窗-->
    <script src="../Script/lhgdialog/lhgcore.lhgdialog.min.js?skin=iblue"></script>
    <style type="text/css">
        .dir {
            width: 24px;
            height: 24px;
            float: left;
        }

        .click {
            background-color: #2b8fd8;
        }

        .add {
            cursor: pointer;
        }
    </style>
    <script type="text/javascript">
        $(function () {
            //双击行
            $("#tab").find("tr[class=add]").live("click", function () {
                var obj = {};
                obj.types = $(this).attr("types");
                obj.names = $(this).attr("name");
                obj.values = $(this).attr("values");
                WebShow(obj);
            });
        })
        //#region 在线预览
        function WebShow(obj) {
            var src = obj.values;//地址
            var type = obj.types;//类型
            var name = obj.names;//名字
            var objs = new Object();
            objs.src = src;
            objs.type = type;
            objs.name = name;
            switch (type) {
                case "文件夹":
                    dirdialog(objs);
                    break;
                case ".jpg":
                    imagedialog(objs);
                    break;
                case ".png":
                    imagedialog(objs);
                    break;
                case ".gif":
                    imagedialog(objs);
                    break;
                case ".bmp":
                    imagedialog(objs);
                    break;
                case ".swf":
                    FLashShow(objs);
                    break;
                case ".flv":
                    FLashShow(objs);
                    break;
                case ".f4v":
                    FLashShow(objs);
                    break;
                case ".mov":
                    FLashShow(objs);
                    break;
                case ".mp4":
                    FLashShow(objs);
                    break;
                case ".3pg":
                    FLashShow(objs);
                    break;
            }
        }
        //#endregion

        //#region 打开文件夹
        function dirdialog(obj) {
            var src = "FlashShow.aspx?types=GetDirFile&name=123&src=" + obj.src + "";
            src = encodeURI(src);
            $(window.parent.document).find("#iframes").attr("src", src);
        }
        //#endregion


        //#region 图片弹层
        function imagedialog(obj) {
            var src = 'FlashShow.aspx?name=' + obj.name + "&src=" + obj.src + "&types=image";
            src = encodeURI(src);
            $(window.parent.document).find("#iframes").attr("src", src);
        }
        //#endregion

        //#region 动画视频预览
        function FLashShow(obj) {
            var src = 'FlashShow.aspx?name=' + obj.name + "&src=" + obj.src + "&types=" + obj.type
            src = encodeURI(src);
            $(window.parent.document).find("#iframes").attr("src", src);
        }
        //#endregion 
    </script>
</head>
<body> 
    <form method="post" action="FlashShow.aspx?types=GetFisrtPath&amp;name=%27%27&amp;src=%27%27" id="form1">
<div class="aspNetHidden">
<input type="hidden" name="__VIEWSTATE" id="__VIEWSTATE" value="/wEPDwUKMTc1NzMzMzgyNA9kFgICAw9kFgYCAQ8WAh4HVmlzaWJsZWhkAgMPFgIfAGhkAgUPFgIfAGhkZODvwni1xDadutKfauQ6h7ge7sz78yJ4kX/A/oiBNEQU" />
</div>

<div class="aspNetHidden">

	<input type="hidden" name="__VIEWSTATEGENERATOR" id="__VIEWSTATEGENERATOR" value="92C38378" />
</div>
        <script src="../js/svfobject.js"></script>
        <!--视频-->
        
        <!--动画-->
        
        
        
        
        <div id="dir" class="">
            <table class="tab_01" id="tab" style="width: 99%">
                <tr>
                    <th>名称</th>
                    
                    
                    
                </tr>
                <tr class='add' values='zzcl\\1.学校管理' name='1.学校管理' types='文件夹'><td style='text-align:left'><img class='dir' src='Style/image/dir.png'/>&nbsp&nbsp1.学校管理</td></tr><tr class='add' values='zzcl\\2.基础条件' name='2.基础条件' types='文件夹'><td style='text-align:left'><img class='dir' src='Style/image/dir.png'/>&nbsp&nbsp2.基础条件</td></tr><tr class='add' values='zzcl\\3.校企合作' name='3.校企合作' types='文件夹'><td style='text-align:left'><img class='dir' src='Style/image/dir.png'/>&nbsp&nbsp3.校企合作</td></tr><tr class='add' values='zzcl\\4.教育教学' name='4.教育教学' types='文件夹'><td style='text-align:left'><img class='dir' src='Style/image/dir.png'/>&nbsp&nbsp4.教育教学</td></tr><tr class='add' values='zzcl\\5.办学效益' name='5.办学效益' types='文件夹'><td style='text-align:left'><img class='dir' src='Style/image/dir.png'/>&nbsp&nbsp5.办学效益</td></tr>
            </table>
        </div>
    </form>
</body>
</html>
