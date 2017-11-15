/*
* @Author: thinkpad
* @Date:   2017-11-06 21:32:32
* @Last Modified by:   thinkpad
* @Last Modified time: 2017-11-07 21:28:13
*/
window.onload=function(){
	//头部颜色变化
	headerOpacity();
	//轮播图
	bannerImg();

    //倒计时
    time();





//头部颜色变化
 function  headerOpacity(){
 	var header=document.querySelector('.header');
	var banner=document.querySelector('.banner');

	
	document.onscroll=function(){

		 // console.log(document.documentElement.scrollTop);
		var x=document.documentElement.scrollTop 
		// console.log(x);
		
		var opacity=0.85*x/banner.offsetHeight;
		
		if(opacity>=0.85){
			opacity=0.85;
		}
		header.style.background="rgba(210,21,35,"+opacity+")";
	}
 }


//轮播图
	function bannerImg(){
		var bannerUl=document.querySelector('.bannerUl');
		var bannerLi=bannerUl.querySelectorAll('li');
		var sWidth=document.documentElement.clientWidth;
		var point=document.querySelector('.point');
		var bannerSpan=point.querySelectorAll('span');
		// console.log(bannerSpan);
		// console.log(sWidth);
		// 给li设置宽度为屏幕宽度
		for(var i=0;i<bannerLi.length;i++){
			bannerLi[i].style.width=sWidth+'px';
		}
		var start=0;
		var end=0;
		var b=0;
		var index=0;
		var timer=null;
		//给ul设置宽度，为所有li的宽度总
		bannerUl.style.width=(sWidth*bannerLi.length)+"px";

			//当开始滑动的时候触发的事件
		bannerUl.addEventListener('touchstart',function(event){
			start=event.touches[0].clientX;
			clearInterval(timer);
		})

		//当在在元素中移动时触发的事件
		bannerUl.addEventListener('touchmove',function(event){
			end=event.touches[0].clientX;
		  b = Math.abs(end - start);
		})

		//当滑动结束时触发的事件
		bannerUl.addEventListener('touchend',function(event){
			if(end-start>0){
				if(b>30){
					index--;
					if(index<=0){
						index=0
					}
					bannerUl.style.transform = "translateX("+ (-index*sWidth) +"px)";
					
				}
				
			}else{
				if(b>30){
					// console.log('向左滑动');
					index++;
					if(index>=bannerLi.length-1){
						index=bannerLi.length-1
					}
					bannerUl.style.transform = "translateX("+ (-index*sWidth) +"px)";
					
				}
				
			}

			    //如果松开开启定时器
				Movepoint(bannerSpan,index);
				timer=setInterval(function(){
					index++
					if(index>bannerLi.length-1){
						index=0
					}
					bannerUl.style.transform="translateX("+(-index*sWidth)+"px)";
					Movepoint(bannerSpan,index);
				}, 2000)	
			    b=0;
		});
		//设置定时器轮播图片
		timer=setInterval(function(){
		        index++;
				if(index>bannerLi.length-1){
					index=0;
				}
			     bannerUl.style.transform = "translateX("+ (-index*sWidth) +"px)";
				 Movepoint(bannerSpan,index);
				}, 2000)
	}
	

//白点移动
   function Movepoint(arr,index){
   		//循环去除所有的active类名
   		for(var i=0;i<arr.length;i++){
   			arr[i].classList.remove('active');
   		}
   		//当前index的span加active类名
   		arr[index].classList.add('active');
   }

//倒计时
	
	function time(){
		var time=document.querySelector('.time');
		var span=time.querySelectorAll('span');
		var timer=null;
		//获取固定时间
		var newTime=new Date("2017/11/11");
		
		
		timer=setInterval(function(){
			//获取当前时间
			 var  nowTime=new Date();
		     var t=(newTime-nowTime)/1000;
		    


		 var hour =Math.floor(t/60/60);
		var minute = Math.floor(t%86400%3600/60);
		var seconds = Math.floor(t%60);
		
		
		span[0].innerHTML=Math.floor(hour/10);
		span[1].innerHTML=Math.floor(hour%10);
		span[3].innerHTML=Math.floor(minute/10);
		span[4].innerHTML=Math.floor(minute%10);
		span[6].innerHTML=Math.floor(seconds/10);
		span[7].innerHTML=Math.floor(seconds%10);
		},1000);
		

		
	}


	

}