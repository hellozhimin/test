/**
 * 准备工作
 */
// 获取目标元素对象
var oElem = document.getElementById('target');

//声明两个变量用来保存鼠标初始位置的x,y坐标
var startX = 0;
var startY = 0;

// 声明两个变量用来保存目标元素位置的x,y坐标
var sourceX = 0;
var sourceY = 0;

oElem.addEventListener('mousedown',start,false);

/**
 * 功能函数
 */
 /**
  * 判断浏览器是否支持tranform属性
  * @return {[String]} [支持返回支持浏览器下的transform,不支持则返回空]
  */
 function getTranform(){
 	var transform = '',
 		divStyle = document.createElement("div").style,
 		transformArr = ['transform','webkitTransform','MozTransform','msTransform','OTransform'];
 		i = 0,
 		len = transformArr.length;

 	for(;i<len;i++){
 		if(transformArr[i] in divStyle){
 			// 如果支持，则返回
 			return transform = transformArr[i];
 		}
 	}
 	// 如果没有找到，则返回空;
 	return transform;
 }
 /**
  * 获取元素样式
  * @param  {String} elem     元素
  * @param  {String} property 元素样式
  * @return {String}          元素样式的返回值
  */		
 function getStyle(elem,property) {
 	// IE通过currentStyle来获取，其他浏览器通过getComputedStyle
 	return document.defaultView.getComputedStyle?document.defaultView.getComputedStyle(elem,false)[property]:elem.currentStyle[property];
 }
 /**
  * 获取元素的位置信息
  * @param  {String} ele 元素
  * @return {[数组]}  返回元素的位置坐标
  */
 function getTargetPos(ele) {
 	var pos = {x:0,y:0};
 	var transform = getTranform();
 	if(transform){
 		var transformValue =  getStyle(oElem,transform);
 		if(transformValue == 'none'){
 			oElem.style[transform] = 'translate(0,0)';
 			return pos;
 		}else{
 			var tmp = transformValue.match(/-?\d+/g);
 			return pos = {
 				x:parseInt(tmp[4].trim()),
 				y:parseInt(tmp[5].trim())
 			};
 		}
 	}else{
 		if(getStyle(oElem,'position') == 'static'){
 			oElem.style.position = 'relative';
 			return pos;
 		}else{
 			var x = parseInt(getStyle(oElem,'left')?getStyle(oElem,'left'):0);
 			var y = parseInt(getStyle(oElem,'top')?getStyle(oElem,'top'):0);
 			return pos = {
 				x:x,
 				y:y
 			}
 		}
 	}
 	return pos;
 }
 /**
  * 设置元素移动的坐标
  * @param {String} elem 元素
  * @param {Object} pos  元素要移动的位置
  */
 function setTargetPos(elem,pos) {
 	var transform = getTranform();
 	if(transform){
 		elem.style[transform] = 'translate(' + pos.x + 'px,' + pos.y + 'px)';
 	}else{
 		elem.style.left = pos.x + 'px';
 		elem.style.top = pos.y + 'px';
 	}
 	return elem;
 }
 /**
  * 声明三个事件的回调函数
  */
 /**
  * mousedown绑定的事件
  * @param  {[type]} event [description]
  * @return {[type]}       [description]
  */
 function start(event) {
 	startX = event.pageX;
 	startY = event.pageY;
 	var pos = getTargetPos(oElem);
 	sourceX = pos.x;
 	sourceY = pos.y;
 	document.addEventListener('mousemove',move,false);
 	document.addEventListener('mouseup',end,false);
 }
/**
 * mousemove绑定的事件
 * @param  {[type]} event [description]
 * @return {[type]}       [description]
 */
function move(event) {
	var currentX = event.pageX;
	var currentY = event.pageY;

	var distanceX = currentX - startX;
	var distanceY = currentY - startY;

	setTargetPos(oElem,{
		x:(sourceX + distanceX).toFixed(),
		y:(sourceY + distanceY).toFixed()
	})
}
function end(event) {
	document.removeEventListener('mousemove',move);
	document.removeEventListener('mouseup',end);
}