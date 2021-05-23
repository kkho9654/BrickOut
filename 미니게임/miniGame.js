window.onload = StartMiniGame;


function StartMiniGame(){
	init();
}

var canvas;
var context;

var Player;//움직일 플레이어
var brick;//벽돌
var Bricks = new Array();//벽돌배열
var rightPressed;
var leftPressed;
var life = 3
//var gameover = false;
var score = 0;

function init(){
	canvas = document.getElementById('Minicanvas');
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

	setInterval(draw,1);

	//벽돌 만드는 함수 난이도에 따라 함수 실행 간격 결정
	setInterval(function() {
    const newObstacle = new GameObject('brick.png', 30, 30);
    Bricks.push(newObstacle);
    newObstacle.isObstacle = true;

    newObstacle.direction = parseInt(Math.random()*3);
    newObstacle.x = Math.random() * canvas.width;//0에서 440사이의 소수 반환
    newObstacle.y = 0;
	}, 100);//<-실행간격
}


function draw(){//화면 그리기
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

		for(var i=0;i<Bricks.length;i++){
			Bricks[i].speed += 0.02;//난이도에 따라서 스피드도 변경할 가능성 유
			Bricks[i].y += Bricks[i].speed;
			

			
			drawBrick(Bricks[i]);

        	if(Bricks[i].y >= canvas.height){ //canvas.height로 게임화면 세로사이즈 가져옴
            	++score;
				//Bricks.splice(i,1);
        		//i--;
        	}
			if (checkCollision(Player, Bricks[i])) {
				life--;
				if(life === 2 || life === 1)
					document.getElementById("hit2").play();
				else
					document.getElementById("hit1").play();
				//Bricks.splice(i,1);
        		//i--;
			}//충돌을 비교하는 것	

			if (checkCollision(Player, Bricks[i]) || Bricks[i].y >= canvas.height){
				Bricks.splice(i,1);
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
	
	context.drawImage(Player.image, Player.x, Player.y,
	 Player.width, Player.height);
}

function drawBrick(a){
	
	context.drawImage(a.image, a.x, a.y,
	 a.width, a.height);
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

function checkCollision(a, b) {//충돌 체크 함수
    return !(a.x > b.x + b.width || 
        a.x + a.width < b.x ||
        a.y > b.y + b.height ||
        a.y + a.height < b.y
    );
}