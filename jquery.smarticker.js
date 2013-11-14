/*
 * SmarTicker
 * http://powerup.ir/projects/smarticker
 * Copyright (c) 2013 Meghdad Hadidi
 */

(function($){
	$.fn.smarticker = function(options){
		
		var settings = $.extend({},$.fn.smarticker.defaults, options);
		
		return this.each(function(index){
			
			// Set the variables from our page elements
			var element = $(this);
			var newsItems = $('li', element);
			var smartickerCats = $('<div class="smarticker-cats"><ul></ul></div>');
			var smartickerCategory = $('<div class="smarticker-category"><ul></ul></div>');
			var newsRollerIndex = settings.startindex;
			var smartController = $('<div class="smart-controller"><span class="prev-news">Previous</span><span class="next-news">Next</span></div>');
			var progressBar = $('<div class="progress-bar"></div>');
			var titlebar = $('<div class="sec1-2 tickertitle"></div>');
			var pause = 0;
			
			// Wrap list of news to a DIV
			element.addClass('smarticker').wrapInner('<div class="smarticker-news"></div>');
			
			// Reset some settings value
			if(unique(newsItems, 'subcategory').length < 1) settings.subcategory = false;
			if(unique(newsItems, 'category').length < 1) settings.category = false;
			
			
			// Generate list of subcategories if exists
			if(settings.subcategory == true){
				smartickerCats.prependTo(element).addClass('sec1-2');
				$.each(unique(newsItems, 'subcategory'), function(i,e){
					smartickerCats.find('ul').append('<li data-subcategory="'+e+'"><a>'+e+'</a></li>');
				});
				if(settings.theme == 1 || settings.theme == 2){
					smartickerCats.find('ul').wrap('<div class="catlist"></div>');
					smartickerCats.append('<span class="right"></span>').prepend('<span class="left"></span>');
				}
			}
			
			// Generate list of categories if exists	
			if(settings.category == true && unique(newsItems, 'category').length > 0){
				smartickerCategory.prependTo(element).addClass('sec1-2');
				$.each(unique(newsItems, 'category'), function(i,e){
					smartickerCategory.find('ul').append('<li data-category="'+e+'"><a>'+e+'</a></li>');
				});
			}
			
			// Add some features depends on settings
			if(settings.progressbar == true) progressBar.appendTo($('.smarticker-news', element));
			if(settings.controller == true) smartController.appendTo($('.smarticker-news', element));
			if(settings.category == false) element.addClass('no-category');
			if(settings.subcategory == false) element.addClass('no-subcategory');

			element.addClass('theme'+settings.theme);
			element.addClass('box size1');
			element.addClass('c'+settings.controllertype);
			
			$('.smarticker-news', element).addClass('sec7 newsholder hidden');
			$('.smarticker-news > ul', element).attr('id','newsholder').addClass('newsholder hidden');

			if(settings.rounded == true) element.addClass('rounded');
			if(settings.direction == 'rtl') element.addClass('rtl');
			if(settings.border == true) element.addClass('border');
			if(settings.shadow == true) element.addClass('shadow');
			if(settings.category == false || settings.subcategory == false){
				$('.smarticker-news', element).removeClass('sec7').addClass('sec10');
			}
			if(settings.category == false && settings.subcategory == false && settings.titlesection == true){
				$('.smarticker-news', element).removeClass('sec7').addClass('sec10');
				titlebar.prependTo(element).text(settings.title);
			}

			
			// Functions for remove duplicates from subcategory and category list
			function unique(list,section) {
			  var result = [];
			  $.each(list, function(i, e) {
			    if ($.inArray($(e).data(section), result) == -1 && $(e).data(section) != undefined) result.push($(e).data(section));
			  });
			  return shuffle(result);
			}
			
			// Functions for randomize subcategory and category list
			function shuffle(arr){
			  for(var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
			  return arr;
			}

			// Ticker will start from category
			function nextCategory(){
				if(settings.category == false){
					nextSubcategory();
				}
				else{
					$('.active-ag', element).removeClass('active-ag');
					var category = $('.newsholder li', element).eq(newsRollerIndex).data('category');
					category = $('.smarticker-category ul li', element).index($('.smarticker-category ul li[data-category="'+category+'"]', element));
					$('.smarticker-category ul li', element).eq(category).addClass('active-ag');
					category = $('.active-ag', element);
					$('.smarticker-category', element).animate({
						scrollTop: category.offset().top - category.parent().offset().top + category.parent().scrollTop()
					},settings.speed - (settings.speed/2.5),function(){
						if(settings.subcategory != false){
							nextSubcategory();
						}
						else{
							nextNews();
						}
						
						// Change background color of category section with animate() method
						var categorycolor = $('.newsholder', element).find('li').eq(newsRollerIndex).data('color');
						if(categorycolor != undefined && settings.catcolor != false){
							$('.active-ag a', element).stop().animate({color:'#'+categorycolor},settings.speed - (settings.speed/2.5));
						}
						else $('.active-ag a', element).stop().animate({color:'#999'},settings.speed - (settings.speed/2.5));
					});
				}
			}
			
			// Ticker will start from category
			function nextSubcategory(){
				if(settings.subcategory == false){
					nextNews();
					return false;
				}
				$('.active-cat', element).removeClass('active-cat');
				var subcategory = $('.newsholder li', element).eq(newsRollerIndex).data('subcategory');
				subcategory = $('.smarticker-cats li', element).index($('.smarticker-cats li[data-subcategory="'+subcategory+'"]', element));
				$('.smarticker-cats ul li', element).eq(subcategory).addClass('active-cat');
				subcategory = $('.active-cat', element);
				var subcategoryParent = subcategory.parent();
				if($('.catlist', element).length > 0) subcategoryParent = $('.catlist', element);
				else subcategoryParent = $('.smarticker-cats', element);
				subcategoryParent.animate({
					scrollTop: Math.max(subcategory.offset().top - subcategoryParent.offset().top + subcategoryParent.scrollTop(),0)
				},settings.speed - (settings.speed/2.5),nextNews);
				var subcategorycolor = $('.newsholder', element).find('li').eq(newsRollerIndex).data('color');
				
				// Change background color of subcategory section with animate() method
				if(subcategorycolor != undefined && settings.subcatcolor != false){
					$('.smarticker-cats li', element).animate({backgroundColor:'#'+subcategorycolor},settings.speed - (settings.speed/2.5));
				}
				else $('.smarticker-cats li', element).animate({backgroundColor:'#c3c3c3'},settings.speed - (settings.speed/2.5));
			}
			
			// Know it's time to change news title			
			function nextNews(){
				$('.newsholder', element).css({
					'display':'block',
					'height':'100%'
				});
				
				progressBar.css('width','100%').animate({width:0},settings.pausetime);
				
				// Detect animation type depend on settings, then choose one of these options
				if(settings.animation == 'default'){
					if($('.activeRollerItem', element).length > 0){
						var activeItem = $('.activeRollerItem', element);
						activeItem.animate({top:-25,opacity:0},settings.speed - (settings.speed/1.2),function(){activeItem.css('display','none')}).removeClass('activeRollerItem');
					}
					var thisItem = $('.newsholder', element).find('li').eq(newsRollerIndex).addClass('activeRollerItem');
					thisItem.css({'top':'25px','display':'block'}).animate({opacity:1,top:0},settings.speed - (settings.speed/2.5),function(){
						newsRollerIndex++;
						if(newsRollerIndex == $('.newsholder', element).find('li').length) newsRollerIndex = 0;
						nextInterval = setTimeout(nextCategory,settings.pausetime)
					});
				}

				if(settings.animation == 'slide'){
					if($('.activeRollerItem', element).length > 0){
						activeItem = $('.activeRollerItem', element);
						activeItem.animate({left:250,opacity:0},settings.speed - (settings.speed/1.5),function(){activeItem.css('display','none')}).removeClass('activeRollerItem');
					}
					var thisItem = $('.newsholder li', element).eq(newsRollerIndex).addClass('activeRollerItem');
					thisItem.css({'left':'-150px','display':'block','opacity':'1'}).animate({opacity:1,left:10},settings.speed - (settings.speed/3),function(){
						newsRollerIndex++;
						if(newsRollerIndex == $('.newsholder li', element).length) newsRollerIndex = 0;
						nextInterval = setTimeout(nextCategory,settings.pausetime)
					});
				}
				
				if(settings.animation == 'fade'){
					if($('.activeRollerItem', element).length > 0){
						activeItem = $('.activeRollerItem', element);
						activeItem.fadeOut(settings.speed/2,function(){
							activeItem.removeClass('activeRollerItem');
						});
					}
					var thisItem = $('.newsholder li', element).eq(newsRollerIndex).addClass('activeRollerItem');
					thisItem.css({'top':'0','display':'none'}).fadeIn(settings.speed/2,function(){
						newsRollerIndex++;
						if(newsRollerIndex == $('.newsholder li', element).length) newsRollerIndex = 0;
						nextInterval = setTimeout(nextCategory,settings.pausetime)
					});
				}
				
				if(settings.animation == 'typing'){
					if($('.activeRollerItem', element).length > 0){
						activeItem = $('.activeRollerItem', element);
						var hider = $('<div class="hider"></div>');
						hider.prependTo($('.smarticker-news', element)).css({
							'width':'0px',
							'left':'0px',
							'height':'100%',
							'position':'absolute',
							'background-color':element.css('background-color'),
							'z-index':'2'
						})
						hider.animate({width:activeItem.width()+30},settings.speed,function(){
							activeItem.fadeOut(100,function(){
								activeItem.css('opacity','0').removeClass('activeRollerItem');
								hider.fadeOut(100,function(){
									var thisItem = $('.newsholder li', element).eq(newsRollerIndex).addClass('activeRollerItem').css({
										'display':'block',
										'opacity':'1'
									});
									hider.remove();
									var cover = $('<div class="cover"><div class="flasher">_</div></div>');
									cover.prependTo($('.smarticker-news', element));
									cover.css({
										'background-color':element.css('background-color')
									});
									cover.animate({left:thisItem.width()+30},thisItem.width()*8,
										function(){
											cover.remove();
											newsRollerIndex++;
											if(newsRollerIndex == $('.newsholder li', element).length) newsRollerIndex = 0;
											nextInterval = setTimeout(nextCategory,settings.pausetime)
										}
									);
								});
							});
						});
					}
					else{
						var thisItem = $('.newsholder li', element).eq(newsRollerIndex).addClass('activeRollerItem').css({
							'display':'block',
							'opacity':'1'
						});
						var cover = $('<div class="cover"><div class="flasher">_</div></div>');
						cover.prependTo($('.smarticker-news', element));
						cover.css({
							'background-color':element.css('background-color')
						});
						cover.animate({left:thisItem.width()+30},thisItem.width()*8,function(){
								cover.remove();
								if(pause == 0){
									newsRollerIndex++;
									if(newsRollerIndex == $('.newsholder li', element).length) newsRollerIndex = 0;
									nextInterval = setTimeout(nextCategory,settings.pausetime)
								}
							});
					}
				}	
			}
			// Start running SmarTicker
			nextCategory();
			})
		}
	
	// SmarTicker default options
	$.fn.smarticker.defaults = {
		theme: 1, 				// Defines SmarTicker Style: 1, 2, 3, 4 ...
		animation: 'default',	// Defines transition of news titles: default, fade, slide, ...
		speed: 1000,			// Defines speed of transition for subcategory, category and news
		startindex: 0,			// Starter index
		pausetime: 3000,		// Pause time on each news
		rounded: false,			// Add border radius to parent node
		shadow: true,			// Add box-shadow to parent node
		border: false,			// Add 1px solid border to parent node
		category: true,			// If change this to false, the Category section will not be created
		subcategory: true,		// If change this to false, the Subcategory section will not be created
		titlesection: true,
		title: 'Headlines',		// When category and subcategory not available this section will show
		progressbar: false,		// Add a progress bar
		catcolor: true,			// Animate category section background color
		subcatcolor: true		// Animate sub category section background color
	}

})(jQuery);

