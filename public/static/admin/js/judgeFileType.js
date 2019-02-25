/**
 * Created by Administrator on 2018/8/17.
 */
//图片文件格式判断开始
var isIE = /msie/i.test(navigator.userAgent) && !window.opera;
function fileChange(target,id) {
    var fileSize = 0;
    //var filetypes =[".jpg",".png",".rar",".txt",".zip",".doc",".ppt",".xls",".pdf",".docx",".xlsx"];
    var filetypes =[".jpg",".png",".gif"];
    var filepath = target.value;
    var filemaxsize = 1024*2;//2M
    if(filepath){
        var isnext = false;
        var fileend = filepath.substring(filepath.lastIndexOf("."));
        if(filetypes && filetypes.length>0){
            for(var i =0; i<filetypes.length;i++){
                if(filetypes[i]==fileend){
                    isnext = true;
                    break;
                }
            }
        }
        if(!isnext){
            layer.alert("不接受此文件类型！");
            target.value ="";
            return false;
        }
    }else{
        return false;
    }
    if (isIE && !target.files) {
        var filePath = target.value;
        var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
        if(!fileSystem.FileExists(filePath)){
            layer.alert("附件不存在，请重新输入！");
            return false;
        }
        var file = fileSystem.GetFile (filePath);
        fileSize = file.Size;
    } else {
        fileSize = target.files[0].size;
    }

    var size = fileSize / 1024;
    if(size>filemaxsize){
        layer.alert("附件大小不能大于"+filemaxsize/1024+"M！");
        target.value ="";
        return false;
    }
    if(size<=0){
        layer.msg("附件大小不能为0M！");
        target.value ="";
        return false;
    }
}
