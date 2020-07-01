//商品列表
$(() => {
    class shoprun {
        constructor(data) {
            //获取后端的数据
            this.data = data
        }
        //初始状态
        init() {
            this.createElement()
        }
        createElement() {
            var arr = this.data.map(item => {
                // console.log(item.imgsrc)
                return `   <li data-id=${item.good_id}>
            <div class="img-top">                      
             <img src="${item.img}" alt="">
              <p>${item.title}</p>
               <p class="price"><span>￥</span><span class="newprice">${item.price}</span></p>
               <button>加入购物车</button>
            </div> 
        </li>` }).join("")
           
            $(".seckill-1").html(arr)
        }
    }

    $.ajax({
        url: "../server/shoplist1.php",
        dataType: "json",
    }).done(data => {
        
        let slider = new shoprun(data)
        slider.init()
    })
    //2点击加入购物车的点击事件
    $(".seckill-1").on("click","button",function(){
      
         //先判断是否登录了
         let user_id = localStorage.getItem("user_id") || "";
         let user_name = localStorage.getItem("user_name") || "";
         let good_id=$(this).parent().parent().attr("data-id");
         console.log(good_id) 
         if(user_id && user_name){
             //发生请求，执行添加到购物车
            $.ajax({
                url:"../server/addcart.php",
                data:{user_id, good_id },
            }).done(data =>{
                console.log("返回值",data)
                window.location.reload();
            })
         }else{
             //跳转到登录页面
             location.href="../html/logn.html"
         }
       
    })
    /* 3、点击按钮的时候加入购物车 */
    $(".gou").click(function() {
        location.href = "./Shopping Cart.html"
    })
})