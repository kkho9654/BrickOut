window.onload=pageLoad;

var imgArray = ["img/tuto1.png", "img/tuto2.png", 
"img/tuto3.png", "img/tuto4.png", "img/tuto5.png"];

function album(){
	var imgSrc = document.getElementById("tutoAlbum").getAttribute("src");
	for(var i=0; i < imgArray.length; i++){
		if(imgSrc == imgArray[i]){
			document.getElementById("tutoAlbum").setAttribute("src", imgArray[i+1]);
		}
		if(imgSrc == imgArray[imgArray.length-1]){
			document.getElementById("tutoAlbum").setAttribute("src", imgArray[0]);
		}
	}
}

function showTutoDiv(){
	document.getElementById("tutorial").style.display="inline";
}

function closeTutoDiv(){
	document.getElementById("tutorial").style.display="none";
}

function pageLoad(){
	init();
}

function showImgDiv(){
	document.getElementById("changeImgDiv").style.display="inline";
}

function closeImgDiv(){
	document.getElementById("changeImgDiv").style.display="none";
}

function showMusDiv(){
	document.getElementById("changeMusicDiv").style.display="inline";
}

function closeMusDiv(){
	document.getElementById("changeMusicDiv").style.display="none";
}

function bg1(){
	document.getElementById("mCanvas").style.backgroundImage="url('img/bg1.png')";
}

function bg2(){
	document.getElementById("mCanvas").style.backgroundImage="url('img/bg2.png')";
}

function bg3(){
	document.getElementById("mCanvas").style.backgroundImage="url('img/bg3.png')";
}


var canvas;
var context;
var dx;//공속도
var dy;//공속도
var y;//공좌표
var x;//공좌표
var ball;
var ballR;//공 반지름
var brickWidth;
var brickHeight;
var paddleHeight
var paddleWidth
var paddleX;
var rightPressed;
var leftPressed;

function bricks(a,b,c){//벽돌 좌표
	this.brickX=a;
	this.brickY=b;
	this.status=c;
}

var brickArr = new Array();

function init(){
	canvas=document.getElementById('myCanvas');
	context= canvas.getContext('2d');
	ballR=10;
	brickWidth=60;
	brickHeight=20;
	for(var i=0;i<10;i++){
		brickArr.push(new bricks(i*60+i,100,3));
		brickArr.push(new bricks(i*60+i,200,2));
		brickArr.push(new bricks(i*60+i,300,1));
	}
	paddleHeight=10;
	paddleWidth=600;
	paddleX=0;
	dx=3;
	dy=-3;
	y=560;
	x=300-ballR;
	rightPressed= false;
	leftPressed=false;
	document.addEventListener("keydown",keyDownHandler,false);
	document.addEventListener("keyup",keyUpHandler,false);
	ball=setInterval(draw,1);
}

function draw(){
	context.clearRect(0,0,canvas.width,canvas.height);
	x=x+dx;
	y=y+dy;
	drawBall();
	for(var i=0;i<30;i++)
		drawBrick(brickArr[i]);
	checkBall2();
	drawPaddle();
	
	if(x>canvas.width-ballR||x<ballR){
		dx=-dx;
	}
	if(y>canvas.height-ballR||y<ballR){
		dy=-dy;
	}
	if(y>canvas.height-paddleHeight){
		alert("gameOver");
		stopBall();
	}
	if(rightPressed&&paddleX<canvas.width-paddleWidth){
		paddleX+=5;
	}else if(leftPressed&&paddleX>0){
		paddleX-=5;
	}
}

function checkBall(a){

	if((x>a.brickX-ballR-dx&&x<a.brickX+brickWidth+ballR-dx)&&(y>a.brickY&&y<a.brickY+brickHeight)&&a.status>0){
		a.status--;
		dx=-dx;
	}
	else if((y>a.brickY-ballR-dy&&y<a.brickY+brickHeight+ballR-dy)&&(x>a.brickX&&x<a.brickX+brickWidth)&&a.status>0){
		a.status--;
		dy=-dy;
	}
}

function checkBall2(){//paddle과 공이 부딪치는지 검사
	if(y>570-ballR&&(x>paddleX-ballR&&x<paddleX+paddleWidth+ballR)){
		dy=-dy;
	}
}

function drawBall(){
	context.beginPath();
	context.arc(x,y,ballR,0,2.0*Math.PI,true);
	context.fillStyle="red";
	context.fill();
}

function drawBrick(a){
	checkBall(a);
	if(a.status==1){
		context.beginPath();
		context.rect(a.brickX,a.brickY,brickWidth,brickHeight);
		context.fillStyle="green";
		context.fill();
	}else if(a.status==2){
		context.beginPath();
		context.rect(a.brickX,a.brickY,brickWidth,brickHeight);
		context.fillStyle="purple";
		context.fill();
	}else if(a.status==3){
		context.beginPath();
		context.rect(a.brickX,a.brickY,brickWidth,brickHeight);
		context.fillStyle="black";
		context.fill();
	}
}

function drawPaddle(){
	context.beginPath();
	context.rect(paddleX,570,paddleWidth,paddleHeight);
	context.fillStyle="blue";
	context.fill();
}

function keyDownHandler(e){
	if(e.keyCode==39){
		rightPressed=true;
	}else if(e.keyCode==37){
		leftPressed=true;
	}
}
function keyUpHandler(e){
	if(e.keyCode==39){
		rightPressed=false;
	}else if(e.keyCode==37){
		leftPressed=false;
	}
}

function stopBall(){
	clearInterval(ball);
}

function changeImage(){
	// alert(document.getElementById("myCanvas").style.backgroundImage);

	document.getElementById("myCanvas").setAttribute('style', 'background-image: url("bg2.png")');
	// var imgsrc = document.getElementById("myCanvas").style.backgroundImage;
	// var sarray = imgsrc.split('/');
	// var str = sarray[sarray.length-1];

	// if(str == "bg1.png")
	// 	document.getElementById("myCanvas").setAttribute('style', 'background-image: url("bg2.png")');
	// 	 // imgsrc.src = "bg2.png";
	// else
	// 	 document.getElementById("myCanvas").setAttribute('style', 'background-image: url("bg1.png")');
		 // imgsrc.src = "bg1.png"; 
		}
