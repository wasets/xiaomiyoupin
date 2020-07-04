//商品详情页
$(()=>{

    class Shop {
        constructor () {
          // 找各种元素对象
          this.container = document.querySelector('.content')
          this.box = document.querySelector('.fl')
          this.girl = document.querySelector('#girl')
          this.span = this.box.querySelector('span')
          this.imgList = document.querySelector('.thumb-container').children
          this.priceList = document.querySelector('.size-container').children
          this.addBtn = document.querySelector('#add')
          this.subBtn = document.querySelector('#rem')
          this.okBtn = document.querySelector('.okBtn')
          this.bigBox = document.querySelector('#bigBox')
          this.bigImg = bigBox.querySelector('img')
          this.numWrap = document.querySelector('.count-input')
          this.num = Number(this.numWrap.value)
          
          // 放大镜
          this.zoom()
        //   // 切换商品属性事件
          this.changeGirlEvents()
        //   // 数量加减事件
          this.changeNum()
        //   // 加购物车
          this.addToCart()
        }
        zoom () {
          // 放大镜
          this.box.onmouseenter = () => {
              console.log(666)
              this.toggle('block')
            }
            this.box.onmouseleave = () => {
              this.toggle('none')
            }
            // 这里函数里并没有操作box，希望this仍然指向外层，所以用箭头函数
            this.box.onmousemove = e => {
              e = e || window.event
              this.move(e)
            }
        }
        toggle (display) {
            // toggle 切换的意思
            this.span.style.display = display
            this.bigBox.style.display = display
          }
          move (e) {
            // 鼠标距离浏览器边缘距离减去盒子到边缘的距离得到鼠标到盒子边缘的坐标
            var left = e.pageX - this.box.offsetLeft - this.container.offsetLeft - this.span.offsetWidth / 2
            var top = e.pageY - this.box.offsetTop - this.container.offsetTop - this.span.offsetHeight / 2
            // 限定范围
            if (left < 0) left = 0
            if (top < 0) top = 0
            if (left > this.box.clientWidth - this.span.offsetWidth) left = this.box.clientWidth - this.span.offsetWidth
            if (top > this.box.clientHeight - this.span.offsetHeight) top = this.box.clientHeight - this.span.offsetHeight
            this.span.style.left = left + 'px'
            this.span.style.top = top + 'px'
            // 大图片的坐标是span坐标的-2倍
            this.bigImg.style.left = -2 * left + 'px'
            this.bigImg.style.top = -2 * top + 'px'
          }
          changeGirlEvents () {
            // // 点击选项切换加入标题后缀参数
            Array.from(this.priceList).forEach((price, index) => {
               
              price.onclick = () => {
                    let txt="" ;
               
                    //  $(".good-name").text(txt1)
                   Array.from(price.parentElement.children).forEach(itme=>{
                       itme.classList.remove("ac")
                   })
                    price.classList.add("ac")
                    // console.log(price.innerText)

                   txt=" "+ price.innerText;
                     this.addtext(txt)
                //    console.log(txt1)
                    // $(".good-name").text(txt1)
                    // price.onclick=()=>{
                    //     Array.from(price.parentElement.children).forEach(itme=>{
                    //         itme.classList.remove("ac")
                    //     })
                    //     txt=" ";
                    //     this.addtext(txt)
                    // }
              }
             
              
            })
            // 鼠标移入小图切换
            Array.from(this.imgList).forEach((img, index) => {
              img.onclick = () => {
               //先获取小图的SRC然后截取主要的部分，接着拼接参数来改变到大图的大小
               let idex=img.querySelector("img").src.substr(0,101).concat("h=1080&w=1080?w=1080&h=1080")
                this.toggleGirl(idex,index)
                // console.log(this)
              }
            })
            //鼠标移入小图后移动图片
            $(".thumb").mouseenter(()=>{
                $(".thumb-arrow-up").css("display","block")
                $(".thumb-arrow-down").css("display","block")
                let slider=  new shoprun()
                slider.init()
            })
            $(".thumb").mouseleave(()=>{
                $(".thumb-arrow-up").css("display","none")
                $(".thumb-arrow-down").css("display","none")
            })
            class shoprun {
                constructor() {
                    
                    this.data = $(".thumb-pic img")
                    //下标索引
                    this.index = 0;
                    this.liheight = 98;
                    this.len = this.data.length;
                }
                //初始状态
                init() {
                   this.clickevent()
                }     
                clickevent(){
                    //小图选项框切换图
                    $(".thumb-arrow-up").click(()=>{ 
                        //0开始或者尾部4开始
                        if(this.index <= 0){
                            this.index = 0
                        }else{
                            this.index-=1
                        }
                        if(this.index < this.len-3){
                             this.pre(this.index)
                        }
                        let idex2=$(".thumb-pic img")[this.index].src.substr(0,101).concat("h=1080&w=1080?w=1080&h=1080")
                        let index1 = this.index;
                        this.updown(idex2,index1)
                    })
                    $(".thumb-arrow-down").click(()=>{
                                    
                        this.index+=1
                       if(this.index>this.len-1){
                           this.index=this.len-1
                       }
                    //    console.log(this.index)//1-5
                        if(this.index==3){
                            this.next(this.index)
                        }
            
                      let idex2=$(".thumb-pic img")[this.index].src.substr(0,101).concat("h=1080&w=1080?w=1080&h=1080")
                        let index1 = this.index
                        this.updown(idex2,index1)
                       console.log(this.index)
                    })
                }
                updown(idex2,index1){
                    $("#girl")[0].src=`${idex2}`;
                    $("#bigBox img")[0].src=`${idex2}`;
                    Array.from($(".thumb-pic")).forEach(itme=>{
                        itme.style.cssText = "border-color: rgb(236, 236, 236)";
                    })
                    $(".thumb-pic")[index1].style.cssText = "border-color: rgb(132, 95, 63)";
                }
                //往上走走
                pre() {
                   
                     let otop = -(this.index * this.liheight) + "px"
                    // if (this.index == -1) {
                    //     this.index = 0
                    // }
                   ;
                    $(".thumb-container").css({
                        top: otop
                    })
                }
                //往下走
                next() {
                 
                      let otop = -((this.index-2) * this.liheight) + "px";
                    if (this.index >this.len) {
                        this.index=this.len
                        console.log(this.index)
                       otop = -((this.index-2) * this.liheight) + "px";
                    }
                    $(".thumb-container").css({
                        top: otop
                    })
                    }
                   
                }
            }
         
          changeNum () {
               console.log(this.addBtn,this.subBtn)
            // 增加数量按钮
            this.addBtn.onclick = () => {
              this.num++
              // 只要加了，就可以减，所以减的按钮就取消禁用
             
              this.subBtn.classList.remove("m-icons-reduce")
              this.subBtn.classList.add("m-icons-reduce-active")

              if (this.num > 10) {
                alert('太多了，注意一下')
                // 不能再加了
                this.addBtn.classList.remove("m-icons-add-active")
                this.addBtn.classList.add("m-icons-add")
                this.num = 10
              }
              
              this.numWrap.value = this.num
            }
            this.subBtn.onclick = () => {
              this.num--
              // 只要减了，就可以加，所以加的按钮就取消禁用
              if(this.num<10){
                this.addBtn.classList.remove("m-icons-add")
                this.addBtn.classList.add("m-icons-add-active")
              }
              if (this.num < 1) {
                // 最小减到1
                this.num = 1
                this.subBtn.classList.remove("m-icons-reduce-active")
                this.subBtn.classList.add("m-icons-reduce")
              }
              this.numWrap.value = this.num
            }
          }
        addtext(txt){
                  let txt1 = $(".good-name").data().title.concat(txt)
          
                   console.log(txt1)
                    $(".good-name")[0].innerText=txt1;
        }
          toggleGirl (idex,n) {
            // 切换商品属性，一旦选择了就可以加购物车了
           
            for (var i = 0; i < this.imgList.length; i++) {
            //   this.priceList[i].classList.remove('ac')
              this.imgList[i].style.cssText = "border-color: rgb(236, 236, 236)";
             
            }
            // this.priceList[n].classList.add('ac')
            this.imgList[n].style.cssText = "border-color: rgb(132, 95, 63)";
            // 中图大图都要切换
            this.girl.src = `${idex}`
            this.bigImg.src = `${idex}`
           
          }
          addToCart () {
            // 加入购物车
            this.okBtn.onclick=()=>{
               let shop_num = this.numWrap.value;
              
               let good_id =$(".box").data().id
               let user_id = localStorage.getItem("user_id")
               this.updateCartData(shop_num, good_id, user_id)
            }
          }
          updateCartData(shop_num, good_id, user_id) {
            $.ajax({
                url: "../server/upshop.php",
                data: {
                    shop_num,
                    user_id,
                    good_id,
                },
                success:function(){
                   location.href ="../html/Shopping Cart.html"
                }
            });
        }
          
      }
   new Shop()
})