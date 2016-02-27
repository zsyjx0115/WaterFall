$(window).on("load",function(){
	var defaultParams = {
		"pNode" : "main",
		"boxClass" : "box",
		"picClass" : "pic"
	};
	var data = {
		"data" : [{
			"src" : "20.jpg"
		},{
			"src" : "1.jpg"
		},{
			"src" : "2.jpg"
		},{
			"src" : "3.jpg"
		},{
			"src" : "4.jpg"
		},{
			"src" : "5.jpg"
		},{
			"src" : "6.jpg"
		},{
			"src" : "7.jpg"
		},{
			"src" : "8.jpg"
		},{
			"src" : "9.jpg"
		},{
			"src" : "10.jpg"
		},{
			"src" : "11.jpg"
		},{
			"src" : "12.jpg"
		},{
			"src" : "13.jpg"
		},{
			"src" : "14.jpg"
		},{
			"src" : "15.jpg"
		},{
			"src" : "16.jpg"
		},{
			"src" : "17.jpg"
		},{
			"src" : "18.jpg"
		},{
			"src" : "19.jpg"
		}]
	};
	waterfall(defaultParams.pNode,defaultParams.boxClass);
	$(window).on("scroll", function(){
		var parent = document.getElementById(defaultParams.pNode);
		if(isLoading("main","box")){
			$.each(data.data,function(index,value){
				var box = $("<div></div>").addClass(defaultParams.boxClass)
										.appendTo($("#"+defaultParams.pNode));
				var pic = $("<div></div>").addClass(defaultParams.picClass)
										.appendTo(box);
				$("<img>").attr("src","image/"+value.src)
						.appendTo(pic);
			})
			waterfall(defaultParams.pNode,defaultParams.boxClass);
		}
	});

	//该瀑布流布局可以根据窗口可视宽度自行调整列数
	$(window).resize(function(){
		waterfall(defaultParams.pNode,defaultParams.boxClass);
	});
});

function waterfall(pNode,box){
	//取所有class为box的元素
	var $parent = $("#"+pNode);
	var $boxs = $parent.find("."+box);

	var boxWidth = $boxs.eq(0).outerWidth();
	var colcount = Math.floor($(window).width() / boxWidth);
	$parent.width(boxWidth * colcount);

	//存放每一列box的总高
	var rowHeight = new Array();

	$boxs.each(function(index,value){
		if(index < colcount){
			rowHeight.push($(this).outerHeight());
			//给第一排的元素也进行定位，这样重排的时候不会错位
			$(this).css({
				"position": "absolute",
				"top": '0px',
				"left": index * boxWidth + 'px'
			});
		}
		else{
			var minh = Math.min.apply(null, rowHeight);
			//jquery方便之处！！
			var indexMin = $.inArray(minh, rowHeight);
			$(this).css({
				"position": "absolute",
				"top": minh + 'px',
				"left": indexMin * boxWidth + 'px'
			});
			rowHeight[indexMin] += $(this).outerHeight();
		}
	});
}

//检测是否应该加载余下数据块
function isLoading(pNode,box){
	var parent = $("#"+pNode);
	var boxs = parent.find("."+box);
	var lastbox = boxs.last();
	var boxTop = lastbox.offset().top + Math.floor( lastbox.height() / 2 );
	var scrollTop = $(window).scrollTop();
	var screenH = $(window).height();
	if(boxTop <= scrollTop + screenH){
		return true;
	}
	else{
		return false;
	}
}