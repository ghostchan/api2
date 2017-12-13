$(function(){
    //修改
    $(".js_sel").click(function(){
        var id=$(this).parent().parent().attr("data-id");
        var url=$(this).parent().parent().attr("data-url");
        var url_info=$(this).parent().parent().attr("data-desc");
        var param=$(this).parent().parent().attr("data-param");
    
        $("#desc").val("");
        $("#apiurl").val("");
        $("#param").val("");
        $(".js_update").attr("data-id","");
        
        $("#modalTitle").text("修改");
        $("#desc").val(url_info);
        $("#apiurl").val(url);
        $("#param").val(param);
        $(".js_update").attr("data-id",id);
    
        $("#selModal").modal('show');
    });

    //删除
    $(".js_del").click(function(){
        var id=$(this).parent().parent().attr("data-id");
        $.ajax({
            type: "post",
            url: "/del",
            data: {id:id},
            dataType: "json",
            success: function(data){
                if(data){
                    if(data.status==1){
                        // toastr.success(data.msg);
                        window.location.reload();
                    }else{
                        toastr.error(data.msg);
                    }
                }
                
            }
        });
    });

    //修改或新建保存
    $(".js_update").click(function(){
        var desc = $("#desc").val();
        var url=$("#apiurl").val();
        var param=$("#param").val();
        var id=$(".js_update").attr("data-id");
        var _url="";
        if(!id){
            //新建
            _url="/add";
        }else{
            //修改
            _url="/update";
        }
        console.log(desc,url,param,id);
        $.ajax({
            type: "post",
            url: _url,
            data: {id:id,desc:desc,url:url,param:param},
            dataType: "json",
            success: function(data){
                if(data){
                    if(data.status==1){
                        // toastr.success(data.msg);
                        window.location.reload();
                    }else{
                        toastr.error(data.msg);
                    }
                }
            }
        });
    });

    //新建
    $(".js_create").click(function(){
        $("#desc").val("");
        $("#apiurl").val("");
        $("#param").val("");
        $(".js_update").attr("data-id","");
        $("#modalTitle").text("新建");
        $("#selModal").modal('show');
    });
});