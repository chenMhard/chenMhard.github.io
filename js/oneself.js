

//运动函数
function mTween(obj, attrs, duration, fx, callback) {

    clearInterval(obj.timer);

    var startTime = new Date().getTime();
  
    var j = {};

    for (var attr in attrs) {
        j[attr] = {}
      //  j[attr].b = parseFloat(getComputedStyle(obj)[attr]);
        j[attr].b = parseFloat(css(obj,attr));
        j[attr].c = attrs[attr] - j[attr].b;
    }

    var d = duration;

    obj.timer = setInterval(function() {

        var t = new Date().getTime() - startTime;

        if ( t >= d ) {
            t = d;
        }

        //根据传入进来的属性，通过遍历的方式把所有要运动的属性都计算一次
        for (var attr in attrs) {
            var b = j[attr].b;
            var c = j[attr].c;
            var value = Tween[fx](t, b, c, d);

            if ( attr == 'opacity' ) {
                obj.style[attr] = value;
            } else {
                obj.style[attr] = value + 'px';
            }
        }

        if ( t == d ) {
            clearInterval(obj.timer);
            if (typeof callback == 'function') {
                callback();
            }

        }

    }, 16);
}

/*
 * t : time 已过时间
 * b : begin 起始值
 * c : count 总的运动值
 * d : duration 持续时间
 * */

//Tween.linear();

var Tween = {
    linear: function (t, b, c, d){  //匀速
        return c*t/d + b;
    },
    easeIn: function(t, b, c, d){  //加速曲线
        return c*(t/=d)*t + b;
    },
    easeOut: function(t, b, c, d){  //减速曲线
        return -c *(t/=d)*(t-2) + b;
    },
    easeBoth: function(t, b, c, d){  //加速减速曲线
        if ((t/=d/2) < 1) {
            return c/2*t*t + b;
        }
        return -c/2 * ((--t)*(t-2) - 1) + b;
    },
    easeInStrong: function(t, b, c, d){  //加加速曲线
        return c*(t/=d)*t*t*t + b;
    },
    easeOutStrong: function(t, b, c, d){  //减减速曲线
        return -c * ((t=t/d-1)*t*t*t - 1) + b;
    },
    easeBothStrong: function(t, b, c, d){  //加加速减减速曲线
        if ((t/=d/2) < 1) {
            return c/2*t*t*t*t + b;
        }
        return -c/2 * ((t-=2)*t*t*t - 2) + b;
    },
    elasticIn: function(t, b, c, d, a, p){  //正弦衰减曲线（弹动渐入）
        if (t === 0) {
            return b;
        }
        if ( (t /= d) == 1 ) {
            return b+c;
        }
        if (!p) {
            p=d*0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p/4;
        } else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    },
    elasticOut: function(t, b, c, d, a, p){    //正弦增强曲线（弹动渐出）
        if (t === 0) {
            return b;
        }
        if ( (t /= d) == 1 ) {
            return b+c;
        }
        if (!p) {
            p=d*0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
    },
    elasticBoth: function(t, b, c, d, a, p){
        if (t === 0) {
            return b;
        }
        if ( (t /= d/2) == 2 ) {
            return b+c;
        }
        if (!p) {
            p = d*(0.3*1.5);
        }
        if ( !a || a < Math.abs(c) ) {
            a = c;
            var s = p/4;
        }
        else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        if (t < 1) {
            return - 0.5*(a*Math.pow(2,10*(t-=1)) *
                Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        }
        return a*Math.pow(2,-10*(t-=1)) *
            Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
    },
    backIn: function(t, b, c, d, s){     //回退加速（回退渐入）
        if (typeof s == 'undefined') {
            s = 1.70158;
        }
        return c*(t/=d)*t*((s+1)*t - s) + b;
    },
    backOut: function(t, b, c, d, s){
        if (typeof s == 'undefined') {
            s = 3.70158;  //回缩的距离
        }
        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    },
    backBoth: function(t, b, c, d, s){
        if (typeof s == 'undefined') {
            s = 1.70158;
        }
        if ((t /= d/2 ) < 1) {
            return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
        }
        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    },
    bounceIn: function(t, b, c, d){    //弹球减振（弹球渐出）
        return c - Tween['bounceOut'](d-t, 0, c, d) + b;
    },
    bounceOut: function(t, b, c, d){
        if ((t/=d) < (1/2.75)) {
            return c*(7.5625*t*t) + b;
        } else if (t < (2/2.75)) {
            return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
        } else if (t < (2.5/2.75)) {
            return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
        }
        return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
    },
    bounceBoth: function(t, b, c, d){
        if (t < d/2) {
            return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
        }
        return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
    }
}



//获取样式
function css(obj,attr){

	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else if(getComputedStyle(obj)){
		return getComputedStyle(obj)[attr];
	}
}

//添加一个class的函数

/*
				 
 * 给指定的元素添加指定的class
 * 
 * obj  要添加class的元素
 * classname  要添加的class
 * */

function addClass(obj,classname){
					
	//如果obj的class为空   就是不存在class  直接添加
	if(obj.className == ''){
		
		obj.className = classname;
		
	}else{
		var arrclass = obj.className.split(' ');
		
		if(arrclass.indexOf(classname) == -1){
			obj.className += ' ' + classname;
		}
	}
}

//删除一个 class的函数
/*
 * 给指定的元素删除指定的class
 * 
 * obj  要删除class的元素
 * classname  要删除的class
 * */
function removeClass(obj,classname){
					
	//把元素的class拆分成数组
	var arrclass = obj.className.split(' ');
	
	//如果传入的class存在  则删除
	if(arrclass.indexOf(classname) != -1){
	
		arrclass.splice(arrclass.indexOf(classname),1);
		
		obj.className = arrclass.join(' ');
		
	}
	
}

//替换一个class的函数
/*
				 
 * 给指定的元素替换指定的class
 * 
 * obj  要删除class的元素
 * oldclassname  要被替换的class
 * newclassname  用来替换的class
 * */

function replaceClass(obj,oldclassname,newclassname){
					
					
	//先删除  要被替换的元素
	removeClass(obj,oldclassname);
	
	//再添加用来替换的元素
	addClass(obj,newclassname);
	
}

//切换class的函数
/*
 * 给指定的元素切换指定的class
 * 
 * obj  要切换class的元素
 *
 *classname	要切换的class
 * */
function toggleClass(obj,classname){
	
	var arrclass = obj.className.split(' ');
	
	if(arrclass.indexOf(classname) == -1){
	
		addClass(obj,'hide');
		
	}
	if(arrclass.indexOf(classname) != -1){
		
		removeClass(obj,'hide');
		
	}
}

//添加一个或多个class的函数

/*
 先判断传入的第二个参数的类型 
 如果为对象：
 
 如果为字符串：
 * 
 * */
function  addgroupClass(obj,classname){
	
	if(typeof classname == 'object'){
			fn();
		
	}else if(typeof classname == 'string'){
		
		if(classname.indexOf(' ') != -1){
			classname = classname.split(' ');
			fn();
		}else if(classname.indexOf(',') != -1){
			classname = classname.split(',');
			fn();
			
		}else{
			classname = classname.split();
			fn();
		}
	}
	function fn(){
		for(var i=0;i<classname.length;i++){
			if(obj.className == ''){
			
				obj.className = classname[i];
				
			}else{
				var arrclass = obj.className.split(' ');
				
				if(arrclass.indexOf(classname[i]) == -1){
					obj.className += ' ' + classname[i];
				}
			}
		}
	}
 }

//抖动函数
function shake(ele,attr,endFun){
	clearInterval(timer);
	var arr=[];
	var n=0;
	var timer = null;

	for(var i=20;i>0;i-=2){
		arr.push(i,-i)
	}
	arr.push(0);
	var Val = parseFloat(css(ele,attr));
	
	
	timer = setInterval(function (){
		ele.style[attr] = Val+arr[n]+'px';
		n++;
		if(n==arr.length){
			clearInterval(timer);
			endFun&&endFun();
		}
	},100);
}

//获取id
function $(ele){
				
	return document.getElementByele(ele);			
}

//鼠标滚轮事件
function scrollFn(obj,callback1,callback2){
	obj.onmousewheel = fn;
	//obj.addEventListener('DOMMouseScroll',fn);
	if(obj.addEventListener){
		obj.addEventListener('DOMMouseScroll',fn,false);
	}
	function fn(ev){
	
		var ev = ev || event;
		
		var b = '';
		if(ev.wheelDelta){
			b = ev.wheelDelta > 0 ? true : false;
		}else{
			b = ev.detail < 0 ? true : false;
		}
		
		if(b){
			
			callback1.call(obj);//向上滚动函数
		}else{
			callback2.call(obj);//向下滚动函数
		}
		if(ev.preventDefault){
			ev.preventDefault();
		}
		
		return false;
	}
}
//获取class
function getByClass(oParent,sClass){
	var arr = [];
	var aEle = oParent.getElementsByTagName('*');
	
	//var re = /sClass/;  //当正则需要传参的时候，一定要用全称的写法
	var re = new RegExp('\\b'+sClass+'\\b');
	
	for(var i=0;i<aEle.length;i++){
		if( re.test(aEle[i].className) ){
			arr.push( aEle[i] );
		}
	}
	
	return arr;
	
}
//弹性运动
function startMove(obj,target){
	clearInterval(obj.timer);
	obj.timer = setInterval(function (){
		obj.speed = 0;
		obj.speed +=(target-obj.offsetTop)/7;
		speed*=0.75;
		if(Math.abs(target-obj.offsetTop)<=1&&Math.abs(obj.speed)<=1){
			
			clearInterval(obj.timer);
			obj.style.top = target +'px';
			speed =0;
			
		}else{
			obj.style.top = obj.offsetTop + obj.speed + 'px';
		}
		
		
	},16)
}
//获取屏幕的宽高
function view(){
    return {
        W:window.innerWidth||document.documentElement.clientWidth,
        H:window.innerHeight||document.documentElement.clientHeight
    }
}
//拖拽函数
function targetFn(obj){
	
	obj.onmousedown = function (ev){
		var ev = ev || event;
		
		var pos = obj.getBoundingClientRect();
		var disx = ev.clientX - pos.left;
		var disy = ev.clientY - pos.top;
		
		document.onmousemove = function (ev){
			var ev = ev || event;
			
			
			var l = ev.clientX - disx;
			var t = ev.clientY - disy;
			
			//限制范围拖拽
			if(l < 0){
				l = 0;
			}else if(l > view().W - obj.offsetWidth){
				l = view().W - obj.offsetWidth;
			}
			
			if(t < 0){
				t = 0;
			}else if(t > view().H - obj.offsetHeight){
				t = view().H - obj.offsetHeight
			}
			
			obj.style.left = l + 'px';
			obj.style.top = t + 'px';
		}
		document.onmouseup = function (){
			document.onmouseup = document.onmousemove = null;
			
		}
	}
}