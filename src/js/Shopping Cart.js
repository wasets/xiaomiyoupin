//购物车
$(()=>{
    // console.log(datas)
    let user_id = localStorage.getItem("user_id") || "";
      console.log(user_id)
    /* 发请求获取购物车的商品信息 */
    $.ajax({
        url: "../server/getcart.php",
        data: { user_id },
        dataType: "json"
    }).done(data => {
        console.log(data)
        dataTool(data);
        //来判断是否购物车有商品，来切换
    //    if(user_id && data){
    //        $(".kong").css("display","none")
    //    }else{
    //        $(".kong").css("display","block")
    //    }
     
    })

  function dataTool(data) {
      let arr =[];
      data.forEach(item=>{
          let result=arr.filter((ele)=>ele.store ==item.shopName)
        //   console.log(result)
          if(result.length == 0){
              arr.push({store:item.shopName,goods:[]})
            //   console.log("11",arr)
          }
      })
    //   console.log(arr)
      //把数据分到对应的商品店
      data.forEach(item=>{
          arr.forEach(ele=>{
              if(ele.store==item.shopName){
                  ele.goods.push(item)
              }
          })
      })
     console.log(arr)
       createShop(arr)
    }
   
     function createShop(orderdata) {
         let html = "";
         
        orderdata.forEach(data =>{
           let listhtml = data.goods.map(item =>{
               return`
               <li gid=${item.good_id}><input type="checkbox" class="in-2">
                   <img src=${item.img}
                       alt="">
                   <p>${item.title}</p>
                   <div class="price">￥<span class="newprice">${item.price}</span></div>
                   <div class="list_sum">
                       <a href="#" class="rem">-</a>
                       <span class="txt">${item.num}</span>
                       <a href="#" class="add">+</a>
                   </div>
                   <div class="sumprice">￥<span class="sumd">${item.price*item.num}</span></div>
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
     

})