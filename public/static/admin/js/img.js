$(".news_pic").on('change','.inputstyle',function(){
    var obj  = $(this);
    var file = $(this).val();
    setImagePreview(obj);
});
//实现实时预览的函数
 function setImagePreview(obj) {
    var docObj = obj;
    var uploadfile_box = obj.parent();
    var box_parent = uploadfile_box.parent();
    var height = uploadfile_box[0].clientHeight + 3;
    //var docObj = $(".inputstyle");
    var divs = obj.parent().parent().find('.pre-img');
    //img
    var imgObjPreview =divs.find('img');
    //var imgObjPreview = document.getElementById("preview");
    //div
    //var divs = document.getElementById("localImag");
    if (docObj[0]['files'] && docObj[0]['files'][0]) {
      divs.css('top',-height);
      box_parent.css('height',height);
      uploadfile_box.css('opacity',0);
      imgObjPreview.css('opacity',1);
      imgObjPreview.css('display','block');
      imgObjPreview.css('width','100%');
      imgObjPreview.css('height','100%');
       //火狐下，直接设img属性
       // imgObjPreview.style.display = 'block';
       // imgObjPreview.style.width  = '100%';
       // imgObjPreview.style.height = '100%';
       //火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式
       var src = window.URL.createObjectURL(docObj[0]['files'][0]);
       imgObjPreview.attr('src',src);
     } else {
        uploadfile_box.css('opacity',1);
        imgObjPreview.css('opacity',0);
        imgObjPreview.attr('src',src);
       //IE下，使用滤镜
       // docObj.select();
       // var imgSrc = document.selection.createRange().text;
       // var localImagId = document.getElementById("localImag");
       // //必须设置初始大小
       // localImagId.style.width  = "100%";
       // localImagId.style.height = "100%";
       // //图片异常的捕捉，防止用户修改后缀来伪造图片
       // try {
       //     localImagId.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)"
       //     localImagId.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
       //  } catch(e) {
       //      alert("您上传的图片格式不正确，请重新选择!");
       //      return false;
       //  }
       //  imgObjPreview.style.display = 'none';
       //  document.selection.empty();
    }
    divs.css("display", 'inline-block');
    return true;
}