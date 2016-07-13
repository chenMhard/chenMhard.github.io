
var canvas = document.getElementById('canvas');
var color = document.getElementById('color');
var spans = color.getElementsByTagName('span');
var pensize = document.getElementById('pensize');
var oSpans = pensize.getElementsByTagName('span');
var prev = document.getElementById('prev');
var next = document.getElementById('next');
var clear = document.getElementById('clear');
var eraser = document.getElementById('eraser');
var submit = document.getElementById('submit');

//颜色
var arrColor = ['black','yellow','blue','red','green','#80FF00','#A0522D'];

for(var i=0;i<arrColor.length;i++){
	spans[i].style.backgroundColor = arrColor[i];
}

//画笔大小
var arrSize = [2,4,6];

var colorN = 0;
var sizeN = 0;
//画笔大小，颜色
var lineW = arrSize[sizeN];
var lineC = arrColor[colorN];

spans[colorN].className = 'selected';

//改变颜色
for(var i=0;i<spans.length;i++){
	spans[i].index = i;
	spans[i].onclick = function (){
		for(var i=0;i<spans.length;i++){
			spans[i].className = '';
		}
		this.className = 'selected';
		colorN = this.index;
		lineC = arrColor[colorN];
		eraser.clicked = false;
		eraser.style.background = '';
		eraser.style.color = '#a3a3a3';
		canvas.style.cursor = 'url(img/p.png),pointer';
		lineW = arrSize[sizeN];
	}
}
//改变画笔大小
for(var i=0;i<oSpans.length;i++){
	oSpans[i].index = i;
	oSpans[i].onclick = function (){
		for(var i=0;i<oSpans.length;i++){
			oSpans[i].className = '';
		}
		this.className = 'active';
		sizeN = this.index;
		lineW = arrSize[sizeN];
	}
}

var oGC = canvas.getContext("2d");
//用来储存画布信息
var arrcanvasData = [];

canvas.onmousedown = function (ev){
	var ev = ev || event;
	oGC.save();
	oGC.lineCap = 'round';
	oGC.lineWidth = lineW;
	oGC.strokeStyle = lineC;
	oGC.beginPath();
	
	oGC.moveTo(ev.clientX - canvas.offsetLeft,ev.clientY - canvas.offsetTop+ 16);
	
	document.onmousemove = function (ev){
		var ev = ev || event;
		
		oGC.lineTo(ev.clientX - canvas.offsetLeft,ev.clientY - canvas.offsetTop + 16);
		
		oGC.stroke();
	}
	document.onmouseup = function (){
		oGC.closePath();
		oGC.restore();
		
		document.onmouseup = document.onmousemove = null;
	}
	var canvasData = oGC.getImageData(0,0,canvas.offsetWidth,canvas.offsetHeight);
	
	arrcanvasData.push(canvasData);
	
}
var deleteData = [];
//点击上一步
prev.onclick = function (){
	
	
	oGC.clearRect(0,0,canvas.offsetWidth,canvas.offsetHeight);
	oGC.putImageData(arrcanvasData[arrcanvasData.length-1],0,0);
	
	deleteData.push(arrcanvasData.pop());
}


//清除画布
clear.onclick = function(){
	oGC.clearRect(0,0,canvas.offsetWidth,canvas.offsetHeight);
}
//橡皮擦
eraser.onclick = function (){
	if(!arrcanvasData.length){
		alert('你还没用涂鸦！');
	}else{
		if(!this.clicked){
			this.style.background = '#000';
			this.style.color = '#fff';
			lineW = 10;
			lineC = '#fff';
			canvas.style.cursor = 'url(img/x.png),pointer';
			this.clicked = true;
		}else{
			this.style.background = '';
			this.style.color = '#a3a3a3';
			canvas.style.cursor = 'url(img/p.png),pointer';
			lineW = arrSize[sizeN];
			lineC = arrColor[colorN];
			this.clicked = false;
		}
	}
}


//定义一个数组 ，用来存储当前提交的画布url
if(sessionStorage.imgurl){
	var _imgData = JSON.parse(sessionStorage.imgurl);
	var arrImgurl = _imgData;
}else{
	var arrImgurl = [];
}

submit.onclick= function (){
	if(arrcanvasData.length){
		var Imgurl = canvas.toDataURL();
		
		//判断这个图是否已经被保存
		if(arrImgurl.indexOf(Imgurl) == -1){
			arrImgurl.push(Imgurl);
		}else{
			alert('已经提交过了');
		}
	}
	
	//把这个数组储存到本地存储中
	
	var str = JSON.stringify(arrImgurl);
	sessionStorage.imgurl = str;
}

