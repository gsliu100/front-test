function myC(headerBgColor,dayColor,choosedBgColor,changeListener){
	var myContainer = document.getElementById('myRili');
	var myTable = document.createElement('table');
	myTable.id = 'cMyTable';
	var myAllTime = {};
	
	// 设置星期
	function createDay(){
		var fragmentE = document.createDocumentFragment();
		var cDay = document.createElement('tr');
		cDay.id = 'headerTR';
		cDay.style.color = dayColor;
		var days = ['日','一','二','三','四','五','六'];
		for(var i=0;i<7;i++){
				var day = document.createElement('td');
				day.innerHTML = days[i];
				fragmentE.appendChild(day);
		}
		cDay.appendChild(fragmentE);
		myTable.appendChild(cDay);
		myContainer.appendChild(myTable);
	}
// 设置时间
	function setMyTime(year,month,mDay){

		if(!year){
			var date = new Date();
			var year = date.getFullYear();
			var month = date.getMonth();
			var today = date.getDate();
		}else{
			var date = new Date();
			date.setFullYear(year);
			date.setMonth(month);
			date.setDate(mDay);
			var today = mDay;
		}

		var monthDays = [31,28,31,30,31,30,31,31,30,31,30,31];

		if(month===2&&isR()){
			monthDays[1] = monthDays[1]+1;
		}
		

		date.setDate(1);

		var day = date.getDay();

		myAllTime.year = year;
		myAllTime.month = month;
		myAllTime.date = today;
		myAllTime.startDay = day;
		myAllTime.thisMonthDays = monthDays[month];

		function isR(){
			if(year%4===0){
				if(year%100===0){
					if(year%400===0){
						return true;
					}else{
						return false;
					}
				}else{
					return true;
				}
			}else{
				return false;
			}
		}

	}
// 设置头部
	function setHaeder(){
		if(!document.getElementById('cHeader')){
			var header = document.createElement('div');
			header.id='cHeader';
			header.style.backgroundColor = headerBgColor;
			var hYear = document.createElement('span');
			hYear.id = 'cYear';
			var hMonth = document.createElement('span');
			hMonth.id = 'cMonth';
			var hLeft = document.createElement('span');
			hLeft.id = 'cGoLeft';
			var hRight = document.createElement('span');
			hRight.id = 'cGoRight';

			hYear.innerHTML = myAllTime.year;
			hMonth.innerHTML = myAllTime.month+1;
			hLeft.innerHTML = '<';
			hRight.innerHTML = '>';
			var fragmentH = document.createDocumentFragment();	
			fragmentH.appendChild(hLeft);
			fragmentH.appendChild(hYear);
			fragmentH.appendChild(hMonth);
			fragmentH.appendChild(hRight);
			header.appendChild(fragmentH);
			myContainer.appendChild(header);
		}else{
			document.getElementById('cYear').innerHTML = myAllTime.year;
			document.getElementById('cMonth').innerHTML = myAllTime.month+1;
		}
		
	}
// 设置日历主体
	function createMyC(){
		var fragmentR = document.createDocumentFragment();
		var flag = myAllTime.startDay;
		myTable.innerHTML = '';
		createDay();
		for(var i = 0;i<myAllTime.thisMonthDays;){
			var oneTr = document.createElement('tr');
			var fragmentD = document.createDocumentFragment();
			for(var j = 0;j<7;j++){
				var oneTd = document.createElement('td');
				// 星期前面空格
				if(flag>0){
					flag--;
				}else{
					oneTd.innerHTML = i+1;
					oneTd.className = 'haveDate';
					if((i+1) === myAllTime.date){
						oneTd.id = 'choosedDay';
						oneTd.style.backgroundColor = choosedBgColor;
						oneTd.style.color = 'white';
					}
					i++;
					if(i>myAllTime.thisMonthDays){
						break;
					}
				}
				fragmentD.appendChild(oneTd);
			}
			oneTr.appendChild(fragmentD);
			fragmentR.appendChild(oneTr);
		}
		myTable.appendChild(fragmentR);
	}

	setMyTime();
	setHaeder();
	createMyC();
// 给right添加事件
	document.getElementById('cGoRight').onclick = function(e){
		if(myAllTime.month<11){
			setMyTime(myAllTime.year,myAllTime.month+1,1);
		}else{
			setMyTime(myAllTime.year+1,0,1);
		}
		setHaeder();
		createMyC();
		bindClickToTd();
		changeListener({year:myAllTime.year,month:myAllTime.month+1,date:myAllTime.date});
	};
// 给left添加事件
	document.getElementById('cGoLeft').onclick = function(e){
		if(myAllTime.month>0){
			setMyTime(myAllTime.year,myAllTime.month-1,1);
		}else{
			setMyTime(myAllTime.year-1,11,1);
		}
		setHaeder();
		createMyC();
		bindClickToTd();
		changeListener({year:myAllTime.year,month:myAllTime.month+1,date:myAllTime.date})
	};
	// 禁止头部鼠标点击时选中文本
	document.getElementById('cHeader').onselectstart = function(e){
		e.preventDefault();
	};
// 给每个小格添加事件
	function bindClickToTd(){
		var allDate = document.getElementsByClassName('haveDate');
		for(var i=0;i<allDate.length;i++){
			allDate[i].onclick = function(event){
				for(var j=0;j<allDate.length;j++){
					if(allDate[j].id==='choosedDay'){
						allDate[j].id ='';
						allDate[j].style.backgroundColor = 'white';
						allDate[j].style.color = '#666';
					}
				}
				event.target.id = 'choosedDay';
				event.target.style.backgroundColor = choosedBgColor;
				event.target.style.color = 'white';
				myAllTime.date = parseInt(event.target.innerHTML);
				changeListener({year:myAllTime.year,month:myAllTime.month+1,date:myAllTime.date})
			}	
		};
	}
	bindClickToTd();
	changeListener({year:myAllTime.year,month:myAllTime.month+1,date:myAllTime.date})
}
