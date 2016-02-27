window.onload=function(){
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
	window.onscroll = function(){
		var parent = document.getElementById(defaultParams.pNode);
		if(isLoading("main","box")){
			for(var i=0;i < data.data.length;i++){
				var box = document.createElement('div');
				box.className = defaultParams.boxClass;
				parent.appendChild(box);
				var pic = document.createElement('div');
				pic.className = defaultParams.picClass;
				box.appendChild(pic);
				var img = document.createElement('img');
				img.src = 'image/' + data.data[i].src;
				pic.appendChild(img);
			}
			waterfall(defaultParams.pNode,defaultParams.boxClass);
		}
	};
};

function waterfall(pNode,box){
	//取所有class为box的元素
	var parent = document.getElementById(pNode);
	var boxs = getElementByClass(parent,box);

	var boxWidth = boxs[0].offsetWidth;
	var colcount = Math.floor(document.body.clientWidth / boxWidth);
	parent.style.cssText = 'width:' + boxWidth * colcount + 'px';

	//存放每一列box的总高
	var row = new Array();
	for(var i=0; i < boxs.length; i++){
		if(i < colcount){
			row.push(boxs[i].offsetHeight);
		}
		else{
			var minh = Math.min.apply(null, row);
			var index = getMinIndex(row, minh);
			boxs[i].style.position = "absolute";
			boxs[i].style.top = minh + 'px';
			boxs[i].style.left = boxs[index].offsetLeft + 'px';
			row[index] += boxs[i].offsetHeight;
		}
	}
}
function getMinIndex(array,min){
	for(var i in array){
		if(array[i] == min){
			return i; 
		}
	}
	return -1;
}
function getElementByClass(parent,cName){
	var boxArray = new Array(),
		elements = parent.getElementsByTagName('*');
	for(var i=0;i < elements.length; i++){
		if(elements[i].className == cName){
			boxArray.push(elements[i]);
		}
	}
	return boxArray;
}

//检测是否应该加载余下数据块
function isLoading(pNode,box){
	var parent = document.getElementById(pNode);
	var boxs = getElementByClass(parent,box);
	var boxTop = boxs[boxs.length - 1].offsetTop + Math.floor( boxs[boxs.length - 1].offsetHeight / 2 );
	var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	var screenH = document.body.clientHeight || document.documentElement.clientHeight;
	if(boxTop <= scrollTop + screenH){
		return true;
	}
	else{
		return false;
	}
}