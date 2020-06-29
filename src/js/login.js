//监听加载
$(()=>{
    /* 获取登录按钮，添加事件 */
    $("#submit-t").click(function() {
        let username = $.trim($("#user").val());
        let password = $.trim($("#pwd").val());

        /* 先检查用户名和密码和是否勾选，都满足则发请求 */
        if (username.length == 0) {
            alert("用户名不能为空");
            return
        }

        if (password.length == 0) {
            alert("密码不能为空");
            return;
        }
        $.ajax({
            type: "post",
            url: "../server/login.php",
            dataType: "json",
            data: `username=${username}&password=${md5(password).slice(0,15)}`
        }).done(data => {
            // alert(data.msg);
            /* 如果 */
            if (data.status == "success") {
                alert(data.msg);
              /* (1) 要把用户的id和名字保存起来 */
        //  localStorage.setItem("user_id", data.data.userId);
        //  localStorage.setItem("user_name", data.data.username);

          /* (2) 跳转回列表页 */
        //    location.href = "../html/index.html";
            } else {
                alert(data.msg);
            }
        })

    })

})