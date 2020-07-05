//购物车
$(() => {
    // console.log(datas)
    let user_id = localStorage.getItem("user_id") || "";
    let user_name = localStorage.getItem("user_name");
    //    console.log(user_id==="")===>true
    /* 发请求获取购物车的商品信息 */

    loadCart();

    function loadCart() {
        $(".shoplistdata").remove();
        $.ajax({
            url: "../server/getcart.php",
            data: { user_id },
            dataType: "json"
        }).done(data => {

            dataTool(data);
            if (user_name === null) {
                console.log(666)
            }
            if (user_id) {
                if (data.length !== 0) {
                    $(".kong").css("display", "none")
                    $(".content-shop").css("display", "block")
                } else {
                    $(".kong").css("display", "block")
                    $(".content-shop").css("display", "none")
                }
            }

            // if(user_id==="" ) {
            //     console.log(666)
            //      $(".kong").css("display","block")
            //      $(".content-shop").css("display","none")
            // }

        })
    }
    function dataTool(data) {
        let arr = [];
        data.forEach(item => {
            let result = arr.filter((ele) => ele.store == item.shopName)
            //   console.log(result)
            if (result.length == 0) {
                arr.push({ store: item.shopName, goods: [] })
                //   console.log("11",arr)
            }
        })
        //   console.log(arr)
        //把数据分到对应的商品店
        data.forEach(item => {
            arr.forEach(ele => {
                if (ele.store == item.shopName) {
                    ele.goods.push(item)
                }
            })
        })
        //  console.log(arr)
        createShop(arr)
    }

    function createShop(orderdata) {
        let html = "";

        orderdata.forEach(data => {
            let listhtml = data.goods.map(item => {
                return `
               <li class="item_pro" gid=${item.good_id}><input type="checkbox" class="in-2">
                   <img src=${item.img}
                       alt="">
                   <p>${item.title}</p>
                   <div class="price">￥<span class="newprice" data-price=${item.price}>${item.price}</span></div>
                   <div class="list_sum">
                       <a href="##" class="rem">-</a>
                       <span class="txt">${item.num}</span>
                       <a href="##" class="add">+</a>
                   </div>
                   <div class="sumprice">￥<span class="sumd">${item.price * item.num}</span></div>
                   <a href="##"  class="dol">X</a>
               </li> `}).join("")


            let cartshop = ` <div class="shoplistdata">
                                   <div class="shoplistdata-top">
                                    <span class="input-x"><input type="checkbox" class="xi"></span><span class="shopname">${data.store}</span>
                            </div><ul class="shopdata">${listhtml}</ul>
                            </div>`

            html += cartshop;
        })
        $(".shoplist").html(html)
    }

    //全选的功能：点击的时候，店名和商品都要选中，

    $("#all").click(function () {
        if (this.checked) {
            //点击全选，那就下面的单选框都全选上，2计算总价和总件数
            //   let allinput=  $(".shoplist").find("input[type=checkbox]")
            Array.from($(".shoplist :input")).forEach(item => {
                item.checked = "checked"
                computedTotal()

            })
            // console.log($(".tsum").text())
            // let osum=$(".tsum").text()
            //     $(".shoplist").on("change", ".in-2", function () {
            //         if(this.checked==false){
            //            osum-= $(this).parent().find(".sumd").text() * 1
            //            $(".tsum").text(osum.toFixed(2))
            //         }

            //     })

            // $(".tsum").text(osum.toFixed(2));
        } else {
            Array.from($(".shoplist :input")).forEach(item => {
                item.checked = ""
                computedTotal()
            })

        }
    })



    //点击商店的全选，该商店的所有商品被勾选上，并且计算总价和总件数
    $(".shoplist").on("click", ".xi", function () {
        let arr = $(this).parents(".shoplist").find(".xi");
        let shopdan = $(this).parents(".shoplistdata").find(".in-2");
        if (this.checked) {
            total = 0;
            totalPrice = 0;
            Array.from(shopdan).forEach(item => {
                item.checked = "checked";
            })

            if (Array.from(arr).every(ischeck)) {
                $("#all")[0].checked = true;
            }
            // console.log($(this).parents(".shoplistdata").find(".txt"))
            // Array.from($(this).parents(".shoplistdata").find(".txt")).forEach(item => {
            //     total += item.innerText * 1
            // })
            // Array.from($(this).parents(".shoplistdata").find(".sumd")).forEach(item => {
            //     totalPrice += item.innerText * 1
            // })
            computedTotal()
        } else {


            Array.from(shopdan).forEach(item => {
                item.checked = "";

            })
            if (!Array.from(arr).every(ischeck)) {
                $("#all")[0].checked = false;
            }
            // Array.from($(this).parents(".shoplistdata").find(".txt")).forEach(item => {
            //     total -= item.innerText * 1
            // })
            // Array.from($(this).parents(".shoplistdata").find(".sumd")).forEach(item => {
            //     totalPrice -= item.innerText * 1
            // })
            computedTotal()
        }
        // $(".num").text(total);
        // $(".tsum").text(totalPrice.toFixed(2));
    })


    //单选中的状态，全部选上就店名选上
    $(".shoplist").on("change", ".in-2", function () {
        let arr = $(this).parents(".shoplistdata").find(".in-2")
        let arr1 = $(this).parents(".shoplist").find(".xi")

        if (this.checked) {

            // total += $(this).parent().find(".txt").text() * 1
            // totalPrice += $(this).parent().find(".sumd").text() * 1
            if (Array.from(arr).every(ischeck)) {
                $(this).parents(".shoplistdata").find(".xi")[0].checked = true;
            }
            if (Array.from(arr1).every(ischeck)) {
                $("#all")[0].checked = true;
            }
            computedTotal()
        } else {
            // console.log($("#all").is(checked))

            // total -= $(this).parent().find(".txt").text() * 1
            // totalPrice -= $(this).parent().find(".sumd").text() * 1
            if (!Array.from(arr).every(ischeck)) {
                $(this).parents(".shoplistdata").find(".xi")[0].checked = false;
            }
            if (!Array.from(arr1).every(ischeck)) {
                $("#all")[0].checked = false;
            }
            computedTotal()
        }
        // $(".num").text(total);
        // $(".tsum").text(totalPrice.toFixed(2));


    })

    function ischeck(item) {
        return item.checked == true
    }

    //商品数量改变，增减事件，并更新数据库
    $(".shoplist").on("click", ".rem,.add", function () {
        /* 更改数量|发送网络请求 */
        let count;
        if (this.className == "add") {

            count = $(this).prev().text() * 1 + 1;
            $(this).prev().text(count);
            if ($(this).next().text() * 1 > 1) {
                $(this).css("color", "#845f3f")
            }
        } else {

            if ($(this).next().text() * 1 == 1) {
                count = 1;
            } else if ($(this).next().text() * 1 > 1) {
                count = $(this).next().text() * 1 - 1;
            }
            $(this).next().text(count);
        }

        let price = $(this).parents(".item_pro").find(".newprice").text() * 1;
        console.log(price * count)
        $(this).parents(".item_pro").find(".sumd").text(price * count);
        let gid = $(this).parents(".item_pro").attr("gid");
        console.log(localStorage.user_id, gid)
        updateCartData(this.className, gid, localStorage.user_id);
        computedTotal();
    });

    function updateCartData(flag, good_id, user_id) {
        $.ajax({
            url: "../server/upcart.php",
            data: {
                type: "update",
                flag,
                user_id,
                good_id,
            },
            success: function () {
                window.location.reload()
            }
        });
    }

    /* 删除功能 */
    $("body").on("click", ".dol", function () {
        if (confirm('确定要删除吗') == true) {

            let good_id = $(this).parents(".item_pro").attr("gid");
            $.ajax({
                url: "../server/upcart.php",
                data: { type: "del", good_id, user_id: localStorage.user_id },
                dataType: "json",
                success: function (response) {
                    console.log(response);
                    loadCart();
                }
            });

        } else {

            return false;

        }

    })

    function computedTotal() {
        let ele = $(".item_pro").filter(function () {
            return $(".in-2", this).prop("checked") == true;

        })
        if (ele.length > 0) {
            $(".settlement").css({
                "background": "#a9010d",
                "color": "#fff"
            })
            //结算功能
            $(".settlement").click(function () {
                if(confirm(`您好，您购买了${$(".num").text()}件商品，总共是${$(".tsum").text()}元，是否要结算商品？`)){
                    location.href =" https://www.baidu.com/"
                }else{
                    return false
                }
            })
        } else if (ele.length < 1) {
            $(".settlement").css({
                background: "",
                color: ""
            })
        }
        // console.log(ele)
        // /* 计算数量 */
        let total = 0;
        let totalPrice = 0;
        ele.each(function (index, item) {
            // console.log(index, $(item).find(".txt").text(), $(item).find(".sumd").text());
            total += $(item).find(".txt").text() * 1;
            totalPrice += $(item).find(".sumd").text() * 1;
        })
        console.log(total, totalPrice)
        $(".num").text(total);
        $(".tsum").text(totalPrice.toFixed(2));
    }


})

