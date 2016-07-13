



var showBox = document.getElementById('showBox');
var showImg = document.getElementById('showImg');
var wrap = document.getElementById('wrap');

var Imgs = showImg.getElementsByTagName('img');

//获取存储的值


imgUlr = JSON.parse(sessionStorage.imgurl);

console.log(imgUlr);

//根据取出的值 生成img

var imghtml ='';

for(var i=0;i<imgUlr.length;i++){
	imghtml += '<img src = '+imgUlr[i]+'></img>';
}
showImg.innerHTML = imghtml;
//定义一个数组，存放图片的left，top
var arrimgMsg = [];

for(var i=0;i<Imgs.length;i++){
	arrimgMsg.push([Imgs[i].offsetLeft,Imgs[i].offsetTop]);
	Imgs[i].style.left = arrimgMsg[i][0] + 'px';
	Imgs[i].style.top = arrimgMsg[i][1] + 'px';
}

for(var i=0;i<Imgs.length;i++){
	Imgs[i].index = i;
	Imgs[i].style.position = 'absolute';
	Imgs[i].style.margin = '0';
	targetFn(Imgs[i]);
	Imgs[i].onclick = function (){
		console.log(this.index);
	}
}
var deletetimer = null;
var moved = false;

var zIndex = 1;
//拖拽
//targetFn(Imgs[0]);
function targetFn(obj){
	obj.onmousedown = function (ev){
		
		var ev = ev || event;
		ev.cancelBubble = true;
		var pos1 = obj.getBoundingClientRect();
		var pos2 = showBox.getBoundingClientRect();
		
		var disx = ev.clientX - pos1.left;
		var disy = ev.clientY - pos1.top;
		
		var oldX = ev.clientX;
		var oldY = ev.clientY;
		obj.style.zIndex = zIndex ++ ;
		var This = this;
		deletetimer = setTimeout(function (){
			
			var mark = document.createElement('div');
			mark.className = 'mark';
			mark.id = mark;
			mark.style.left = This.offsetLeft + 'px';
			mark.style.top = This.offsetTop + 'px';
			showImg.appendChild(mark);
			
			mark.onclick = function (){
				/*//把删除的那个索引储存在本地存储中
				sessionStorage.setItem('deleteNmu',This.index);*/
				if(confirm('你确定要删除吗？')){
					//删掉一个图片后  要把本地存储的对应的值删除
					imgUlr.splice(This.index,1);
					sessionStorage.imgurl = JSON.stringify(imgUlr);
					showImg.removeChild(This);
					showImg.removeChild(mark);
					
					for(var i=This.index;i<Imgs.length;i++){
						console.log(Imgs[i]);
						mTween(Imgs[i],{
							left : arrimgMsg[i][0],
							top : arrimgMsg[i][1]
						},200,'linear',function (){
							arrimgMsg=[];
							Imgs = showImg.getElementsByTagName('img');
							for(var i=0;i<Imgs.length;i++){
								Imgs[i].index = i;
								arrimgMsg.push([Imgs[i].offsetLeft,Imgs[i].offsetTop]);
							}
						});
					}
				}else{
					showImg.removeChild(mark); 
				}
			}
		},1000);
		obj.onmouseup = function (){
		
			clearTimeout(deletetimer);
		}
		document.onmousemove = function (ev){
			
			var ev = ev || event;
			if(oldX != ev.clientX || oldY != ev.clientY){
				clearTimeout(deletetimer);
			}
			
			var l = ev.clientX - disx - pos2.left;
			var t =ev.clientY - disy - pos2.top;
			
			if(l <0 ){
				l =0;
			}else if(l > showBox.offsetWidth - obj.offsetWidth){
				l = showBox.offsetWidth - obj.offsetWidth;
			}
			if(t <0 ){
				t =0;
			}else if(t > showBox.offsetHeight - obj.offsetHeight){
				t = showBox.offsetHeight - obj.offsetHeight;
			}			
			obj.style.left = l + 'px';
			obj.style.top = t + 'px';
			
		}
		document.onmouseup = function (ev){
			var ev = ev || event;
			
			document.onmousemove = document.onmouseup = null;
			
			if(nearEst(obj,Imgs)){
				
				//console.log(nearEst(obj,Imgs))
				//交换位置
				mTween(obj,{
					'left':arrimgMsg[nearEst(obj,Imgs).index][0],
					'top':arrimgMsg[nearEst(obj,Imgs).index][1]
				},300,'linear');
				
				mTween(nearEst(obj,Imgs),{
					'left':arrimgMsg[obj.index][0],
					'top':arrimgMsg[obj.index][1]
				},300,'linear');
				
				
				//交换索引值
				tmp = obj.index;
				obj.index = nearEst(obj,Imgs).index;
				nearEst(obj,Imgs).index = tmp;
				/*for(var i=0;i<Imgs.length;i++){
					console.log(Imgs[i]);
				}*/
				
				console.dir(arrimgMsg)
			}else{
				mTween(obj,{
					'left':arrimgMsg[obj.index][0],
					'top':arrimgMsg[obj.index][1]
				},300,'linear');
			}
		}
		return false;
	}
	
}
//检测碰撞
function Touch(obj1,obj2){
	var pos1 = obj1.getBoundingClientRect();
	var pos2 = obj2.getBoundingClientRect();
	//拖拽元素的四个边的位置
	var L1 = pos1.left;
	var R1 = pos1.right;
	var T1 = pos1.top;
	var B1 = pos1.bottom;
	//要检测的元素的四个边的位置
	var L2 = pos2.left;
	var R2 = pos2.right;
	var T2 = pos2.top;
	var B2 = pos2.bottom;
	if( L1 > R2 || R1 < L2 || T1 > B2 || B1 < T2){
		return false;
		
	}else{
		return true;
	}
}
//找出离拖拽元素最近的一个
function nearEst(obj,Imgs){
	var _index = -1;
	var v = 999;
	for(var i=0;i<Imgs.length;i++){
		if(obj != Imgs[i]&&Touch(obj,Imgs[i])){
			var a = obj.getBoundingClientRect().left - Imgs[i].getBoundingClientRect().left;
			var b = obj.getBoundingClientRect().top - Imgs[i].getBoundingClientRect().top;
			var c = Math.sqrt(a*a + b*b);
			if(c < v){
				v = c;
				_index = i;
			}
			if(i != -1){
				return Imgs[_index];
			}else{
				return false;
			}
		}
	}
}

