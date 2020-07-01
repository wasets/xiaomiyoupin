$(() => {
    class lot {
        constructor(ele, json, ulWidth, olWidth = 20, olMargin = 5) {
            this.ol = document.createElement('ol')
            this.ul = document.createElement('ul')
            this.btnLeft = document.createElement('button')
            this.btnRight = document.createElement('button')

            this.box = ele

            this.imgSrc = json
            this.ulWidth = ulWidth
            this.olWidth = olWidth
            this.olMargin = olMargin
            this.index = 0
            this.time = ''
            this.clickBr = true
            this.initialize()
            this.withdraw1()
        }

        initialize() {
            this.ul.style.width = (this.imgSrc.length + 1) * this.ulWidth + 'px'
            this.ol.style.width = this.imgSrc.length * (this.olWidth + this.olMargin) + 'px'
            this.ol.style.height = this.olWidth + 'px'
            this.btnLeft.className = 'btnLeft'
            this.btnLeft.setAttribute('data-button', '1')
            this.btnLeft.innerHTML = '&lt;'
            this.btnRight.className = 'btnRight'
            this.btnRight.setAttribute('data-button', '-1')
            this.btnRight.innerHTML = '&gt;'
            var boxH = 0
            for (var i = 0; i < this.imgSrc.length; i++) {
                var li = document.createElement('li')
                var img = document.createElement('img')
                var liF;
                img.src = this.imgSrc[i].src
                li.appendChild(img)
                if (i === 0) {
                    liF = li.cloneNode(true)
                }
                this.ul.appendChild(li)
                var liNum = document.createElement('li')
                liNum.setAttribute('data-ol-li', `${i + 1}`)
                liNum.innerHTML = `<span></span>`;
                this.ol.appendChild(liNum)
            }

            this.ul.appendChild(liF)
            // console.log(this.box)
            this.box.appendChild(this.ul)
            this.box.appendChild(this.ol)
            this.box.appendChild(this.btnLeft)
            this.box.appendChild(this.btnRight)
            let _this = this
            img.addEventListener('load', function () {
                _this.box.style.height = 358 + 'px'
                _this.move()
                _this.click()
                _this.mouse()
            })
        }

        move(ind = 1, br = false) {
            var ulNum = this.ul.offsetLeft
            var ol_li = this.ol.querySelectorAll('li')
            this.index = ind - 1
            if (br) {
                for (var i = 0; i < ol_li.length; i++) {
                    ol_li[i].className = null
                    clearInterval(this.time)
                    utils.animation(this.ul, { left: `${this.index * this.ulWidth * -1}` }, () => {
                        this.clickBr = true
                        ulNum = this.ul.offsetLeft
                    }, {}, 5)
                }
            } else {
                this.times(ol_li, ulNum)
            }
            ol_li[this.index].className = 'gao'
        }

        click() {
            this.box.onclick = e => {
                if (e.target.getAttribute('data-ol-li') && this.clickBr) {
                    var ind = e.target.getAttribute('data-ol-li')
                    this.move(ind, true)
                    this.clickBr = false
                }
                if (e.target.getAttribute('data-button') && this.clickBr) {
                    var ol_li = this.ol.querySelectorAll('li')
                    if (e.target.getAttribute('data-button') > 0) {
                        if (this.ul.offsetLeft === 0) {
                            this.ul.style.left = (this.ul.querySelectorAll('li').length - 1) * this.ulWidth * -1 + 'px'
                        }
                        var wih = this.ul.offsetLeft + this.ulWidth * e.target.getAttribute('data-button')
                        this.clickBr = false
                        utils.animation(this.ul, { left: wih }, () => {
                            this.clickBr = true
                        })
                        this.index--;
                        ol_li[this.index + 1].className = null
                        if (this.index < 0) this.index = ol_li.length - 1;
                        ol_li[this.index].className = 'gao'
                    } else {
                        if (this.ul.offsetLeft === (this.ul.querySelectorAll('li').length - 1) * this.ulWidth * -1) {
                            this.ul.style.left = 0
                        }
                        var wih = this.ul.offsetLeft + this.ulWidth * e.target.getAttribute('data-button')
                        this.clickBr = false
                        utils.animation(this.ul, { left: wih }, () => {
                            this.clickBr = true
                            if (this.ul.offsetLeft === this.imgSrc.length * this.ulWidth * -1) {
                                this.ul.style.left = 0
                            }
                        })
                        this.index++;
                        ol_li[this.index - 1].className = null
                        if (this.index === ol_li.length) this.index = 0;

                        ol_li[this.index].className = 'gao'
                    }

                }
            }
        }

        times(ol_li, ulNum) {
            clearInterval(this.time)
            this.time = setInterval(() => {
                this.clickBr = false
                this.index++;
                ol_li[this.index - 1].className = null
                if (this.index === ol_li.length) this.index = 0;
                ol_li[this.index].className = 'gao'
                ulNum -= this.ulWidth
                utils.animation(this.ul, { left: ulNum }, () => {
                    if (ulNum === this.imgSrc.length * this.ulWidth * -1) {
                        ulNum = 0
                        this.ul.style.left = 0
                    }
                    this.clickBr = true
                })
            }, 3000)
        }

        mouse() {
            this.box.onmouseenter = () => {
                clearInterval(this.time)
            }
            this.box.onmouseleave = () => {
                var ulNum = (this.ol.querySelector('.gao').getAttribute('data-ol-li') - 1) * -1 * this.ulWidth
                var ol_li = this.ol.querySelectorAll('li')
                this.times(ol_li, ulNum)
            }
        }

        withdraw() {
            var br = false
            setInterval(() => {
                if (document.hidden) {
                    clearInterval(this.time)
                    br = true
                }
                if (br && document.hidden === false) {

                    var ulNum = (this.ol.querySelector('.gao').getAttribute('data-ol-li') - 1) * -1 * this.ulWidth
                    var ol_li = this.ol.querySelectorAll('li')
                    this.times(ol_li, ulNum)
                    br = false
                }
            }, 3000)
        }
        withdraw1() {
            var _this = this
            document.addEventListener('visibilitychange', function () {
                if (document.visibilityState == 'hidden') {
                    clearInterval(_this.time)
                } else {
                    var ulNum = (_this.ol.querySelector('.gao').getAttribute('data-ol-li') - 1) * -1 * _this.ulWidth
                    var ol_li = _this.ol.querySelectorAll('li')
                    _this.times(ol_li, ulNum)
                }
            })
        }
    }
    var json = [{ src: '../img/1.jpg' }, { src: '../img/2.jpg' }, { src: '../img/3.jpg' }, { src: '../img/4.jpg' }, { src: '../img/5.jpg' }, { src: '../img/6.jpg' }]
    var box = document.querySelector("#box")
    
    new lot(box, json, 859)
    $(".banner-left li").mouseenter(() => {
        $(".banner-list").css("display", "block")
        $(".banner-list a").click(function(){
            location.href = "../html/shoplies.html";
        })
    })
    $(".banner-list").mouseleave(() => {
        $(".banner-list").css("display", "none")
    })
    
    class shoprun {
        constructor(data) {
            //获取后端的数据
            this.data = data
            //下标索引
            this.index = 0;
            this.liwidth = 270;
            this.len = this.data.length;
       console.log(this.data)
        }
        //初始状态
        init() {
            this.createElement()
           this.clickevent()
        }
        createElement() {
            var arr = this.data.map(item => {
                // console.log(item.imgsrc)
            return    `  <li>                    
            <img src=${item.imgsrc} alt="">
            <div class="shoptitle">${item.title}</div>
            <p class="price"><span>￥</span><span class="newprice">${item.newprice}</span><span class="flag">${item.flag}</span><span class="dol">￥</span><span class="oldprice">${item.oldprice}</span></p>
            </li>`
             
            }).join("")
           console.log(arr)
            $(".seckill").html(arr)

        }
        clickevent(){
            $(".pre").click(()=>{
                this.pre()
            })
            $(".next").click(()=>{
                this.next()
            })
        }
        //往左走走
        pre() {
            this.index--
            if (this.index == -1) {
                this.index = 0
            }
            let oleft = -(this.index * this.liwidth) + "px";
            $(".seckill").css({
                left: oleft
            })
        }
        //往右走
        next() {
            this.index++
            console.log(this.index)
            if (this.index >this.len-4) {
                this.index = this.len-4
            }
            let oleft = -(this.index * this.liwidth) + "px";
            $(".seckill").css({
                left: oleft
            })
        }
    }
    
    class shoprun2 {
        constructor(data) {
            //获取后端的数据
            this.data = data
            //下标索引
            this.index = 0;
            this.liwidth = 270;
            this.len = this.data.length;
       console.log(this.data)
        }
        //初始状态
        init() {
            this.createElement()
           this.clickevent()
        }
        createElement() {
            var arr = this.data.map(item => {
                // console.log(item.imgsrc)
            return    `  <li>                    
            <img src=${item.imgsrc} alt="">
            <div class="shoptitle">${item.title}</div>
            <p class="desc">${item.desc}</p>
            <p class="price"><span>￥</span><span class="newprice">${item.newprice}</span><span class="flag">${item.flag}</span></p>
            </li>`
             
            }).join("")
           console.log(arr)
            $(".seckill-2").html(arr)

        }
        clickevent(){
            $(".pre2").click(()=>{
                this.pre()
            })
            $(".next2").click(()=>{
                this.next()
            })
        }
        //往左走走
        pre() {
            this.index--
            if (this.index == -1) {
                this.index = 0
            }
            let oleft = -(this.index * this.liwidth) + "px";
            $(".seckill-2").css({
                left: oleft
            })
        }
        //往右走
        next() {
            this.index++
           
            if (this.index >this.len-4) {
                this.index = this.len-4
            }
            let oleft = -(this.index * this.liwidth) + "px";
            $(".seckill-2").css({
                left: oleft
            })
        }
    }
    class shoprun3 {
        constructor(data) {
            //获取后端的数据
            this.data = data
            //下标索引
       console.log(this.data)
        }
        //初始状态
        init() {
            this.createElement()
        }
        createElement() {
            var arr = this.data.map(item => {
                // console.log(item.imgsrc)
            return    `    <li>
            <div class="img-top">                      
             <img src=${item.imgsrc} alt="">
              <p>${item.desc}...</p>
              <div class="con" style="border:${item.tagcon? "1px solid #9f8052;" : ""} ">${item.tagcon}</div>
            </div> 
            <p class="tag-text" style="background-color:${item.common? "rgb(217, 107, 108);" : ""} ">${item.common}</p>     
          <div class="shoptitle">${item.title}</div>              
         <p class="price"><span>￥</span><span class="newprice">${item.newprice}</span><span class="flag">${item.flag}</span></p>
        </li>` }).join("")   
           console.log(arr)
            $(".seckill-3").html(arr)
        }
    }
    
 $.ajax({
        url: "../server/shoprun1.php",
        dataType: "json",
    }).done(data => {
        console.log(data)
     let slider=  new shoprun(data)
        slider.init()
    })
$.ajax({
        url: "../server/shoprun2.php",
        dataType: "json",
    }).done(data => {
       
     let slider=  new shoprun2(data)
        slider.init()
    })
    $.ajax({
        url: "../server/shoprun3.php",
        dataType: "json",
    }).done(data => {
       
     let slider=  new shoprun3(data)
        slider.init()
    })
    // $(".content-frist li").click(function(){
    //     location.href = "https://m.xiaomiyoupin.com/w/newproduct?_rt=weex&pageid=1605&spmref=YouPinPC.$Home$.icon.0.38350266l";
    // })
    // $("#box li").click(function(){
    //     location.href = "https://m.xiaomiyoupin.com/w/mifans?_rt=weex&pageid=3634";
    // })
   
})
