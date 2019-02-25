var file;
var fake_file = '<input type="file"  class="inputstyle check_file"  accept="image/*" />';
$(".img-parent").on('change','.inputstyle',function(){
    var obj = $(this);
    var class_name = obj.attr('data-class');
    var uploadfile_box = $("." + class_name);
    var obj_parent = uploadfile_box.find('.fake-file');
    var real_file_parent = obj_parent.next('.real-file');

    var tmpfile = $(this).val();
    if(tmpfile != '' && tmpfile != null){
      file = obj;
      real_file_parent.html(file);
      obj_parent.html(fake_file);
      obj_parent.find('.fake_file').removeAttr('required');
      obj_parent.find('.fake_file').removeAttr('name');
    }
    console.log(real_file_parent.find('input'));
    setImagePreview(obj,class_name);
});
//实现实时预览的函数
 function setImagePreview(obj,class_name) {
    var docObj = obj;
    var uploadfile_box = $("." + class_name);
    console.log(obj);
    var box_parent = uploadfile_box.parent();
    var height = uploadfile_box[0].clientHeight + 3;
    //var docObj = $(".inputstyle");
    var divs = uploadfile_box.parent().find('.pre-img');
    //img
    var imgObjPreview =divs.find('img');
    //var imgObjPreview = document.getElementById("preview");
    //div
    //var divs = document.getElementById("localImag");
    if (docObj[0]['files'] && docObj[0]['files'][0]) {
      var src = window.URL.createObjectURL(docObj[0]['files'][0]);
      var value = obj.val();
      var point  = value.lastIndexOf(".");
      var length = value.length;
      var suffix = value.substring(point+1,length);//后缀名
      if(suffix.toLowerCase() == 'mp4' || suffix.toLowerCase()  == 'rmvb' || suffix.toLowerCase()  == 'avi' || suffix.toLowerCase()  == ' flv'){
        imgObjPreview = divs.find('.fake-video');
        imgObjPreview.html(docObj[0]['files'][0]['name']);
      }
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
      imgObjPreview.attr('src',src);
    } else {
      src = '';
      uploadfile_box.css('opacity',1);
      imgObjPreview.css('opacity',0);
      imgObjPreview.attr('src',src);
      // alert(666);
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
var test = '';
var example = '<input type="file" class="test" />';
$(".test-div").on('change','.test',function(e){
    var obj = $(this);
    
    var tmpfile = $(this).val();
    console.log(tmpfile)
    if(tmpfile != '' && tmpfile != null){
      test = obj;
      alert(6666)
      $('.test-div2').html(test);
      $('.test-div').html(example);
      $('.test-div2').find('.test').attr('required','required');
      $('.test-div2').find('.test').attr('name','bannerfile[]');

    }
    console.log(obj)
    console.log(test)
    //testImagePreview(obj);
});
function testImagePreview(obj) {
  var docObj = obj;
    if (docObj[0]['files'] && docObj[0]['files'][0]) {
      
    } else {
      console.log(test)
      obj.html(test);
    }
    return true;
}