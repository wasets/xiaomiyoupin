/*监听页面的加载，等页面加载完在执行代码*/
$(() => {
    $("#user").val("zs")
    $("#pwd").val(123456)
    $("#pwd-confi").val(123456)
    $("#iphone").val(13926291888)

    let imgCode;
    /*不传值，统一走默认值*/
    let captcha = new Captcha({
        lineWidth: 1, //线条宽度
        lineNum: 2, //线条数量
        // dotR: 200, //点的半径
        // dotNum: 1000, //点的数量
        preGroundColor: [10, 80], //前景色区间
        backGroundColor: [150, 250], //背景色区间
        fontSize: 40, //字体大小
        fontFamily: ['Georgia', '微软雅黑', 'Helvetica', 'Arial'], //字体类型
        fontStyle: 'stroke', //字体绘制方法，有fill和stroke
        content: '0123456789', //验证码内容
        length: 4 //验证码长度
    });

    captcha.draw(document.querySelector('#captcha'), r => {
        // console.log('验证码', r);
        imgCode = r;

        /* 自动触发标签的事件 */
        $("#imageCode").trigger("blur");
    });

    // (1) 正则校验
    // (2) 事件处理(表单)
    // (3) 图形验证码
    /* 思路：给输入框添加事件(失去焦点)监听，当失去焦点的时候，应该获取输入框的内容进行正则校验 */
    let options = {
        "user": { reg: `/^[a-zA-Z]{2,6}$/.test(val)` },
        "imgcoke": { reg: "imgCode == val" },
        "pwd": { reg: `/^[a-zA-Z0-9]{6,8}/.test(val)` },
        "pwd-confi": { reg: `$.trim($("#pwd").val()) === val` },
        "iphone": { reg: `/^1[3-9]\\d{9}$/.test(val)` }
    }
    // $(".regcont input").blur(function () {
    //     let action = this.id;
    //     let val = $.trim($(this).val());
    //     console.log(options[action]);
    //     if (!eval(options[action].reg)) {
    //         if ($(this).next == $("p")) {
    //             $(this).next().css("display", "block")               
    //         } else {
    //             $(this).next().next().css("display", "block")
    //         }
    //         $(this).css("border", "1px solid red")
    //     } else {
    //         if ($(this).next == $("p")) {
    //             $(this).next().css("display", "none")             
    //         } else {
    //             $(this).next().next().css("display", "none")
    //         }
    //         $(this).css("border", "1px solid #e8e8e8")
    //     }
    // });
  
    $(".regcont input[type=text]").blur(function () {
        let action = this.id;
        let val = $.trim($(this).val());
        // console.log(options[action],action);
        if (eval(options[action].reg)) {
            if ($(this).next() == $("p")) {
                 $(this).next().css("display", "none")
            } else {
                $(this).parent().find("p").css("display", "none")
            }
            // console.log( $(this))
            $(this).removeClass("action")
        } else {
             if($(this).next()==$("p")){
                $(this).next().css("display", "block")
             }else{
                 $(this).parent().find("p").css("display","block")
             }
            $(this).addClass("action")
       
    }
    });
        
/* 图形验证码 */
/* [1] 先下载和引用插件 */
/* [2] 在页面中指定的位置提供canvas标签 */
/* [3] 在js代码中调用插件中提供的构造函数创建实例对象，并且调用draw方法 */


/* 注册按钮的点击事件 */
$(".submit-t").click(function () {
    /* 001-检查用户是否输入了正确的信息并且通过验证，如果没有通过那么就返回 */
    //  console.log(666)
    $("#user,#imgcoke,#pwd,#pwd-confi,#iphone").trigger("blur");
    if ($(".action").length != 0) {
        return;
    }

    let data = {
            username: $.trim($("#user").val()),
            phone: $.trim($("#iphone").val()),
            password: md5($.trim($("#pwd").val())).slice(0, 15)
        }
      console.log(data)
        /* [3] 发送网络请求去执行注册 */
     $.ajax({
            url: "../server/res.php",
            type: "post",
            data,
            dataType: "json",
        }).done(data => {
            if (data.status == "success") {
                alert("注册成功!");
                location.href = "../html/logn.html";
            } else {
                alert(data.msg);
            }
        })
    });


})