 const board = document.querySelector(".board");
 const blockWidth= 50;
 const blockHeight= 50;
 let btn = document.querySelector(".btn-start");
 let modal = document.querySelector(".modal");
const startGameModal= document.querySelector(".start-game");
const gameOverModal = document.querySelector(".game-over");
const restartButton = document.querySelector(".btn-restart");
let highScoreElement= document.querySelector("#high-score");
let scoreElement = document.querySelector("#score");
let timeElement = document.querySelector("#time");

let highscore = Number(localStorage.getItem("highscore"))|| 0;
let score = 0;
let time = '00-00';
highScoreElement.innerText=highscore;
 let columns=null;
 let rows = null;
 let food = {x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*columns)}
 let interval;
 let timeIntervalId = null;
 let block;
 let direction = "down";
 let snake=[{
     x:2,
     y:3
}];
let blockk = [];
 columns = Math.floor(board.clientWidth/blockWidth);
    rows = Math.floor(board.clientHeight/blockHeight);
for(let row =0;row<rows;row++){
    for(let column =0; column<columns;column++){
        block = document.createElement("div");
    block.classList.add("block");
    board.appendChild(block);
    // block.innerText=(`${row}-${column}`);
    blockk[`${row}-${column}`]= block;
    }
}
let render = ()=>{
    let head = null;
     blockk[`${food.x}-${food.y}`].classList.add("food");
 if(direction==="right"){
     head={x:snake[0].x,y:snake[0].y+1};
 }else if(direction==="left"){
     head= {x:snake[0].x,y:snake[0].y-1};
 }else if(direction==="down"){
     head={x:snake[0].x+1,y:snake[0].y};
 }else{
     head={x:snake[0].x-1,y:snake[0].y}
 }
 snake.forEach((segment) => {
     blockk[`${segment.x}-${segment.y}`].classList.remove("fill");
 });
 if(head.x<0 || head.y<0 || head.x>=rows || head.y>=columns){
    clearInterval(interval);
    modal.style.display="flex";
    startGameModal.style.display="none";
    gameOverModal.style.display="flex";
    return;
 }
 if(head.x==food.x && head.y==food.y){
        blockk[`${food.x}-${food.y}`].classList.remove("food");
        food = {x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*columns)};
       blockk[`${food.x}-${food.y}`].classList.add("food");
       snake.unshift(head);
       score +=10;
       scoreElement.innerText=score;
       if(score>highscore){
        highscore=score;
        localStorage.setItem("highscore",highscore);
        highScoreElement.innerText=highscore;
       }
     }
 snake.unshift(head);
 snake.pop();
snake.forEach((segment) => {
    blockk[`${segment.x}-${segment.y}`].classList.add("fill");
});
}

btn.addEventListener("click",()=>{
    modal.style.display="none";
    clearInterval(interval);
    interval = setInterval(()=>{
    render();
},200)
timeIntervalId=setInterval(()=>{
    let[min,sec]=time.split("-").map(Number);
    if(sec==59){
        min+=1;
        sec=0;
    }else{
        sec+=1;
    }
    let formattedMin = String(min).padStart(2, "0");
    let formattedSec = String(sec).padStart(2, "0");

    time = `${formattedMin}-${formattedSec}`;
    timeElement.innerText = time;
},1000)
})


 restartButton.addEventListener("click",restart)
 function restart(){
    clearInterval(interval);
    blockk[`${food.x}-${food.y}`].classList.remove("food");
    snake.forEach((segment) => {
    blockk[`${segment.x}-${segment.y}`].classList.remove("fill");
});
    score=0;
    time="00-00";
    scoreElement.innerText=0;
    timeElement.innerText=time;
    modal.style.display="none";
    direction="right";
    snake =[{x:1,y:3}];
    food = {x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*columns)}
    interval = setInterval(()=>{render()},200);
 }

window.addEventListener("keydown",(event)=>{
    if(event.key==="ArrowLeft"){
        direction = "left";
    }else if(event.key==="ArrowUp"){
        direction = "up";
    }else if(event.key==="ArrowRight"){
        direction ="right";
    }else if (event.key==="ArrowDown"){
        direction ="down"
    }
})
