window.onload=pageLoad;

function pageLoad(){
	init();
	var a= document.getElementById("stopball");
	a.onclick=stopBall;
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
var brickArr=new Array();
function init(){
	canvas=document.getElementById('myCanvas');
	context= canvas.getContext('2d');
	ballR=10;
	brickWidth=60;
	brickHeight=20;
	for(var i=0;i<10;i++){
		brickArr.push(new bricks(i*60+i,100,3));
		brickArr.push(new bricks(i*60+i,300,2));
		brickArr.push(new bricks(i*60+i,500,1));
	}
	paddleHeight=10;
	paddleWidth=600;
	paddleX=0;
	dx=3;
	dy=-3;
	y=760;
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
	if(y>790){
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
	if(y>770-ballR&&(x>paddleX-ballR&&x<paddleX+paddleWidth+ballR)){
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
	context.rect(paddleX,770,paddleWidth,paddleHeight);
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