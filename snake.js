import { getInputDirection } from './input.js';
import { GRID_SIZE } from './grid.js';

export let SNAKE_SPEED = 5
const snakeBody = [
    {x:11, y:11}
]
let newSegments = 0;

export function update(){
    addSegments();
    const inputDirection  = getInputDirection();
    for(let i = snakeBody.length - 2; i >= 0; i--){
        snakeBody[i+1] = { ...snakeBody[i]} // making a new snake
    }
    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;
    if(snakeBody[0].x < 1){
        snakeBody[0].x = GRID_SIZE;
    }
    if(snakeBody[0].x > GRID_SIZE){
        snakeBody[0].x = 0;
    }
    if(snakeBody[0].y < 1){
        snakeBody[0].y = GRID_SIZE;
    }
    if(snakeBody[0].y > GRID_SIZE){
        snakeBody[0].y = 0;
    }
}

export function draw(gameBoard){
    snakeBody.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.classList.add('snake');
        gameBoard.appendChild(snakeElement);
    })
}

export function expandSnake(amount){
    newSegments += amount;
}

export function onSnake(position, {ignoreHead = false} = {}){
    return snakeBody.some((segment, index) => {
        if(ignoreHead && index === 0) return false;
        return equalPositions(segment, position);
    })
}

export function snakeIntersection(){
    return onSnake(snakeBody[0], {ignoreHead:true})
}

function equalPositions(pos1, pos2){
    return pos1.x === pos2.x && pos1.y === pos2.y;
}

function addSegments(){
    for(let i = 0; i < newSegments; i++){
        snakeBody.push({...snakeBody[snakeBody.length - 1]});
    }
    newSegments = 0;
}

export function getSnakeHead(){
    return snakeBody[0];
}

function setSnakeSpeed(){
    alert("Use your arrow keys to navigate");
    SNAKE_SPEED = 0;
    while(SNAKE_SPEED < 2 || SNAKE_SPEED > 10 || isNaN(SNAKE_SPEED))
        SNAKE_SPEED = prompt("Enter speed of snake. Enter a number between 2 to 10.");
}

setSnakeSpeed();