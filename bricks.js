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
		$("#in-game-menu-button").css("display","block");
		$("#story1").css("display","block");
		$("#startPage").css("display","none");
		$("#choose-level").css("display","none");
		init(1);
		document.addEventListener("keydown", keyDownHandler, false);
		document.addEventListener("keyup", keyUpHandler, false);
		document.addEventListener("keydown", startGame, false);
	});
	$("#normal").on("click",function(){//시작->normal 클릭
		$("#in-game-menu-button").css("display","block");
		$("#story3").css("display","block");
		$("#startPage").css("display","none");
		$("#choose-level").css("display","none");
		var bricksGame=new brickOut();
		bricksGame.init(1);
		document.addEventListener("keydown", keyDownHandler, false);
		document.addEventListener("keyup", keyUpHandler, false);
		document.addEventListener("keydown", startGame, false);
	});
	$("#hard").on("click",function(){//시작->hard 클릭
		$("#in-game-menu-button").css("display","block");
		$("#story5").css("display","block");
		$("#startPage").css("display","none");
		$("#choose-level").css("display","none");
		var bricksGame=new brickOut();
		bricksGame.init(1);
		document.addEventListener("keydown", keyDownHandler, false);
		document.addEventListener("keyup", keyUpHandler, false);
		document.addEventListener("keydown", startGame, false);
	});
	$(".skip").on("click",function(){
		$("#mCanvas").css("display","block");
		$(this).parent().css("display","none");
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

	$("#in-game-menu-button").on("click", function(){ //ingamemenu 버튼 클릭
		$("#in-game-menu").css("display","block");
	});
	$("#continue").on("click", function(){ //ingamemenu 안에 게임 계속 버튼 클릭
		$("#in-game-menu").css("display","none");
	});
	$("#quit").on("click", function(){ //ingamemenu 안에 나가기 버튼 클릭
		$("#in-game-menu").css("display","none");
		$("#in-game-menu-button").css("display","none");
		$("#story1").css("display","none");
		$("#mCanvas").css("display","none");
		$("#startPage").css("display","block");
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
var item5= 0;
var ballcolor = "black";
var bgm = new Audio("sound_bgm.mp3");
var getItem = new Audio("sound_getItem.mp3");

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
var itemArr5 = new Array();

function init(){
	canvas=document.getElementById('mCanvas');
	context= canvas.getContext('2d');
	ballR=10;
	brickWidth=60;
	brickHeight=36;
	paddleHeight=10;
	paddleWidth=120;
	paddleX=230;
	dx=0;
	dy=-5;
	itemdy=-2;
	y = 680;
	x=300-ballR;
	rightPressed= false;
	leftPressed=false;
	buildHouse();
	draw();
	
}
function start(){
	
	bgm.play();
	bgm.loop="ture";
	ball = setInterval(draw, 10);
	document.removeEventListener("keydown", startGame, false);
}
function draw(){
	context.clearRect(0,0,canvas.width,canvas.height);
	x=x+dx;
	y=y+dy;
	drawBall();
	for(var i=0;i<brickArr.length;i++)
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
	for (var i = 0; i < itemArr5.length; i++)
		drawItem5(itemArr5[i]);
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
	if (y > 710) {
		$("#" + life).css({ visibility: "hidden" });
		life--;
		if (life == 0) { alert("gameOver"); } // 게임오버 시 화면 이동 또는 팝업 필요
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
	for (var i = 0; i < itemArr5.length; i++)
		itemArr5[i].itemy = itemArr5[i].itemy + 3;
}
function reset() {
	paddleHeight = 10;
	paddleWidth = 120;
	paddleX = 250;
	itemdy = -2;
	y = 680;
	x = 290 - ballR;
	rightPressed = false;
	leftPressed = false;
	clearInterval(ball);
	draw();
	document.addEventListener("keydown", retry, false);
} //죽었을 때 리스타트
// function buildHouse() {
// 	for (var i = 0; i < 10; i++) {
// 		brickArr.push(new bricks(i * 60 + i, 100, 3));
// 		brickArr.push(new bricks(i * 60 + i, 200, 2));
// 		brickArr.push(new bricks(i * 60 + i, 300, 1));
// 	}
// }
function buildHouse() {
	for (var i = 4; i < 6; i++) {
		brickArr.push(new bricks(i * 60 + i, 100, 3));
	}
	for (var i = 3; i < 4; i++) {
		brickArr.push(new bricks(i * 60 + i, 136, 3));
	}
	for (var i = 6; i < 7; i++) {
		brickArr.push(new bricks(i * 60 + i, 136, 3));
	}
	for (var i = 2; i < 3; i++) {
		brickArr.push(new bricks(i * 60 + i, 172, 3));
	}
	for (var i = 7; i < 8; i++) {
		brickArr.push(new bricks(i * 60 + i, 172, 3));
	}
	for (var i = 1; i < 2; i++) {
		brickArr.push(new bricks(i * 60 + i, 208, 3));
	}
	for (var i = 8; i < 9; i++) {
		brickArr.push(new bricks(i * 60 + i, 208, 3));
	}
	brickArr.push(new bricks(61, 244, 3));
	brickArr.push(new bricks(488, 244, 3));
	brickArr.push(new bricks(61, 280, 3));
	brickArr.push(new bricks(61, 316, 3));
	brickArr.push(new bricks(61, 352, 3));
	brickArr.push(new bricks(488, 280, 3));
	brickArr.push(new bricks(488, 316, 3));
	brickArr.push(new bricks(488, 352, 3));
	for (var i = 4; i < 6; i++) {
		brickArr.push(new bricks(i * 60 + i, 280, 3));
	}
	for (var i = 1; i < 4; i++) {
		brickArr.push(new bricks(i * 60 + i, 352, 3));
	}
	for (var i = 6; i < 9; i++) {
		brickArr.push(new bricks(i * 60 + i, 352, 3));
	}
	brickArr.push(new bricks(183, 316, 3));
	brickArr.push(new bricks(366, 316, 3));
}

function checkBall(a){
	if((x>a.brickX-ballR-dx&&x<a.brickX+brickWidth+ballR-dx)&&(y>a.brickY&&y<a.brickY+brickHeight)&&a.status>0){
		if (item5 == 1) {
			a.status = 0;
			dx = -dx;
		}
		if (item1 == 1) {
			a.status--;
		}
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
			if (0.7 > b && b > 0.65) {
				itemArr5.push(new item(x, y));
			}
			
		}
	}
	else if((y>a.brickY-ballR-dy&&y<a.brickY+brickHeight+ballR-dy)&&(x>a.brickX&&x<a.brickX+brickWidth)&&a.status>0){
		if (item5 == 1) {
			a.status = 0;
			dy = -dy;
		}
		if (item1 == 1) {
			a.status--;
		}
		a.status--;
		dy=-dy;
		if (a.status == 0) {
			combo++;
			var b = Math.random();
			if (b > 0.1) {
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
			if (0.7 > b && b > 0.65) {
				itemArr5.push(new item(x, y));
			}
			
		}
	}
}
function checkBall2(){
	if(y>690-ballR&&(x>paddleX-ballR&&x<paddleX+paddleWidth+ballR)){
		
	 	dx = -((paddleX + (paddleWidth / 2) - x) / (paddleWidth)) * 10;
		dy = -Math.sqrt(43-dx*dx);
		score=score+Math.pow(2,combo-1);
		combo=0;
	}
	var leng1 = itemArr1.length
	for (var i = 0; i < leng1; i++)
		if (itemArr1[i].itemy > 690 - 10 && (itemArr1[i].itemx > paddleX - 10 && itemArr1[i].itemx < paddleX + paddleWidth + 10)) {
			getItem.play();
			itemArr1.splice(i, 1);
			item1=1;
			ballcolor="red"
			setTimeout(function(){item1--; ballcolor="black"},3000);
		}
	var leng2 = itemArr2.length
	for (var i = 0; i < leng2; i++)
		if (itemArr2[i].itemy > 690 - 10 && (itemArr2[i].itemx > paddleX - 10 && itemArr2[i].itemx < paddleX + paddleWidth + 10)) {
			getItem.play();
			itemArr2.splice(i, 1);
			paddleWidth = paddleWidth+20;
		}
	var leng3 = itemArr3.length
	for (var i = 0; i < leng3; i++)
		if (itemArr3[i].itemy > 690 - 10 && (itemArr3[i].itemx > paddleX - 10 && itemArr3[i].itemx < paddleX + paddleWidth + 10)) {
			getItem.play();
			itemArr3.splice(i, 1);
			if (life < 3) life++;
			$("#" + life).css({ visibility: "visible" });
		}
	var leng4 = itemArr4.length
	for (var i = 0; i < leng4; i++)
		if (itemArr4[i].itemy > 690 - 10 && (itemArr4[i].itemx > paddleX - 10 && itemArr4[i].itemx < paddleX + paddleWidth + 10)) {
			getItem.play();
			itemArr4.splice(i, 1);
			if(item4==0){
			item4=1;
			dy=0.5*dy;
			setTimeout(function() {item4=0}, 5000);
			}
		}
	var leng5 = itemArr5.length
	for (var i = 0; i < leng5; i++)
		if (itemArr5[i].itemy > 690 - 10 && (itemArr5[i].itemx > paddleX - 10 && itemArr5[i].itemx < paddleX + paddleWidth + 10)) {
			getItem.play();
			itemArr5.splice(i, 1);
			item5 = 1;
			ballcolor = "yellow";
			setTimeout(function () { item5--; ballcolor="black"}, 1500);
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
function drawItem5(a) {
	context.beginPath();
	context.rect(a.itemx, a.itemy, "20", "20");
	context.fillStyle = "white";
	context.fill();
}
function drawBall(){
	context.beginPath();
	context.arc(x,y,ballR,0,2.0*Math.PI,true);
	context.fillStyle=ballcolor;
	context.fill();
}
function drawBrick(a){
	checkBall(a);
	if(a.status==1){
		context.drawImage(document.getElementById("icon_brick3"), a.brickX, a.brickY, brickWidth, brickHeight);
	}else if(a.status==2){
		context.drawImage(document.getElementById("icon_brick2"), a.brickX, a.brickY, brickWidth, brickHeight);
	}else if(a.status==3){
		context.drawImage(document.getElementById("icon_brick"), a.brickX, a.brickY, brickWidth, brickHeight);
	}
}
function drawPaddle(){

	context.beginPath();
	context.rect(paddleX, 690,paddleWidth,paddleHeight);
	context.fillStyle="black";
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
function retry(e){
	if(e.keyCode==32){
		ball = setInterval(draw, 10);
		document.removeEventListener("keydown", retry, false);
	}
}