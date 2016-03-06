$(document).ready(function(){

	var $youWord = $(".youWord");//获取所有的单词空格
	var $youTags = $("#tags ul li");//获取所有的tags
	var $youTagsi = $("#tags ul li i"); //获取tags下边的标记
	var $table = $("#allWordsTable table");
	var $allWords = $("#allWordsTable table tr td");//获取所有的td
	var $resultPanel = $("#checkResult");
	var $resultPrecent = $(".resultPrecent");
	var $resultTag = $("#checkResult .resultPanel ul li");
	var $checkExplain = $(".checkExplain");
	var $rightAnswer = $(".rightAnswer");
	var $explainContent = $("#explainContent p");
	var ifinCheckExplain = false;
	var flag = [];

	var currentChoise = null;
	var currentChoiseIndex = undefined;
	var currentChoiseFinnalWord = '';
	// 给空格绑定事件
	$youWord.bind("click",function(){
		currentChoise = this;
		currentChoiseFinnalWord = $(this).text();
		initTableAction();
		for(var i=0;i<$youWord.length;i++){
			if(this==$youWord[i]){
				currentChoiseIndex = i;
				if(!ifinCheckExplain){//是否是在解析页面
					$(this).addClass('currentChoise');
				}else{
					$explainContent.text(articleData.explain[i]);
				}
				$($youTagsi[i]).css('display','inline-block');
			}else{
				if($($youWord[i]).hasClass('currentChoise')){
					$($youWord[i]).removeClass('currentChoise');
				}
				$($youTagsi[i]).css('display','none');
			}
		}
	});
	// 给tags绑定事件
	$youTags.bind('click',function(){
		initTableAction();
		for(var i = 0;i<$youTags.length;i++){
			if(this == $youTags[i]){
				currentChoiseIndex = i;
				currentChoise = $youWord[i];
				currentChoiseFinnalWord = $($youWord[i]).text();
				$($youTagsi[i]).css('display','inline-block');
				if(!ifinCheckExplain){
					$($youWord[i]).addClass('currentChoise');
				}else{
					$explainContent.text(articleData.explain[i]);
				}
			}else{
				if($($youWord[i]).hasClass('currentChoise')){
					$($youWord[i]).removeClass('currentChoise');
				}
				$($youTagsi[i]).css('display','none');
			}
		}
	});
	// 初始化表格事件
	function initTableAction(){
		$allWords.bind('mouseover',function(){
			$(this).addClass('overColor');
			if(currentChoise!=null){
				$(currentChoise).text($(this).text());
			}
			
		});
		$allWords.bind('mouseout',function(){
			$(this).removeClass('overColor');
		});
		//给表格绑定click事件
		$allWords.bind('click',function(){
			$(this).addClass('textDelete');
			$(this).removeClass('overColor');
			$($youTags[currentChoiseIndex]).addClass('choised');
			$($youTagsi[currentChoiseIndex]).css('display','none');
			currentChoiseFinnalWord = $(this).text();
			$(currentChoise).removeClass('currentChoise');
			currentChoise = null;
			cancleTableAction();
			// 判断单词是否被选择过
			var haveChoiseWordString = [];
			for(var i= 0;i<$youWord.length;i++){
				haveChoiseWordString.push($($youWord[i]).text());
			}
			for(var i = 0;i<$allWords.length;i++){
				var thisTdWord = $($allWords[i]).text();
				if(haveChoiseWordString.indexOf(thisTdWord)==-1){
					$($allWords[i]).removeClass('textDelete');
				}
			}
		});
	}
	// 取消表格行为
	function cancleTableAction(){
		$allWords.unbind('mouseover');
		$allWords.unbind('mouseout');
		$allWords.unbind('click');
	}
	// 单没有点击时，还原之前的选择
	$table.bind('mouseleave',function(){
		if(currentChoise != null){
			$(currentChoise).text(currentChoiseFinnalWord);
		}
	});

	// 给交卷按钮绑定事件
	$("#check").click(function(){
		var rightCount = 0;
		for(var i = 0;i<$youWord.length;i++){
			if($($youWord[i]).text() == articleData.answer[i]){
				flag.push(1);
				rightCount++;
			}else{
				flag.push(0);
			}
		}

		$resultPrecent.text(rightCount/$youWord.length*100+"%");

		$resultTag.removeClass('wrong');

		for(var i = 0;i<flag.length;i++){
			if(flag[i] != 1){
				$($resultTag[i]).addClass('wrong');
			}
		}
		$resultPanel.show('fast');
	});


	//查解析按钮事件
	$checkExplain.click(function(){
		$resultPanel.hide('fast');
		$table.hide('fast');
		$("#allWordsTable #explainContent").show();
		$("#check").hide('fast');
		ifinCheckExplain = true;
		for(var i =0 ;i<flag.length;i++){
			if(flag[i]!=1){
				$($rightAnswer[i]).show();
				if($($youWord[i]).text().trim()!=''){
					$($youWord[i]).addClass('error');
				}else{
					$($youWord[i]).addClass('errorNull');
				}
				$($youTags[i]).addClass('error');
			}
		}

	});
	$(".returnBack").click(function(){
		$resultPanel.hide('fast');
		flag = [];
	})
});