;
(function(){
	var transform = getTransform();
	function Drag(selector){
		this.elem = typeof selector == 'Object'?selector:document.getElementById(selector);
		this.startX = 0;
		this.startY = 0;
		this.sourceX = 0;
		this.sourceY = 0;

		this.init();
	}
	Drag.prototype = {
		constructor:Drag,
		init: function(){
			// 初始时需要做什么
			this.setDrag();
		},
		getSytle: function(property){
			return document.defaultView.getComputedStyle?document.defaultView.getComputedStyle(this.elem,false)[property]:this.elem.currentStyle[property];
		},
		getPosition: function(){
			var pos = {x:0,y:0};
			if(transform){
				var transformValue = this.getSytle(transform);
				if(transformValue == 'none'){
					this.elem.style[transform] = 'translate(0,0)';
				}else{
					var tmp = transformValue.match(/-?\d+/g);
					pos = {
						x:parseInt(tmp[4].trim()),
						y:parseInt(tmp[5].trim())
					}
				}
			}else{
				if(this.getStyle('position') == 'static'){
					this.elem.style.position = 'relative';
				}else{
					pos = {
						x:parseInt(this.getStyle('left')?this.getStyle('left'):0),
						y:parseInt(this.getStyle('top')?this.getStyle('top'):0)
					}
				}
			}
			return pos;
		},
		setPosition:function(pos){
			if(transform){
				this.elem.style[transform] = 'translate(' + pos.x + 'px,' + pos.y + 'px)';
			}else{
				this.elem.style.left = pos.x + 'px';
				this.elem.style.top = pos.y + 'px';
			}
		},
		setDrag:function(){
			var self = this;
			this.elem.addEventListener('mousedown',start,false);
			function start(){
				self.startX = event.pageX;
				self.startY = event.pageY;

				var pos = self.getPosition();

				self.sourceX = pos.x;
				self.sourceY = pos.y;

				document.addEventListener('mousemove',move,false);
				document.addEventListener('mouseup',end,false);
			};
			function move(event){
				var currentX = event.pageX;
				var currentY = event.pageY;
				var distanceX = currentX - self.startX;
				var distanceY = currentY - self.startY;
				self.setPosition({
					x:(self.sourceX + distanceX).toFixed(),
					y:(self.sourceY + distanceY).toFixed()
				})
			};
			function end(event){
				document.removeEventListener('mousemove',move);
				document.removeEventListener('mouseup',end);
			}
		}
	}
	function getTransform(){
		var transform = '',
			transformArr = ['transform','webkitTransform','MozTransform','OTransform','msTransform'],
			divStyle = document.createElement('div').style,

			i = 0,
			len = transformArr.length;

		for(;i<len;i++){
			if(transformArr[i] in divStyle){
				return transform = transformArr[i];
			}
		}
		return transform;
	}

	window.Drag = Drag;
})();