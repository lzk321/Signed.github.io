/*
* @Author: thinkpad
* @Date:   2017-11-07 23:11:16
* @Last Modified by:   thinkpad
* @Last Modified time: 2017-11-08 14:33:45
*/
window.onload=function(){


	//左侧的
	//
	left();

	//右侧
	right();



//左侧
	function left(){
		var left=document.querySelector('.left');
		
		var ul=left.querySelector('ul');
		var a=left.querySelectorAll('a');

		// console.log(li);
		// 
		// 手指触碰开始移动的距离
		var start=0;
		//手指移动过程结束移动的距离
		var end=0;
		//移动的距离
		var move=0;
		//
		//ul当前滚动的距离
		var nowRange=0;

		//向下滚动式时的正常范围
		var normalscrollDown=0;
		//向上滚动时的正常范围
		var normalscrollTop=left.offsetHeight-ul.offsetHeight;

		//向下滚动的最大范围
		var maxscrollDown=normalscrollDown+100;
		//向上滚动的最大范围
		var maxscrollTop=normalscrollTop-100;
		//当开始滑动的时候触发
		ul.addEventListener('touchstart', function(event){
			// console.log(event);
			start=event.touches[0].clientY;
		})
		//当在元素中滑动的时候触发
		ul.addEventListener('touchmove',function(event){

			end=event.touches[0].clientY;
			//滚动的距离
			move=end-start;
			// console.log(move);
			//判断是不是不是没有超出最大范围
			if(move+nowRange<maxscrollDown&&move+nowRange>maxscrollTop){
				ul.style.transition="none";
				ul.style.transform="translateY("+(move+nowRange)+"px)";
			}


		});


		ul.addEventListener("touchend" ,function(){
			//记录当前位置
			nowRange=move+nowRange;
			//如果当前位置大于正常的位置，恢复到正常位置
			if(nowRange>normalscrollDown){
				nowRange=normalscrollDown;
				ul.style.transition="all 0.5s"
				ul.style.transform="translateY("+(nowRange)+"px)";
			}
			//如果当前位置小于当前位置，恢复到正常位置
			if(nowRange<normalscrollTop){
				nowRange=normalscrollTop;
				ul.style.transition="all 0.5s"
				ul.style.transform="translateY("+nowRange+"px)";

			}
		});
		



		tap(ul,function(e){
			for(var i=0;i<a.length;i++){
				a[i].classList.remove('active');
				a[i].index=i;
			}
			e.target.classList.add('active');

			//将要滚动的位置
			var willscroll=-e.target.index*a[0].offsetHeight;
			if(willscroll>normalscrollTop){
				nowRange=willscroll;
				ul.style.transition="all 0.5s"
				ul.style.transform="translateY("+nowRange+"px)"
			}
		});
	}







//右侧
	function right(){
		var right=document.querySelector(".right");
		var ul=right.querySelector(".con");
		var li=ul.querySelectorAll('li');
		var img=right.querySelector(".ad");
		var imghight=img.offsetHeight;
		// console.log(imghight);
		//手指开始滑动时的开始位置
		var start=0;
		//手指结束滑动时的开始位置
		var end=0;
		//移动的距离
		var move=0;
		//当前的距离
		var nowRange=0;
		//正常向下滚动的距离
		var normalscrollDown=0;
		//正常向上滚动的距离
		var normalscrollTop=right.offsetHeight-imghight-ul.offsetHeight;
		
		// console.log(normalscrollTop);
		//最大的向下滚动的距离
		var maxdown=normalscrollDown+100;

		//最大的向上滚动的距离
		var maxtop=normalscrollTop-100;

		ul.addEventListener("touchstart", function(event){
			start=event.touches[0].clientY;
			
		})
		ul.addEventListener("touchmove",function(event){
			end=event.touches[0].clientY;
			move=end-start;

			// console.log(maxtop);
			if(move+nowRange<maxdown&&move+nowRange>maxtop){
				// console.log(move);
				ul.style.transition="none";
				ul.style.transform="translateY("+(move+nowRange)+"px)";
			}
			
		})

		ul.addEventListener("touchend",function(){
			 nowRange=move+nowRange;
			 if(nowRange>normalscrollDown){
			 	nowRange=normalscrollDown;
			 	ul.style.transition="all 0.5s"
			 	ul.style.transform="translateY("+nowRange+"px)";
			 }

			 if(nowRange<normalscrollTop+imghight-20){
			 	// console.log(normalscrollTop);
			 	nowRange=normalscrollTop+imghight-20;
			 	ul.style.transition="all 0.5s"
			 	ul.style.transform="translateY("+nowRange+"px)";
			 }
		})

	}









//封装移动点击事件
        function tap(dom,func){
			if(dom && typeof dom =='object'){
				//记录当前是否发生了touchmove事件
				var isMove=false;
				//记录touchstart发生时的时间
				var startTime=0;
				//滑动开始时
				dom.addEventListener("touchstart", function(){
					//返回当前事件触发时的毫秒值
					startTime=Date.now();
				})
				dom.addEventListener("touchmove" ,function(){
					isMove=true;
				});
				//如果没触发touchmove事件且touchend事件与touchstart事件发生的时间不超过150毫秒
				dom.addEventListener("touchend", function(event){
					if(!isMove && Date.now()-startTime<150){
						//执行回调函数
						func&&func(event);
					}

					//防止下次轻敲时出问题
					isMove=false;
					startTime=0;
				});



			}
		}
}