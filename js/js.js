function getStyle(obj,attr){
				return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj,false)[attr];
			}
function move(obj,json,option){
				option=option||{};
				option.time=option.time||30;
				option.type=option.type||Tween.Linear;
				var start={},
					end={},
					n=0;
				for(var attr in json){
					start[attr]=parseInt(getStyle(obj,attr));
					end[attr]=json[attr]-start[attr];
				}
				clearInterval(obj.timer);
				obj.timer=setInterval(function(){
					n++;
					for(var attr in json){
						var current=option.type(n,start[attr],json[attr]-start[attr],option.time);
						if(attr=='opacity'){
							obj.style[attr]=current;
							obj.style.filter='alpha(opacity='+current*100+')';
						}else{
							obj.style[attr]=current+'px';
						}
					}
					if(n==option.time){
						clearInterval(obj.timer);
						option.fu&&option.fu();
					}
				},30)
			}
var Tween = {
				//匀速
				Linear: function(t,b,c,d){ return c*t/d + b; },
				//二次方缓动效果
				Quad: {
					easeIn: function(t,b,c,d){
						return c*(t/=d)*t + b;
					},
					easeOut: function(t,b,c,d){
						return -c *(t/=d)*(t-2) + b;
					},
					easeInOut: function(t,b,c,d){
						if ((t/=d/2) < 1) return c/2*t*t + b;
						return -c/2 * ((--t)*(t-2) - 1) + b;
					}
				},
				//三次方缓动效果
				Cubic: {
					easeIn: function(t,b,c,d){
						return c*(t/=d)*t*t + b;
					},
					easeOut: function(t,b,c,d){
						return c*((t=t/d-1)*t*t + 1) + b;
					},
					easeInOut: function(t,b,c,d){
						if ((t/=d/2) < 1) return c/2*t*t*t + b;
						return c/2*((t-=2)*t*t + 2) + b;
					}
				},
				//四次方缓动效果
				Quart: {
					easeIn: function(t,b,c,d){
						return c*(t/=d)*t*t*t + b;
					},
					easeOut: function(t,b,c,d){
						return -c * ((t=t/d-1)*t*t*t - 1) + b;
					},
					easeInOut: function(t,b,c,d){
						if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
						return -c/2 * ((t-=2)*t*t*t - 2) + b;
					}
				},
				//五次方缓动效果
				Quint: {
					easeIn: function(t,b,c,d){
						return c*(t/=d)*t*t*t*t + b;
					},
					easeOut: function(t,b,c,d){
						return c*((t=t/d-1)*t*t*t*t + 1) + b;
					},
					easeInOut: function(t,b,c,d){
						if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
						return c/2*((t-=2)*t*t*t*t + 2) + b;
					}
				},
				//正弦缓动效果
				Sine: {
					easeIn: function(t,b,c,d){
						return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
					},
					easeOut: function(t,b,c,d){
						return c * Math.sin(t/d * (Math.PI/2)) + b;
					},
					easeInOut: function(t,b,c,d){
						return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
					}
				},
				//指数缓动效果
				Expo: {
					easeIn: function(t,b,c,d){
						return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
					},
					easeOut: function(t,b,c,d){
						return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
					},
					easeInOut: function(t,b,c,d){
						if (t==0) return b;
						if (t==d) return b+c;
						if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
						return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
					}
				},
				//圆形缓动函数
				Circ: {
					easeIn: function(t,b,c,d){
						return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
					},
					easeOut: function(t,b,c,d){
						return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
					},
					easeInOut: function(t,b,c,d){
						if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
						return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
					}
				},
				//指数衰减正弦曲线缓动函数
				Elastic: {
					easeIn: function(t,b,c,d,a,p){
						if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
						if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
						else var s = p/(2*Math.PI) * Math.asin (c/a);
						return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
					},
					easeOut: function(t,b,c,d,a,p){
						if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
						if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
						else var s = p/(2*Math.PI) * Math.asin (c/a);
						return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
					},
					easeInOut: function(t,b,c,d,a,p){
						if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
						if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
						else var s = p/(2*Math.PI) * Math.asin (c/a);
						if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
						return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
					}
				},
				//超过范围的三次方的缓动函数
				Back: {
					easeIn: function(t,b,c,d,s){
						if (s == undefined) s = 1.70158;
						return c*(t/=d)*t*((s+1)*t - s) + b;
					},
					easeOut: function(t,b,c,d,s){
						if (s == undefined) s = 1.70158;
						return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
					},
					easeInOut: function(t,b,c,d,s){
						if (s == undefined) s = 1.70158; 
						if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
						return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
					}
				},
				//指数衰减的反弹曲线缓动函数
				Bounce: {
					easeIn: function(t,b,c,d){
						return c - Tween.Bounce.easeOut(d-t, 0, c, d) + b;
					},
					easeOut: function(t,b,c,d){
						if ((t/=d) < (1/2.75)) {
							return c*(7.5625*t*t) + b;
						} else if (t < (2/2.75)) {
							return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
						} else if (t < (2.5/2.75)) {
							return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
						} else {
							return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
						}
					},
					easeInOut: function(t,b,c,d){
						if (t < d/2) return Tween.Bounce.easeIn(t*2, 0, c, d) * .5 + b;
						else return Tween.Bounce.easeOut(t*2-d, 0, c, d) * .5 + c*.5 + b;
					}
				}
			}
var oM_headerrt=document.getElementById('m_headerrt'),
	oM_headerrta=document.getElementById('m_headerrta'),
	oM_headerdw=document.getElementById('m_headerdw'),
	oU_headerdwbtt=document.getElementById('u_headerdwbtt');
oM_headerrt.onclick = function(){
	oM_headerrt.style.right=-1000+'px';
	oM_headerrt.style.opacity=0;
	oM_headerrta.style.right=0+'px';
	move(oM_headerrta,{opacity:'1'},{time:20});
	move(oM_headerdw,{height:'700'},{time:20});
}
oM_headerrta.onclick = function(){
	oM_headerrta.style.right=-1000+'px';
	oM_headerrta.style.opacity=0;
	oM_headerrt.style.right=0+'px';
	move(oM_headerrt,{opacity:'1'},{time:20});
	move(oM_headerdw,{height:'0'},{time:20});
}
oU_headerdwbtt.onclick=function(){
	oM_headerrta.style.right=-1000+'px';
	oM_headerrta.style.opacity=0;
	oM_headerrt.style.right=0+'px';
	move(oM_headerrt,{opacity:'1'},{time:20});
	move(oM_headerdw,{height:'0'},{time:20});
}
var oM_bannerbox=document.getElementById('m_bannerbox'),
	aM_banner=oM_bannerbox.getElementsByTagName('div'),
	oU_left=document.getElementById('u_left'),
	oU_right=document.getElementById('u_right'),
	oU_dian=document.getElementById('u_dian'),
	aU_dian=oU_dian.getElementsByTagName('a'),
	oU_sbannerl=document.getElementById('u_sbannerl'),
	oU_sbannerr=document.getElementById('u_sbannerr'),
	oImgl=oU_sbannerl.getElementsByTagName('img')[0],
	oH4l=oU_sbannerl.getElementsByTagName('h4')[0],
	oPl=oU_sbannerl.getElementsByTagName('p')[0],
	oImgr=oU_sbannerr.getElementsByTagName('img')[0],
	oH4r=oU_sbannerr.getElementsByTagName('h4')[0],
	oPr=oU_sbannerr.getElementsByTagName('p')[0],
	arra=['images/banner1.jpg','images/banner2.jpg','images/banner3.jpg','images/banner4.jpg','images/banner5.jpg'],
	arrb=['天骄铁骑','初冬暖人心','新资料片今日上线','《天下》手游福利全开','全自由沙盘战略'],
	arrc=['大型3D国战MMO手游','劲舞团手游·真爱季','异次元战姬-魔界之门','双11庆典大放送！','寸土必争的乐趣'];
var j=0,
	n=4,
	m=1,
	isNext=false,
	timer1=null;
aM_banner[j].style.opacity=1;
aU_dian[j].className+=' active';
oImgl.src=arra[4];
oH4l.innerHTML=arrb[4];
oPl.innerHTML=arrc[4];
oImgr.src=arra[1];
oH4r.innerHTML=arrb[1];
oPr.innerHTML=arrc[1];
for(var i=0;i<aM_banner.length;i++){
	aM_banner[i].style.backgroundImage='url('+arra[i]+')';
}
oU_left.onclick=function(){
	if(isNext) return false;
    isNext = true;
	move(aM_banner[j],{opacity:'0'},{time:20,fu:function(){isNext=false;}});
	for(var i=0;i<aU_dian.length;i++){
		aU_dian[i].className='';
	}
	j--;
	if(j<0) j=aM_banner.length-1;
	move(aM_banner[j],{opacity:'1'},{time:20,fu:function(){isNext=false;}});
	aU_dian[j].className+=' active';
	n=j-1;
	if(n<0) n=aM_banner.length-1;
	oImgl.src=arra[n];
	oH4l.innerHTML=arrb[n];
	oPl.innerHTML=arrc[n];
	m=j+1;
	if(m>aM_banner.length-1) m=0;
	oImgr.src=arra[m];
	oH4r.innerHTML=arrb[m];
	oPr.innerHTML=arrc[m];
}
oU_right.onclick=function(){
	if(isNext) return false;
    isNext = true;
	move(aM_banner[j],{opacity:'0'},{time:20,fu:function(){isNext=false;}});
	for(var i=0;i<aU_dian.length;i++){
		aU_dian[i].className='';
	}
	j++;
	if(j>aM_banner.length-1) j=0;
	move(aM_banner[j],{opacity:'1'},{time:20,fu:function(){isNext=false;}});
	aU_dian[j].className+=' active';
	n=j-1;
	if(n<0) n=aM_banner.length-1;
	oImgl.src=arra[n];
	oH4l.innerHTML=arrb[n];
	oPl.innerHTML=arrc[n];
	m=j+1;
	if(m>aM_banner.length-1) m=0;
	oImgr.src=arra[m];
	oH4r.innerHTML=arrb[m];
	oPr.innerHTML=arrc[m];
}
for(var m=0;m<aM_banner.length;m++){
	aU_dian[m].index=m;
	aU_dian[m].onclick=function(){
		if(this.index>j){
			if(isNext) return false;
    		isNext = true;
			move(aM_banner[j],{opacity:'0'},				{time:20,fu:function(){isNext=false;}});
			for(var i=0;i<aU_dian.length;i++){
				aU_dian[i].className='';
			}
			j=this.index;
			move(aM_banner[j],{opacity:'1'},{time:20,fu:function(){isNext=false;}});
			aU_dian[j].className+=' active';
			n=j-1;
			if(n<0) n=aM_banner.length-1;
			oImgl.src=arra[n];
			oH4l.innerHTML=arrb[n];
			oPl.innerHTML=arrc[n];
			m=j+1;
			if(m>aM_banner.length-1) m=0;
			oImgr.src=arra[m];
			oH4r.innerHTML=arrb[m];
			oPr.innerHTML=arrc[m];
		}else if(this.index<j){
			if(isNext) return false;
    		isNext = true;
			move(aM_banner[j],{opacity:'0'},{time:20,fu:function(){isNext=false;}});
			for(var i=0;i<aU_dian.length;i++){
				aU_dian[i].className='';
			}
			j=this.index;
			move(aM_banner[j],{opacity:'1'},{time:20,fu:function(){isNext=false;}});
			aU_dian[j].className+=' active';
			n=j-1;
			if(n<0) n=aM_banner.length-1;
			oImgl.src=arra[n];
			oH4l.innerHTML=arrb[n];
			oPl.innerHTML=arrc[n];
			m=j+1;
			if(m>aM_banner.length-1) m=0;
			oImgr.src=arra[m];
			oH4r.innerHTML=arrb[m];
			oPr.innerHTML=arrc[m];
		}
	}
}

var oM_bannbtsboxa=document.getElementById('m_bannbtsboxa'),
	oM_bannbtsboxb=document.getElementById('m_bannbtsboxb'),
	oM_slisa=document.getElementById('m_slisa'),
	oM_slisb=document.getElementById('m_slisb');
oM_slisa.className+=' active';
oM_slisa.onclick=function(){
	this.className+=' active';
	oM_slisb.className='';
	move(oM_bannbtsboxa,{left:'0'},{time:20});
	move(oM_bannbtsboxb,{left:'640'},{time:20});
}
oM_slisb.onclick=function(){
	this.className+=' active';
	oM_slisa.className='';
	move(oM_bannbtsboxa,{left:'-640'},{time:20});
	move(oM_bannbtsboxb,{left:'0'},{time:20});
}

var oChange=document.getElementById('change'),
	oM_hot_list=document.getElementById('m_hot_list'),
	aLia=oM_hot_list.getElementsByTagName('li'),
	x=0;
oChange.onclick=function(){
	for(var i=0;i<2;i++){
		aLia[i].className+=' cnt';
		aLia[i].style.height=315+'px';
	}
	x++;
	if(x>1) x=0;
	var timera=setTimeout(function(){
		aLia[x].style.height=0+'px';
		aLia[x].className='xslistbx';
	},300);
}

























