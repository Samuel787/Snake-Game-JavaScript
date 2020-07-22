import { onSnake, expandSnake, SNAKE_SPEED } from "./snake.js";
import { randomGridPosition } from "./grid.js";

let food = getRandomFoodPosition()
let EXPANSION_RATE = 5

export function update(){
    if(onSnake(food)){
        expandSnake(EXPANSION_RATE);
        food = getRandomFoodPosition()
    }
}

export function draw(gameBoard){
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    gameBoard.appendChild(foodElement);
}

function getRandomFoodPosition(){
    let newFoodPosition
    while(newFoodPosition == null || onSnake(newFoodPosition)){
        newFoodPosition = randomGridPosition();
    }
    return newFoodPosition;
}

function setSnakeSpeed(){
    EXPANSION_RATE = 0;
    while(EXPANSION_RATE < 1 || EXPANSION_RATE > 5){
        EXPANSION_RATE = prompt("How many units do you want the snake to grow everytime it eats? Enter a value between 1 and 5");
        if(isNaN(EXPANSION_RATE)){
            EXPANSION_RATE = 0;
        }
        EXPANSION_RATE = Math.floor(EXPANSION_RATE);
    }
        
}

setSnakeSpeed();