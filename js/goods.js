/*
* @Author: thinkpad
* @Date:   2017-11-09 19:49:40
* @Last Modified by:   thinkpad
* @Last Modified time: 2017-11-09 23:16:20
*/
window.onload=function(){

	var del=document.querySelectorAll(".del");
	var box=document.querySelector(".box");
	var fa=document.querySelector(".false");
	var delbox=document.querySelector('.delbox');
	var dtop=document.querySelectorAll(".dtop");
	// console.log(del);
	var index=null;
	for(var i=0;i<del.length;i++){
		del[i].index=i;
		del[i].onclick=function(){
			box.style.zIndex = 1000;
			box.style.opacity="1";
			// delbox.style.transform="translateY("+30+"px)";	
			delbox.classList.add('bounceInDown');
			index=this.index;
			dtop[this.index].style.transform="rotate("+(-45)+"deg)";

		}
	}


	fa.onclick=function(){
		    box.style.zIndex = -1;
			box.style.opacity="0";
			// delbox.style.transform="translateY("+(-400)+"px)"
			delbox.classList.remove('bounceInDown');
			dtop[index].style.transform="rotate("+(0)+"deg)";
	}






}