//公共检查登录是否登录
$(() => {
    var tsum = 0;
    /* 登录状态的处理 */
    /* 检查本地是否保存user_id和user_name的值，如果本地有，那么表示当前是登录状态 */
    /* 如果没有，那么表示当前是未登录的状态 */
    let user_id = localStorage.getItem("user_id") || "";
    let user_name = localStorage.getItem("user_name") || "";
    // console.log(user_id, user_name);
    if (user_id && user_name) {
        $(".header-top ul li:first-child").html(`<i class="iconfont icon-touxiang f1"></i><span>${user_name}.会员</span> <i class="iconfont icon-xialatubiao f2"></i>`).removeClass().addClass("act")
     $(".header-top ul").addClass("ul-1")
     $.ajax({
        url: "../server/getcart.php",
        data: { user_id },
        dataType: "json"
    }).done(data => {
        console.log(data)
        data.map(item=>{
            tsum +=Number(item.num)
        })
        console.log(tsum)
     
        $(".gou").next().html(tsum)
     
        // data = dataTool(data);
    })
    } else {

        $(".header-top ul").removeClass()
        $(".header-top ul li:first-child").html("<a href='./logn.html'>登录</a><a href='./Regi.html'>注册</a>").removeClass().addClass("act2")
        $(".gou").next().css("display","none")
    }

     //注销 
    $(".act").mouseenter(function () { 
        $(".lognout").slideDown(100,function(){
            $(".lognout").click(function(){
                localStorage.removeItem("user_id")
                localStorage.removeItem("user_name");
                /* 重新加载 */
                window.location.reload();
            })
        })
    });
    $(".lognout").mouseleave(function () {
            $(".lognout").slideUp(100)
    }) 

    //点击标题小米进入主页
    $(".nav-first").click(function(){
        location.href="../html/index.html"
    })
     /* 3、点击按钮的时候加入购物车 */
     $(".gou").click(function() {
        location.href = "./Shopping Cart.html"
    })
   
})