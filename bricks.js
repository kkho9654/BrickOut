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
		init(2);
		document.addEventListener("keydown", keyDownHandler, false);
		document.addEventListener("keyup", keyUpHandler, false);
		document.addEventListener("keydown", startGame, false);
	});
	$("#hard").on("click",function(){//시작->hard 클릭
		$("#in-game-menu-button").css("display","block");
		$("#story5").css("display","block");
		$("#startPage").css("display","none");
		$("#choose-level").css("display","none");
		init(3);
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
	$("#restart").on("click", function(){ //restart 버튼 클릭
		$("#gameover").css("display","none");
		init(levelM);//현재 진행중인 게임을 받아와야 함. 변수 하나 생성해야될듯
	});
	$("#quit2").on("click", function(){ //실패시 나가기 버튼 클릭
		$("#gameover").css("display","none");
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

var gameover=false;
var gameover2=false;

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
var life;//@@@@목숨 추가
var score;
var combo;
var item1;
var item4;
var item5;
var ballcolor = "brown";
var bgm = new Audio("sound_bgm.mp3");
var getItem = new Audio("sound_getItem.mp3");
var haycrack = new Audio("crack_hay.mp3");
var woodcrack = new Audio("crack_wood.mp3");
var wallcrack = new Audio("crack_wall.mp3");
var bounce = new Audio("bounce.mp3");
haycrack.volume = "0.2";
woodcrack.volume = "0.2";
wallcrack.volume = "0.2";
getItem.volume = "0.2";
bgm.volume = "0.1";
bounce.volume = "0.4";

var levelM;

function bricks(a,b,c){
	this.brickX=a;
	this.brickY=b;
	this.status=c;
}
function item(a,b){
	this.itemx=a;
	this.itemy=b;
}


var brickArr;
var itemArr1;
var itemArr2;
var itemArr3;
var itemArr4;
var itemArr5;

function init(level){
	canvas=document.getElementById('mCanvas');
	context= canvas.getContext('2d');
	brickArr=new Array();
	itemArr1=new Array();
	itemArr2=new Array();
	itemArr3 = new Array();
	itemArr4= new Array();
	itemArr5 = new Array();
	life = 3;//@@@@목숨 추가
	score=0;
	combo=0;
	item1=0;
	item4=0;
	item5= 0;
	ballcolor = "black";
	ballR=10;
	brickWidth=60;
	brickHeight=36;
	paddleHeight=15;
	paddleWidth=120;
	paddleX=230;
	dx = (Math.random() - 0.5) * 10;
	dy = -Math.sqrt(43 - dx * dx);
	itemdy=-2;
	y = 680;
	x=300-ballR;
	rightPressed= false;
	leftPressed=false;
	levelM=level;
	if(levelM==1){
		buildHouse_easy();
	}
	else if(levelM==2){
		buildHouse_normal();
	}
	else if(levelM==3){
		buildHouse_hard();
	}
	draw();
}
function start(){
	
	// bgm.play();
	// bgm.loop="ture";
	ball = setInterval(draw, 10);
	document.removeEventListener("keydown", startGame, false);
}
function draw(){
	checkEnd();
	context.clearRect(0,0,canvas.width,canvas.height);
	x=x+dx;
	y=y+dy;
	drawBall();
	if(levelM==1){
		for(var i=0;i<brickArr.length;i++)
			drawBrick_easy(brickArr[i]);
	}else if(levelM==2){
		for(var i=0;i<brickArr.length;i++)
			drawBrick_normal(brickArr[i]);
	}else if(levelM==3){
		for(var i=0;i<brickArr.length;i++)
			drawBrick_hard(brickArr[i]);
	}
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
		if (life == 0) { 
			$("#gameover").css("display","block");
		} // 게임오버 시 화면 이동 또는 팝업 필요
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
	checkItem();
	
}
function checkEnd() {
	if(brickArr.length ==0)
	{alert("You win");}
}
function checkItem() {
	for (var i = 0; i < itemArr1.length; i++)
		if (itemArr1[i].itemy > 710) itemArr1.splice(i, 1);
	for (var i = 0; i < itemArr2.length; i++)
		if (itemArr2[i].itemy > 710) itemArr2.splice(i, 1);
	for (var i = 0; i < itemArr3.length; i++)
		if (itemArr3[i].itemy > 710) itemArr3.splice(i, 1);
	for (var i = 0; i < itemArr4.length; i++)
		if (itemArr4[i].itemy > 710) itemArr4.splice(i, 1);
	for (var i = 0; i < itemArr5.length; i++)
		if (itemArr5[i].itemy > 710) itemArr5.splice(i, 1);
}
function reset() {
	ballcolor = "brown";
	item1 = 0;
	item4 = 0;
	item5 = 0;
	for (var i = 0; i < itemArr1.length; i++)
		itemArr1.splice(i, 1);
	for (var i = 0; i < itemArr2.length; i++)
		itemArr2.splice(i, 1);
	for (var i = 0; i < itemArr3.length; i++)
		itemArr3.splice(i, 1);
	for (var i = 0; i < itemArr4.length; i++)
		itemArr4.splice(i, 1);
	for (var i = 0; i < itemArr5.length; i++)
		itemArr5.splice(i, 1);
	paddleHeight = 10;
	paddleWidth = 120;
	paddleX = 230;
	itemdy = -2;
	combo=0;
	y = 680;
	x = 300 - ballR;
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

function buildHouse_easy() {
	for (var i = 4; i < 6; i++) {
		brickArr.push(new bricks(i * 60 + i, 100, 3));
	}
	for (var i = 3; i < 7; i++) {
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
	brickArr.push(new bricks(488, 280, 3));
	brickArr.push(new bricks(488, 316, 3));
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
} // 1단계 초가집 버전

function buildHouse_normal() {
	for (var i = 2; i < 8; i++) {
		brickArr.push(new bricks(i * 60 + i, 136, 3));
	}
	for (var i = 1; i < 9; i++) {
		brickArr.push(new bricks(i * 60 + i, 172, 3));
	}
	brickArr.push(new bricks(61, 208, 3));
	brickArr.push(new bricks(488, 208, 3));
	brickArr.push(new bricks(61, 244, 3));
	brickArr.push(new bricks(488, 244, 3));
	brickArr.push(new bricks(61, 280, 3));
	brickArr.push(new bricks(488, 280, 3));
	brickArr.push(new bricks(305, 208, 1));
	brickArr.push(new bricks(305, 244, 1));
	brickArr.push(new bricks(305, 280, 3));
	for (var i = 1; i < 6; i++) {
		brickArr.push(new bricks(i * 60 + i, 316, 3));
	}
	brickArr.push(new bricks(488, 316, 3));
	for (var i = 1; i < 6; i++) {
		brickArr.push(new bricks(i * 60 + i, 352, 3));
	}
	brickArr.push(new bricks(488, 352, 3));
	for (var i = 6; i < 8; i++) {
		brickArr.push(new bricks(i * 60 + i, 208, 1));
	}
	for (var i = 6; i < 8; i++) {
		brickArr.push(new bricks(i * 60 + i, 244, 1));
	}
	for (var i = 6; i < 8; i++) {
		brickArr.push(new bricks(i * 60 + i, 280, 4));
	}
	for (var i = 6; i < 8; i++) {
		brickArr.push(new bricks(i * 60 + i, 316, 4));
	}
	for (var i = 6; i < 8; i++) {
		brickArr.push(new bricks(i * 60 + i, 352, 4));
	}
} // 2단계 나무집 버전

function buildHouse_hard() {
	for (var i = 4; i < 6; i++) {
		brickArr.push(new bricks(i * 60 + i, 100, 4));
	}
	brickArr.push(new bricks(183, 136, 4));
	brickArr.push(new bricks(366, 136, 4));
	for (var i = 4; i < 6; i++) {
		brickArr.push(new bricks(i * 60 + i, 136, 3));
	}
	brickArr.push(new bricks(427, 100, 8));
	brickArr.push(new bricks(427, 136, 8));
	for (var i = 3; i < 7; i++) {
		brickArr.push(new bricks(i * 60 + i, 172, 3));
	}
	for (var i = 1; i < 3; i++) {
		brickArr.push(new bricks(i * 60 + i, 172, 4));
	}
	for (var i = 7; i < 9; i++) {
		brickArr.push(new bricks(i * 60 + i, 172, 4));
	}
	for (var i = 1; i < 9; i++) {
		brickArr.push(new bricks(i * 60 + i, 208, 3));
	}
	for (var i = 1; i < 5; i++) {
		brickArr.push(new bricks(i * 60 + i, 244, 3));
	}
	for (var i = 8; i < 9; i++) {
		brickArr.push(new bricks(i * 60 + i, 244, 3));
	}
	brickArr.push(new bricks(61, 280, 3));
	brickArr.push(new bricks(244, 280, 3));
	brickArr.push(new bricks(488, 280, 3));
	brickArr.push(new bricks(61, 316, 3));
	brickArr.push(new bricks(61, 352, 3));
	for (var i = 4; i < 9; i++) {
		brickArr.push(new bricks(i * 60 + i, 316, 3));
	}
	for (var i = 4; i < 9; i++) {
		brickArr.push(new bricks(i * 60 + i, 352, 3));
	}
	for (var i = 2; i < 4; i++) {
		brickArr.push(new bricks(i * 60 + i, 280, 6));
	}
	for (var i = 2; i < 4; i++) {
		brickArr.push(new bricks(i * 60 + i, 316, 6));
	}
	for (var i = 2; i < 4; i++) {
		brickArr.push(new bricks(i * 60 + i, 352, 6));
	}


} // 3단계 벽돌집

function checkBall_easy(a){
	if((x>a.brickX-ballR-dx&&x<a.brickX+brickWidth+ballR-dx)&&(y>a.brickY&&y<a.brickY+brickHeight)&&a.status>0){
		if (item5 == 1) {
			a.status = 1;
			dx = -dx;
		}
		if (item1 == 1) {
			a.status--;
		}
		a.status--;
		dx =-dx;
		haycrack.load();
		haycrack.play();
		combo++;
		if (a.status==0){
			
			var b = Math.random();
			if (b > 0.85) {
				itemArr1.push(new item(x, y));
			}
			if (0.85 > b && b > 0.75) {
				itemArr2.push(new item(x, y));
			}
			if (0.75 > b && b > 0.7) {
				itemArr3.push(new item(x, y));
			}
			if (0.7 > b && b > 0.6) {
				itemArr4.push(new item(x, y));
			}
			if (0.6 > b && b > 0.55) {
				itemArr5.push(new item(x, y));
			}
			
		}
	}
	else if((y-5>a.brickY-ballR-dy&&y+5<a.brickY+brickHeight+ballR-dy)&&(x>a.brickX&&x<a.brickX+brickWidth)&&a.status>0){
		if (item5 == 1) {
			a.status = 1;
			dy = -dy;
		}
		if (item1 == 1) {
			a.status--;
		}
		a.status--;
		dy=-dy;
		haycrack.load();
		haycrack.play();
		combo++;
		if (a.status == 0) {
			
			var b = Math.random();
			if (b > 0.85) {
				itemArr1.push(new item(x, y));
			}
			if (0.85 > b && b > 0.75) {
				itemArr2.push(new item(x, y));
			}
			if (0.75 > b && b > 0.7) {
				itemArr3.push(new item(x, y));
			}
			if (0.7 > b && b > 0.6) {
				itemArr4.push(new item(x, y));
			}
			if (0.6 > b && b > 0.55) {
				itemArr5.push(new item(x, y));
			}
			
		}
	}
}

function checkBall_normal(a){
	if ((x > a.brickX - ballR - dx && x < a.brickX + brickWidth + ballR - dx) && (y > a.brickY && y < a.brickY + brickHeight) && a.status > 0) {
		if (item5 == 1) {
			a.status = 1;
			dx = -dx;
		}
		if (item1 == 1) {
			if (a.status != 4)
				a.status--;
		}
		if (a.status == 4) {
			a.status = 1;
		}
		a.status--;
		dx = -dx;
		woodcrack.load();
		woodcrack.play();
		combo++;
		if (a.status == 0) {
			
			var b = Math.random();
			if (b > 0.85) {
				itemArr1.push(new item(x, y));
			}
			if (0.85 > b && b > 0.75) {
				itemArr2.push(new item(x, y));
			}
			if (0.75 > b && b > 0.7) {
				itemArr3.push(new item(x, y));
			}
			if (0.7 > b && b > 0.6) {
				itemArr4.push(new item(x, y));
			}
			if (0.6 > b && b > 0.55) {
				itemArr5.push(new item(x, y));
			}

		}
	}
	else if ((y -5> a.brickY - ballR - dy && y+5 < a.brickY + brickHeight + ballR - dy) && (x > a.brickX && x < a.brickX + brickWidth) && a.status > 0) {
		if (item5 == 1) {
			a.status = 1;
			dy = -dy;
		}
		if (item1 == 1) {
			if(a.status != 4)
			a.status--;
		}
		if (a.status == 4) {
			a.status = 1;
		}
		a.status--;
		dy = -dy;
		woodcrack.load();
		woodcrack.play();
		combo++;
		if (a.status == 0) {
			
			var b = Math.random();
			if (b > 0.85) {
				itemArr1.push(new item(x, y));
			}
			if (0.85 > b && b > 0.75) {
				itemArr2.push(new item(x, y));
			}
			if (0.75 > b && b > 0.7) {
				itemArr3.push(new item(x, y));
			}
			if (0.7 > b && b > 0.6) {
				itemArr4.push(new item(x, y));
			}
			if (0.6 > b && b > 0.55) {
				itemArr5.push(new item(x, y));
			}

		}
	}
}


function checkBall_hard(a){
	if((x>a.brickX-ballR-dx&&x<a.brickX+brickWidth+ballR-dx)&&(y>a.brickY&&y<a.brickY+brickHeight)&&a.status>0){
		if (item5 == 1) {
			a.status = 1;
			dx = -dx;
		}
		if (item1 == 1) {
			if (a.status != 6)
				a.status--;
		}
		if (a.status == 6){
			a.status = 1;
		}
		if (a.status == 4) {
			a.status++;
		}
		if (a.status == 7) {
			a.status = 1;	
			chimneycount--;
		}
		a.status--;
		dx =-dx;
		combo++;
		wallcrack.load();
		wallcrack.play();
		if (a.status==0){
			
			var b = Math.random();
			if (b > 0.85) {
				itemArr1.push(new item(x, y));
			}
			if (0.85 > b && b > 0.75) {
				itemArr2.push(new item(x, y));
			}
			if (0.75 > b && b > 0.7) {
				itemArr3.push(new item(x, y));
			}
			if (0.7 > b && b > 0.6) {
				itemArr4.push(new item(x, y));
			}
			if (0.6 > b && b > chimney) {
				itemArr5.push(new item(x, y));
			}
			
		}
	}
	else if((y-5>a.brickY-ballR-dy&&y+5<a.brickY+brickHeight+ballR-dy)&&(x>a.brickX&&x<a.brickX+brickWidth)&&a.status>0){
		if (item5 == 1) {
			a.status = 1;
			dy = -dy;
		}
		if (item1 == 1) {
			if (a.status != 6)
				a.status--;
		}
		if (a.status == 6) {
			a.status = 1;
		}
		if (a.status == 4) {
			a.status++;
		} 
		if (a.status == 7) {
			a.status = 1;
			chimneycount--;
		}
		a.status--;
		dy=-dy;
		combo++;
		wallcrack.load();
		wallcrack.play();
		
		if (a.status == 0) {
			
			var b = Math.random();
			if (b > 0.85) {
				itemArr1.push(new item(x, y));
			}
			if (0.85 > b && b > 0.75) {
				itemArr2.push(new item(x, y));
			}
			if (0.75 > b && b > 0.7) {
				itemArr3.push(new item(x, y));
			}
			if (0.7 > b && b > 0.6) {
				itemArr4.push(new item(x, y));
			}
			if (0.6 > b && b > chimney) {
				itemArr5.push(new item(x, y));
			}
		}
	}
}
function checkBall2(){
	if(y>690-ballR&&(x>paddleX-ballR&&x<paddleX+paddleWidth+ballR)){
		
	 	dx = -((paddleX + (paddleWidth / 2) - x) / (paddleWidth)) * 10;
		dy = -Math.sqrt(43-dx*dx);
		if (3 > combo) score = score + combo;
		if (6 > combo >= 3) score = score + combo + 2;
		if (10 > combo >= 6) score = score + combo + 5;
		if (combo >= 10) score = score + combo + 10;
		combo = 0;
		bounce.play();
	}
	var leng1 = itemArr1.length
	for (var i = 0; i < leng1; i++)
		if (itemArr1[i].itemy > 690 - 10 && (itemArr1[i].itemx > paddleX - 10 && itemArr1[i].itemx < paddleX + paddleWidth + 10)) {
			getItem.play();
			itemArr1.splice(i, 1);
			item1=1;
			ballcolor="red"
			setTimeout(function(){item1--; ballcolor="brown"},3000);
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
			item1 = 0;
			ballcolor = "yellow";
			setTimeout(function () { item5--; ballcolor ="brown"}, 1500);
		}
}
function drawItem1(a){
	context.drawImage(document.getElementById("item1"),a.itemx, a.itemy, "20", "20");
}
function drawItem2(a) {
	context.drawImage(document.getElementById("item2"), a.itemx, a.itemy, "20", "20");
}
function drawItem3(a) {
	context.drawImage(document.getElementById('heart'), a.itemx, a.itemy, "20", "20");
}
function drawItem4(a) {
	context.drawImage(document.getElementById('item4'), a.itemx, a.itemy, "20", "20");
}
function drawItem5(a) {
	context.drawImage(document.getElementById('item5'), a.itemx, a.itemy, "20", "20");
}
function drawBall(){
	context.beginPath();
	context.arc(x, y, ballR, 0, 2.0 * Math.PI, true);
	context.fillStyle = "black";
	context.fill();
	context.beginPath();
	context.arc(x, y, ballR - 2, 0, 2.0 * Math.PI, true);
	context.fillStyle = ballcolor;
	context.fill();
}
function drawBrick_easy(a){
	if(levelM==1){
		checkBall_easy(a);
	}else if(levelM==2){
		checkBall_normal(a);
	}
	else if(levelM==3){
		checkBall_hard(a);
	}
	
	if(a.status==1){
		context.drawImage(document.getElementById("icon_brick3_easy"), a.brickX, a.brickY, brickWidth, brickHeight);
	}else if(a.status==2){
		context.drawImage(document.getElementById("icon_brick2_easy"), a.brickX, a.brickY, brickWidth, brickHeight);
	}else if(a.status==3){
		context.drawImage(document.getElementById("icon_brick_easy"), a.brickX, a.brickY, brickWidth, brickHeight);
	}else if(a.status==0){
		brickArr.splice(brickArr.indexOf(a),1);
	}
}
function drawBrick_normal(a){
	if(levelM==1){
		checkBall_easy(a);
	}else if(levelM==2){
		checkBall_normal(a);
	}
	else if(levelM==3){
		checkBall_hard(a);
	}
	
	if(a.status==1){
		context.drawImage(document.getElementById("icon_brick3_normal"), a.brickX, a.brickY, brickWidth, brickHeight);
	}else if(a.status==2){
		context.drawImage(document.getElementById("icon_brick2_normal"), a.brickX, a.brickY, brickWidth, brickHeight);
	}else if(a.status==3){
		context.drawImage(document.getElementById("icon_brick_normal"), a.brickX, a.brickY, brickWidth, brickHeight);
	}else if(a.status==0){
		brickArr.splice(brickArr.indexOf(a),1);
	} else if (a.status == 4) {
		context.drawImage(document.getElementById("door"), a.brickX, a.brickY, brickWidth, brickHeight);
	}
}
function drawBrick_hard(a){
	if(levelM==1){
		checkBall_easy(a);
	}else if(levelM==2){
		checkBall_normal(a);
	}
	else if(levelM==3){
		checkBall_hard(a);
	}
	if(a.status==1){
		context.drawImage(document.getElementById("icon_brick3"), a.brickX, a.brickY, brickWidth, brickHeight);
	}else if(a.status==2){
		context.drawImage(document.getElementById("icon_brick2"), a.brickX, a.brickY, brickWidth, brickHeight);
	}else if(a.status==3){
		context.drawImage(document.getElementById("icon_brick"), a.brickX, a.brickY, brickWidth, brickHeight);
	}else if(a.status==0){
		brickArr.splice(brickArr.indexOf(a),1);
	} else if (a.status == 4) {
		context.drawImage(document.getElementById("roof"), a.brickX, a.brickY, brickWidth, brickHeight);
	} else if (a.status == 6) {
		context.drawImage(document.getElementById("door"), a.brickX, a.brickY, brickWidth, brickHeight);
	} else if (a.status == 8) {
		context.drawImage(document.getElementById("dok"), a.brickX, a.brickY, brickWidth, brickHeight);
	} else if (a.status == 7) {
		context.drawImage(document.getElementById("dok3"), a.brickX, a.brickY, brickWidth, brickHeight);
	}
}
function drawPaddle(){
	context.drawImage(document.getElementById("paddle"), paddleX, 690, paddleWidth, paddleHeight);
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
		dx = (Math.random() - 0.5) * 10;
		dy = -Math.sqrt(43 - dx * dx);
		ball = setInterval(draw, 10);
		document.removeEventListener("keydown", retry, false);
	}
}


//==============================================미니게임 구현부===========================================================
var Player;//움직일 플레이어

var Bricks2 = new Array();//벽돌배열
//var gameover = false;
//var score = 0;

function init2(){
	canvas = document.getElementById('mCanvas');
	context = canvas.getContext('2d');
	
	Player = new GameObject("Player.png",60,60);//게임오브젝트로 만듬
	//brick = new GameObject("brick.jpg",30,30);

	Player.x = canvas.width/2 - 30;
	Player.y = canvas.height - 60;
	//brick.x = 0;
	//brick.y = 0;

	//Bricks.push(brick);

	rightPressed= false;
	leftPressed=false;
	document.addEventListener("keydown",keyDownHandler,false);
	document.addEventListener("keyup",keyUpHandler,false);

	Player.speed = 1;

	setInterval(draw2,1);

	//벽돌 만드는 함수 난이도에 따라 함수 실행 간격 결정
	setInterval(function() {
    const newObstacle = new GameObject('brick.png', 30, 30);
    Bricks2.push(newObstacle);
    newObstacle.isObstacle = true;

    newObstacle.direction = parseInt(Math.random()*3);
    newObstacle.x = Math.random() * canvas.width;//0에서 440사이의 소수 반환
    newObstacle.y = 0;
	}, 100);//<-실행간격
}


function draw2(){//화면 그리기
	//if(gameover === false){
	if(life > 0){

		context.clearRect(0,0,canvas.width,canvas.height);

		if(rightPressed){
			if(Player.x + Player.width <= canvas.width)
			Player.x += Player.speed;
		}else if(leftPressed){
			if(Player.x >= 0)
			Player.x -= Player.speed;
		}

		drawPlayer();//플레이어 그리기

		for(var i=0;i<Bricks2.length;i++){
			Bricks2[i].speed += 0.02;//난이도에 따라서 스피드도 변경할 가능성 유
			Bricks2[i].y += Bricks2[i].speed;
			

			
			drawBrick2(Bricks2[i]);

        	if(Bricks2[i].y >= canvas.height){ //canvas.height로 게임화면 세로사이즈 가져옴
            	++score;
				//Bricks.splice(i,1);
        		//i--;
        	}
			if (checkCollision(Player, Bricks2[i])) {
				life--;
				//Bricks2.splice(i,1);
        		//i--;
			}//충돌을 비교하는 것	
			if (checkCollision(Player, Bricks2[i]) || Bricks2[i].y >= canvas.height){
				Bricks2.splice(i,1);
				i--;
			}
		}
		
		
        context.font = "20px malgun gothic"; //폰트의 크기, 글꼴체 지정      
        context.fillStyle = "black"; //색상지정
        context.fillText("score : "+score,canvas.width-100,30); //점수를 지정한 위치에 찍어준다.
		context.fillText("life : "+life,canvas.width/2-20,30);
        context.fill();
	}
	else{
		//배경색 변경
        context.fillStyle = 'black';
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.font = "20px malgun gothic"; //폰트의 크기, 글꼴체 지정      
        context.fillStyle = "red"; //색상지정
        context.fillText("game over",canvas.width/2-55,canvas.height/2);
        context.fillText("score : "+score, canvas.width/2-55, canvas.height/2+20)
        context.fill();
        clearInterval();
        return;
	}
}
	

function drawPlayer(){
	context.drawImage(Player.image, Player.x, Player.y,Player.width, Player.height);
}

function drawBrick2(a){
	context.drawImage(a.image, a.x, a.y, a.width, a.height);
}

function GameObject(src, width, height)
{
    this.x = 0;
    this.y = 0;
    this.image = new Image();
    this.image.src = src;
    this.width = width;
    this.height = height;
    this.direction = 0;
    this.speed = 0;
    this.alpha = 1;//투명도
    this.isObstacle = false;//장애물인지 확인
}
function checkCollision(a, b) {//충돌 체크 함수
    return !(a.x > b.x + b.width || 
        a.x + a.width < b.x ||
        a.y > b.y + b.height ||
        a.y + a.height < b.y
    );
}