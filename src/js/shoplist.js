//商品列表
$(() => {
      /* 获取总页码的数量 */
      getPageCount();
     let dum =0;
      function getPageCount() {
          $.ajax({
              type: "get",
              url: "../server/getPageCount.php",
              success: function(response) {
                //   console.log("页码", response);
               dum=response
                  /* 创建页码 */
                  let pageStr = "";
                  for (let i = 0; i < response; i++) {
                      pageStr += `<li class='p-class ${i == 0 ? "active":""}'><a href="javascript:void(0)">${i+1}</a></li>`;
                  }
                  $(pageStr).insertBefore("#nextPage");
              }
          });
      }
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
                return `   <li class="tb" data-id=${item.good_id}>
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
    getDataAndRenderUI("default");
    // $.ajax({
    //     url: "../server/shoplist1.php",
    //     dataType: "json",
    // }).done(data => {
        
    //     let slider = new shoprun(data)
    //     slider.init()
    // })
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
    function getDataAndRenderUI(sort,page=0) {
        $.ajax({
            
            url: "../server/shoplipaixu.php",
            data: {
                sort,
                page: page
            },
            // data: "sort=" + sort,
            dataType: "json",
            success: function(data) {
                let slider = new shoprun(data)
                slider.init()
                
            }
        });

    }
    /* 3、点击按钮的时候加入购物车 */
    $(".gou").click(function() {
        location.href = "./Shopping Cart.html"
    })

    /*4.点击商品进入商品详情页*/
    $(".seckill-1").on("click","li",function(){
        location.href = "./shop.html"
    })
    /*5.排序功能*/
     $(".paixu >span").click(function() {

        /* 设置选中状态 */
        $(this).addClass("ur").siblings().removeClass("ur");
        // let sortType = $(this).attr("data-sort");
        let sortType = $(this).data().sort;
        console.log("sortType", sortType);

        getDataAndRenderUI(sortType);

        /* 发送网络请求：请求排序后的数据 */
        // $.ajax({
        //     type: "get",
        //     url: "../server/shoplipaixu.php",
        //     data: "sort=" + sortType,
        //     dataType: "json",
        //     success: function(data) {
               
                
        //         let slider = new shoprun(data)
        //         slider.init()
                
        //     }
        // });
    })
    /* 5、分页功能 */
    $(".pagination").on("click", ".p-class", function(e) {

        /* 排除上一页和下一页的页面点击事件 */
        // if ($(this).parent()[0].id == "prevPage" || $(this).parent()[0].id == "nextPage") return;

        /* 设置选中状态的切换 */
        $(this).addClass("active").siblings().removeClass("active");
        let page = $(this).text() * 1 - 1;
        // console.log(page);
        getDataAndRenderUI($(".ur").data().sort, page)
    })


    /* 上一页和下一页的功能 */
    $("#prevPage,#nextPage").click(function() {
         
        /* 设置选中状态 */
        let page = $(".active").text() * 1 - 1;
        console.log(dum)
        if (this.id == "prevPage") {
            if(page>0){
                 page--;
            }
           
        } else if (this.id == "nextPage") {
            if(page<dum-1){
                  page++;
            }
        }

        $(".p-class").eq(page).addClass("active").siblings().removeClass("active")
        getDataAndRenderUI($(".ur").data().sort, page)
    })

})