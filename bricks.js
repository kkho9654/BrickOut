$(function(){
		$("#TutoBtn").on("click",function(){//튜토리얼 버튼 클릭
			$("#tutorial").css("display","block");
		});
	$("#cBtn").on("click",function(){//배경화면 바꾸기 버튼 클릭
		$("#changeImgDiv").css("display","block");
	});
	$("#start").on("click",function(){//시작 버튼 클릭
		$("#choose-level").css("display","block");
		
	});
	$("#easy").on("click",function(){//시작->easy 클릭
		$("#mCanvas").css("display","block");
		$("#startPage").css("display","none");
		init();
		document.addEventListener("keydown", keyDownHandler, false);
		document.addEventListener("keyup", keyUpHandler, false);
		document.addEventListener("keydown", startGame, false);
		
	});
	$("#cBtn2").on("click",function(){//배경음악  버튼 클릭
		$("#changeMusicDiv").css("display","block");
	});
	$(".bgBtn").on("click",function(){//배경이미지 바꾸기
		var str=$(this).attr("id");
		if(str=="day")
			$("#content").css("background-image","url('img/bg1.png')");
		else if(str=="noon")
			$("#content").css("background-image","url('img/bg2.png')");
		else if(str=="night")
			$("#content").css("background-image","url('img/bg3.png')");
	});
	$(".exit").on("click",function(){//나가기버튼
		var parent1=$(this).parent();
		parent1.css("display","none");
	});


	$("#title").fadeIn(3000);
	
	$("button").on("click", function(){ //버튼을 클릭할때마다 클릭 소리가 나옴
		audio.play();
	});

	$("#song-on").on("click", function(){ //배경 음악 설정
		bgm.play();
		bgm.loop = true;
	});

	$("#song-off").on("click", function(){ //배경 음악 설정
		bgm.pause();
	});
});

var audio = new Audio("sound/button.mp3");
var bgm = new Audio("sound/bgm.mp3");

var imgArray = ["img/tuto1.png", "img/tuto2.png", "img/tuto3.png", "img/tuto4.png", "img/tuto5.png"];
function album(){
	var imgSrc = document.getElementById("tutoAlbum").getAttribute("src");
	for(var i=0; i < imgArray.length; i++){
		audio.play();
		if(imgSrc == imgArray[i]){
			document.getElementById("tutoAlbum").setAttribute("src", imgArray[i+1]);
		}
		if(imgSrc == imgArray[imgArray.length-1]){
			document.getElementById("tutoAlbum").setAttribute("src", imgArray[0]);
		}
	}
}


var canvas;
var context;
var dx;
var dy;
var y;
var x;
var itemx;
var itemy;
var itemdy;
var ball;
var ballR;
var brickWidth;
var brickHeight;
var paddleHeight
var paddleWidth
var paddleX;
var rightPressed;
var leftPressed;
var life = 3;//@@@@목숨 추가
var score=0;
var combo=0;
var item1=0;
var item4=0;
function bricks(a,b,c){
	this.brickX=a;
	this.brickY=b;
	this.status=c;
}
function item(a,b){
	this.itemx=a;
	this.itemy=b;
}


var brickArr=new Array();
var itemArr1=new Array();
var itemArr2=new Array();
var itemArr3 = new Array();
var itemArr4= new Array();

function init(){
	canvas=document.getElementById('mCanvas');
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
	paddleWidth=100;
	paddleX=250;
	dx=5;
	dy=-5;
	itemdy=-2;
	y=610;
	x=300-ballR;
	rightPressed= false;
	leftPressed=false;
	draw();
}
function start(){
	ball = setInterval(draw, 10);
	document.removeEventListener("keydown", startGame, false);
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
	for(var i=0;i<itemArr1.length;i++)
		drawItem1(itemArr1[i]);
	for (var i = 0; i < itemArr2.length; i++)
		drawItem2(itemArr2[i]);
	for (var i = 0; i < itemArr3.length; i++)
		drawItem3(itemArr3[i]);
	for (var i = 0; i < itemArr4.length; i++)
		drawItem4(itemArr4[i]);
	if(x>canvas.width-ballR||x<ballR){
		dx=-dx;
	}
	if(y>canvas.height-ballR||y<ballR){
		dy=-dy;
	}
	
	if(rightPressed&&paddleX<canvas.width-paddleWidth){
		paddleX+=8;
	}else if(leftPressed&&paddleX>0){
		paddleX-=8;
	}
	if (y > 640) {
		$("#" + life).css({ visibility: "hidden" });
		life--;
		if (life == 0) { alert("gameOver"); }
		else { alert("remain:" + life); reset()}
	}
	$("#score").text("     score"+score);
	$("#combo").text("combo"+combo);
	for (var i = 0; i < itemArr1.length; i++)
		itemArr1[i].itemy = itemArr1[i].itemy+3;
	for (var i = 0; i < itemArr2.length; i++)
		itemArr2[i].itemy = itemArr2[i].itemy + 3;
	for (var i = 0; i < itemArr3.length; i++)
		itemArr3[i].itemy = itemArr3[i].itemy + 3;
	for (var i = 0; i < itemArr4.length; i++)
		itemArr4[i].itemy = itemArr4[i].itemy + 3;
}
function reset() {
	dx = -dx; 
	dy = -5;
	rightPressed = false;
	leftPressed = false;
} //죽었을 때 리스타트

function checkBall(a){
	if((x>a.brickX-ballR-dx&&x<a.brickX+brickWidth+ballR-dx)&&(y>a.brickY&&y<a.brickY+brickHeight)&&a.status>0){
		a.status--;
		dx =-dx;
		if (a.status==0){
			combo++;
			var b = Math.random();
			if (b > 0.9) {
				itemArr1.push(new item(x, y));
			}
			if (0.9 > b && b > 0.85) {
				itemArr2.push(new item(x, y));
			}
			if (0.85 > b && b > 0.8) {
				itemArr3.push(new item(x, y));
			}
			if (0.8 > b && b > 0.7) {
				itemArr4.push(new item(x, y));
			}
			if(item1==1){
				dx=-dx;
			}
		}
	}
	else if((y>a.brickY-ballR-dy&&y<a.brickY+brickHeight+ballR-dy)&&(x>a.brickX&&x<a.brickX+brickWidth)&&a.status>0){
		a.status--;
		dy=-dy;
		if (a.status == 0) {
			combo++;
			var b = Math.random();
			if (b > 0.9) {
				itemArr1.push(new item(x, y));
			}
			if (0.9 > b && b > 0.85) {
				itemArr2.push(new item(x, y));
			}
			if (0.85 > b && b > 0.8) {
				itemArr3.push(new item(x, y));
			}
			if (0.8 > b && b > 0.7) {
				itemArr4.push(new item(x, y));
			}
			if (item1 == 1) {
				dy = -dy;
			}
		}
	}	
}
function checkBall2(){
	if(y>620-ballR&&(x>paddleX-ballR&&x<paddleX+paddleWidth+ballR)){
		
		dx = -((paddleX + (paddleWidth / 2) - x) / (paddleWidth)) * 10;
		dy = -Math.sqrt(43-dx*dx);
		score=score+Math.pow(2,combo-1);
		combo=0;
	}
	var leng1 = itemArr1.length
	for (var i = 0; i < leng1; i++)
		if (itemArr1[i].itemy > 620 - 10 && (itemArr1[i].itemx > paddleX - 10 && itemArr1[i].itemx < paddleX + paddleWidth + 10)) {
			itemArr1.splice(i, 1);
			item1=1;
			setTimeout(function(){item1--;},3000);
		}
		var leng2 = itemArr2.length
		for (var i = 0; i < leng2; i++)
			if (itemArr2[i].itemy > 620 - 10 && (itemArr2[i].itemx > paddleX - 10 && itemArr2[i].itemx < paddleX + paddleWidth + 10)) {
				itemArr2.splice(i, 1);
				paddleWidth = paddleWidth+20;
		// setTimeout(function () { paddleWidth=100; }, 10000);
	}
	var leng3 = itemArr3.length
	for (var i = 0; i < leng3; i++)
		if (itemArr3[i].itemy > 620 - 10 && (itemArr3[i].itemx > paddleX - 10 && itemArr3[i].itemx < paddleX + paddleWidth + 10)) {
			itemArr3.splice(i, 1);
			if (life < 3) life++;
			$("#" + life).css({ visibility: "visible" });
		}
		var leng4 = itemArr4.length
		for (var i = 0; i < leng4; i++)
			if (itemArr4[i].itemy > 620 - 10 && (itemArr4[i].itemx > paddleX - 10 && itemArr4[i].itemx < paddleX + paddleWidth + 10)) {
				itemArr4.splice(i, 1);
				if(item4==0){
					item4=1;
					dy=0.5*dy;
					setTimeout(function() {item4=0}, 5000);
				}
			}
		}
		function drawItem1(a){
			context.beginPath();
			context.rect(a.itemx,a.itemy, "20", "20");
			context.fillStyle="red";
			context.fill();
		}
		function drawItem2(a) {
			context.beginPath();
			context.rect(a.itemx, a.itemy, "20", "20");
			context.fillStyle = "blue";
			context.fill();
		}
		function drawItem3(a) {
			context.drawImage(document.getElementById('heart'), a.itemx, a.itemy, "20", "20");
		}
		function drawItem4(a) {
			context.beginPath();
			context.rect(a.itemx, a.itemy, "20", "20");
			context.fillStyle = "orange";
			context.fill();
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
			context.rect(paddleX,620,paddleWidth,paddleHeight);
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

		function startGame(e){
			if(e.keyCode==32){
				start();
			}
		}