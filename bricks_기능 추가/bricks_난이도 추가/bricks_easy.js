window.onload=pageLoad;

function pageLoad(){
	document.addEventListener("keydown", keyDownHandler, false);
	document.addEventListener("keyup", keyUpHandler, false);
	document.addEventListener("keydown", startGame, false);
	init();
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
var ballcolor = "brown";
var bgm = new Audio("sound_bgm.mp3");
var getItem = new Audio("sound_getItem.mp3");
var haycrack = new Audio("crack_hay.mp3");
var bounce = new Audio("bounce.mp3");
haycrack.volume = "0.2";
getItem.volume = "0.2";
bgm.volume = "0.1";
bounce.volume = "0.4";

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
	canvas=document.getElementById('myCanvas');
	context= canvas.getContext('2d');
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
	checkEnd();
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

function buildHouse() {
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
		haycrack.load();
		haycrack.play();
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
	else if((y-1>a.brickY-ballR-dy&&y<a.brickY+brickHeight+ballR-dy)&&(x>a.brickX&&x<a.brickX+brickWidth)&&a.status>0){
		if (item5 == 1) {
			a.status = 0;
			dy = -dy;
		}
		if (item1 == 1) {
			a.status--;
		}
		a.status--;
		dy=-dy;
		haycrack.load();
		haycrack.play();
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
			ballcolor = "yellow";
			setTimeout(function () { item5--; ballcolor ="brown"}, 1500);
		}
}
function drawItem1(a){
	context.drawImage(document.getElementById("item1"),a.itemx, a.itemy, "20", "20")
}
function drawItem2(a) {
	context.drawImage(document.getElementById("item2"), a.itemx, a.itemy, "20", "20")
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
function drawBall() {
	context.beginPath();
	context.arc(x, y, ballR, 0, 2.0 * Math.PI, true);
	context.fillStyle = "black";
	context.fill();
	context.beginPath();
	context.arc(x, y, ballR - 2, 0, 2.0 * Math.PI, true);
	context.fillStyle = ballcolor;
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
	}else if(a.status==0){
		brickArr.splice(brickArr.indexOf(a),1);
	}
}
function drawPaddle(){

	context.drawImage(document.getElementById("paddle"), paddleX, 690, paddleWidth, paddleHeight)
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