
// 获得一个随机数
function randomNumber(min,max){
    return parseInt(Math.random()*(max-min+1))+min;
}

//把传入数组转换成url传输用字符串
function cCu(cC){
    //对象转换成字符串
    var params = '';
    for(var key in cC){ //遍历对象生成字符串，key指对象名
        params += key + '=' + encodeURI(cC[key]) + '&';//
    }
    // 去除多余的&
    params = params.slice(0,-1);
    console.log(params);
    //得到字符串
}

//把传入的url参数转换成对象
let cR = decodeURI(location.search.slice(1));
// 获取url参数
function cRu(cR){

    //	把字符串转成对象
    //  'name=xxx&age=18' => {}
    var  duiX = {};
    cR = cR.split('&');
    cR.forEach(function(item){
        var arr = item.split('=');
        duiX[arr[0]] = arr[1];
    });
    console.log(duiX); //最后获得一个对象，可以直接使用
}



let utils = {
    //--------------------------------------------------
    //封装事件监听
    /*
	@param ele: <DOMObject> 添加事件的DOM元素
	@param type: <string> 事件类型（不带on）
	@param fn： <function> 事件处理函数
	@param isCapture [布尔值，是否捕获]
	 */
    addOn : function (ele,type,fn,isCapture = false) {
    if( ele.attachEvent){
        ele.attachEvent('on' + type , fn);
    }else {
        ele.addEventListener(type,fn,isCapture);
    }
    },
    //移出事件监听
    /*
    @param ele: <DOMObject> 添加事件的DOM元素
    @param type: <string> 事件类型（不带on）
    @param fn： <function> 事件处理函数
    @param isCapture [布尔值，是否捕获]
     */
    removeOn:function (ele,type,fn,isCapture = false) {
    if( ele.detachEvent){
        ele.attachEvent('on' + type , fn);
    }else {
        ele.removeEventListener(type,fn,isCapture);
    }
    },
    //------------------------------------------------
    //获取元素style属性
    /*
    @param obj     <DOMObject>  要获取的元素对象
    @param attr    <string>     样式名称
    @param return  <string>     获取到的样式值
     */
    getStyle : function (obj,attr){    //获取非行间样式，obj是对象，attr是值
    if(obj.currentStyle){   //针对ie获取非行间样式,有这个属性则用的是IE
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj,false)[attr];   //针对非ie
    }
},
//-------------------------------------------------------
    //封装运动函数
    /*
	@param ele               <DOMObject>     要改变的元素对象
	@param obj(attr:val)     <Object>        需要改变的 属性名：值
	@param fn                <fu>            回调函数,可以不传
	@param obj(attr:val)     <Object>        填入需要渐变的属性名：时间（ms）
	@param speedUp           <number>        加速度，默认5
	 */
    animation:function (ele,obj,fn,trans = {opacity:1000},speedUp = 5) {
        for(let key in trans){
            ele.style.transitionProperty = [key];
            ele.style.transitionDuration = trans[key] + 'ms';
        }

        var times = {};
        var num = 0; //添加计算器，添加一个定时器加1，完成一个定时器减1,最后一个完成后，调用回调函数
        for(let key in obj){ //这里一定要用let，保证是块级作用域，否则会出现只能执行后传入的动作
            num ++;

            clearInterval( times[key]);
            //先获取样式
            let startall = ele.currentStyle ? ele.currentStyle[key] : getComputedStyle(ele,false)[key]; //把返回的值转换成数字,要用let
            // 提取单位
            let unit = startall.match(/[a-z]+$/i) ? startall.match(/[a-z]+$/i)[0] : null ;

            let start = parseInt(startall);

            times[key] = setInterval(function () {
                //计算距离
                var distance = obj[key] - start;
                var bur = true; //判断是否负数
                if(distance < 0){
                    bur = false;
                }
                //设置速度
                var speed = bur ? distance / 10 + speedUp : distance / 10 - speedUp;

                ele.style[key] = start + speed + (unit ? unit : '');
                if(Math.abs(start - obj[key]) <= speedUp){
                    ele.style[key] = obj[key] + (unit ? unit : '')
                    clearInterval(times[key]);
                    num--;
                    if(num === 0){
                        fn && fn();
                    }
                }
                start += speed;
            },30);
        }
    }
};













