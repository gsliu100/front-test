$(document).ready(function(){
	var $navBars = $('.mainNav > ul > li');
	$navBars.bind('mouseenter',function(){
		$(this).children('ul').stop();
		$(this).children('ul').slideDown('fast');
	});
	$navBars.bind('mouseleave',function(){
		$(this).children('ul').stop();
		$(this).children('ul').slideUp('fast');
	});



	var $mobileNavs = $('.mobileNav .mobileMainNav >li >a');
	$mobileNavs.bind('click',function(event){
		// event = event||window.event;
		event.preventDefault();
		$mobileNavs.next().slideUp('fast');
		$(this).next().slideToggle('fast');
	});

	$('#mobileTog').click(function(){
		// event = event||window.event;
		event.preventDefault();
		$('#mobileNav').slideToggle('fast');
	});

});