const game = (() => {
    let gameboard = [];
    let turn = 0;
    class NumCard {
        constructor(num){
            this.num = num;
            this.modified = false;
        }
        get num(){
            return this._num;
        }
        set num(val){
            return this._num = val;
        }
        get modified(){
            return this._modified;
        }
        set modified(mod) {
            return this._modified = mod;
        }
    }

    for(let i=0; i<16; i++) {
        gameboard.push(new NumCard(0));
    }
//Returns a new array representing gameboard where squares that contain 
//numbers are represented as "number"
    const freeSquares = () => {
        let openSquares = [];
        gameboard.forEach(boardSquare =>{
            if(boardSquare._num === 0) openSquares.push(boardSquare); 
            else openSquares.push('occupied');
        })
        return openSquares
    }

    const turnCount = () => turn++;

    const addNewNum = () => {
        let numAdded = false;
        
        const randSquare = () => {
            return Math.floor(Math.random() * (16));
        }
        
        const twoOrFour = () => {
            if(Math.random() > 0.5) return 2;
            else return 4;
        }
        
        while(numAdded === false) {
            let square = gameboard[randSquare()];
            console.log(square);
            if(square._num === 0){
                square._num = twoOrFour();
                numAdded = true;    
            }
        }
        
    }

    const rotateCountClock = () => {
        let tempArr = [];
        for(let i = 3; i >= 0 ; i--){
            for(let j = 0; j < 16; j+= 4){
                tempArr.push(gameboard[i + j]);
            }
        }
        for(let i = 0; i < 16; i++){
            gameboard[i] = tempArr[i];
        }
    }

    const iterateBoard = () => {
        for(let i = 0; i < 13; i += 4){
            combineNums(gameboard[i], gameboard[i + 1], gameboard[i + 2], gameboard[i + 3]);
            combineNums(gameboard[i], gameboard[i + 1], gameboard[i + 2], gameboard[i + 3]);
            combineNums(gameboard[i], gameboard[i + 1], gameboard[i + 2], gameboard[i + 3]);
            for(let j = 0; j < 4; j++){
                gameboard[i + j]._modified = false;
            }
        }
    }

    const combineNums = (num1, num2, num3, num4) => {
        if(num4._num === num3._num && num4._num !== 0 && num3._num !== 0 && num4._modified === false && num3._modified === false){
            num4._num = num4._num * 2;
            num3._num = 0;
            num4._modified = true;
            num3._modified = true;
            changeMade.change = true;
        }
        if(num4._num === 0 && num3._num !== 0){
            num4._num = num3._num;
            num3._num = 0;
            changeMade.change = true;
        }
        
        if(num3._num === num2._num && num3._num !== 0 && num2._num !== 0 && num3._modified === false && num2._modified === false){
            num3._num = num3._num * 2;
            num2._num = 0;
            num3._modified = true;
            num2._modified = true;
            changeMade.change = true;
        }
        if(num3._num === 0 && num2._num !== 0){
            num3._num = num2._num;
            num2._num = 0;
            changeMade.change = true;
        }
        
        if(num2._num === num1._num && num2._num !== 0 && num1._num !== 0 && num2._modified === false && num1._modified === false){
            num2._num = num2._num * 2;
            num1._num = 0;
            num2._modified = true;
            num1._modified = true;
            changeMade.change = true;
        }
        if(num2._num === 0 && num1._num !== 0){
            num2._num = num1._num;
            num1._num = 0;
            changeMade.change = true;
        }
        

    }

    const moveNums = (direction) => {
        if(direction === "ArrowRight"){
            iterateBoard();
        }

        if(direction === "ArrowDown"){
            rotateCountClock();
            iterateBoard();
            rotateCountClock();
            rotateCountClock();
            rotateCountClock();
        }    
        
        if(direction === "ArrowLeft"){
            rotateCountClock();
            rotateCountClock();
            iterateBoard();
            rotateCountClock();
            rotateCountClock();
        }
        if(direction === "ArrowUp"){
            rotateCountClock();
            rotateCountClock();
            rotateCountClock();
            iterateBoard();
            rotateCountClock();
        }
    }

    const changeMade =  {
        change: false
    }


    return {gameboard, freeSquares, turnCount, addNewNum, moveNums, changeMade}
})();


const display = (() => {

    const makeCard = (cardNum, boardIndex) => {
        const gameSquares = document.querySelectorAll('.gamesquare');
        const card = document.createElement('div');
        card.classList.add('numcard');
        card.id = `square${boardIndex}`
        if(cardNum !==0) card.textContent = cardNum;
        
        switch(cardNum){
            case(2): 
                card.style.backgroundColor = 'yellow';
                break; 
            case(4): 
                card.style.backgroundColor = 'orange';
                break;
            case(8): 
                card.style.backgroundColor = 'red';
                break;
            case(16): 
                card.style.backgroundColor = 'pink';
                break;
            case(32): 
                card.style.backgroundColor = 'purple';
                break;
            case(64): 
                card.style.backgroundColor = 'blue';
                break;
            case(128): 
                card.style.backgroundColor = 'lightSeaGreen';
                break;
            case(256): 
                card.style.backgroundColor = 'green';
                break;
            case(512): 
                card.style.backgroundColor = 'olive';
                break;
            case(1024): 
                card.style.backgroundColor = 'darkGreen';
                break;
            case(2048): 
                card.style.backgroundColor = 'lightBrown';
                break;
            case(4096): 
                card.style.backgroundColor = 'brown';
                break;
            case(8192): 
                card.style.backgroundColor = 'gray';
                break;
        }
        gameSquares[boardIndex].appendChild(card);
    }

    const clearCards = () => {
        const gameSquares = document.querySelectorAll('.gamesquare');
        gameSquares.forEach(square => {
            if(square.hasChildNodes){
                square.lastChild.remove();
            }
        });
    }

    const setCards = () => {
        for(let i=0; i<16; i++){
            makeCard(game.gameboard[i]._num, i);
        }
    }

    return {setCards, clearCards}
})();

const controller = (() => {
    const initialize = () => {
        game.addNewNum();
        game.addNewNum();
        display.setCards();
    }

    document.addEventListener('keydown', (e) => {
        if(e.code === 'ArrowRight' || e.code === 'ArrowLeft' || e.code === 'ArrowUp' || e.code === 'ArrowDown'){
            game.moveNums(e.code);
            if(game.changeMade.change === true){
                game.addNewNum();    
            }
            display.clearCards();
            display.setCards();
            game.changeMade.change = false;
        }
    })

    

    return {initialize}
})();

controller.initialize();

