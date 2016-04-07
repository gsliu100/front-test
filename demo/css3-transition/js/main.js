(function(){
	window.onload = function(){

		var canvas = document.getElementById('myCanvas');
		var context = canvas.getContext('2d');
		var point1 = {x:50,y:200};
		var point2 = {x:250,y:400};
		// 获取顶部所有bezire input
		var valueCs = document.getElementsByClassName('valueC');
		// 获取容纳生成的结果中cubic-bezier函数的参数
		var bResult = document.getElementsByClassName('theP');
		// 存放duration 及 cubic-bezier参数的变量
		var theTime = '';
		var theP = '';


		function updateCanvas(p1,p2){
			var p1 = p1||point1;
			var p2 = p2||point2;
			context.clearRect(0,0,canvas.width,canvas.height);
			// P0与P3之间的直线
			context.beginPath();
			context.moveTo(0,450);
			context.lineTo(300,150);
			context.lineWidth = 8;
			context.strokeStyle = '#aaa';
			context.stroke();
			// 绘制曲线
			context.beginPath();
			context.moveTo(0,450);
			context.bezierCurveTo(p1.x,p1.y,p2.x,p2.y,300,150);
			context.lineWidth = 6;
			context.strokeStyle = 'blue';
			context.stroke();
			// 绘制P0与P1之间的直线
			context.beginPath();
			context.moveTo(0,450);
			context.lineTo(p1.x,p1.y);
			context.strokeStyle = '#666';
			context.lineWidth = 3;
			context.stroke();
			// 绘制P2与P3之间的直线
			context.beginPath();
			context.moveTo(300,150);
			context.lineTo(p2.x,p2.y);
			context.strokeStyle = '#666';
			context.lineWidth = 3;
			context.stroke();
		}


		// 用于设置顶部的cubic参数值
		function setCubicBesireValue(p1,p2){
			var p1 = p1||point1;
			var p2 = p2||point2;
			function setValueC(p,i){
				if(p.x===0){
					valueCs[i].value = 0;
				}else{
					valueCs[i].value = ((p.x/300).toFixed(2).charAt(0)==='0'?(p.x/300).toFixed(2).substr(1):1);
				}

				if(p.y===150){
					valueCs[i+1].value = 1;
				}else if(p.y===450){
					valueCs[i+1].value = 0;
				}else{
					valueCs[i+1].value = (((450-p.y)/300).toFixed(2).charAt(0)==='0'?((450-p.y)/300).toFixed(2).substr(1):((450-p.y)/300).toFixed(2));
				}
			}
			setValueC(p1,0);
			setValueC(p2,2);

			var resultS = valueCs[0].value+','+valueCs[1].value+','+valueCs[2].value+','+valueCs[3].value;
			for(var i in bResult){
				bResult[i].innerHTML = resultS;
			}
			theP = resultS;
			addTransition(theTime,theP)

		}


		// 获取p1,p2控制点
		var p1 = document.getElementById('P1');
		var p2 = document.getElementById('P2');

		// 获取包裹canvas元素的文档坐标（本例中canvas元素将包裹元素填充满）
		var leftContent = document.getElementsByClassName('leftCanvasWrap')[0];
		var x = leftContent.offsetLeft;
		var y = leftContent.offsetTop;
		

		// 给p1,p2绑定onmousedown事件
		p1.onmousedown = function(){
			var that = this;
			// 当用户按下鼠标时，在document对象上绑定onmousemove事件获取鼠标指针位置
			document.onmousemove = function(e){
				var event = e||window.event;
				event.preventDefault();
				// 获取鼠x,y坐标
				var sTop = event.pageY;
				var sLeft = event.pageX;
				// 设置当前p1的位置
				var left = sLeft-x;
				var top = sTop-y;
				if(left<0){
					left = 0;
				}else if(left>300){
					left = 300;
				}
				that.style.left = (left-8)+'px';
				that.style.top = (top-y-8)+'px';
				// 将位置信息保存至point1
				point1.x = left;
				point1.y = top;

				// 给顶部的vaules重新赋值
				setCubicBesireValue(point1,point2);
				// 重新绘制canvas
				updateCanvas(point1,point2);
			}
		};
		p2.onmousedown = function(){
			var that = this;
			document.onmousemove = function(e){
				var event = e||window.event;
				event.preventDefault();

				var sTop = event.pageY;
				var sLeft = event.pageX;
				var left = sLeft-x;
				var top = sTop-y;
				if(left<0){
					left = 0;
				}else if(left>300){
					left = 300;
				}
				that.style.left = (left-8)+'px';
				that.style.top = (top-y-8)+'px';
				point2.x = left;
				point2.y = top;
				setCubicBesireValue(point1,point2);
				updateCanvas(point1,point2);
			}
		};


		// 当用户不在拖动，松开鼠标时取消document上的onmouseover事件
		document.onmouseup = function(){
			document.onmousemove = null;
		};


		// 获取duration容器
		var durationCs = document.getElementsByClassName('theTime');
		//获取range滑块
		var rangeE = document.getElementById('duration');
		var v = rangeE.value;
		// 定义duration刷新函数
		function freshTheTime(value){
			document.getElementById('durationDisplay').value = value + ' seconds';
			for(var i in durationCs){
				durationCs[i].innerHTML = value +"s";
			}
			theTime = value;
		}


		// 滑块的onchange事件
		rangeE.onchange = function(e){
			var event = e||window.event;
			var ranges = event.target;

			var value = ranges.value;
			document.getElementById('durationDisplay').value = value + ' seconds';
			freshTheTime(value);	
			addTransition(theTime,theP)	
		}




		// the example div
		var eDiv = document.getElementById('example');
		function addTransition(time,theP){
			eDiv.style.transition = 'all '+time+'s cubic-bezier('+theP+')';
			// eDiv.style.webkitTransition = 'all '+time+'s cubic-bezier('+theP+')';
		}

		document.getElementById('GO').onclick = function(){
			if(eDiv.className){
				eDiv.className = '';
			}else{
				eDiv.className = 'exampleTest';
			}
		}



		// 第一次初始化
		updateCanvas();
		freshTheTime(v);
		setCubicBesireValue();
	}
}());