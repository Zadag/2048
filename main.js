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

    const compareNums = (current, next) => {
        if(current._num === next._num && current._modified === false){
            console.log('fireing');
            current._num = 0; 
            next._num = next._num + next._num;
            next._modified = true;
        }
        if(current._num !== 0 && next._num === 0){
            next._num = current._num;
            current._num = 0;
        } 
    }

    const fixSpacing = (current, next) => {
        if(current._num !== 0 && next._num ===0){
            next._num = current._num;
            current._num = 0;
        }
    }

    const moveNums = (direction) => {
        for(let i = 0; i < 13; i = i + 4){
            compareNums(gameboard[i], gameboard[i + 1]);
            compareNums(gameboard[i + 1], gameboard[i + 2]);      
            compareNums(gameboard[i + 2], gameboard[i + 3]);
            gameboard[i]._modified = false;
            gameboard[i + 1]._modified = false;
            gameboard[i + 2]._modified = false;
            gameboard[i + 3]._modified = false;
        }
        console.log(gameboard);
    }


    return {gameboard, freeSquares, turnCount, addNewNum, moveNums}
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
                card.style.backgroundColor = 'purple';
                break;
            case(32): 
                card.style.backgroundColor = 'blue';
                break;
            case(64): 
                card.style.backgroundColor = 'green';
                break;
            case(128): 
                card.style.backgroundColor = 'gray';
                break;
            case(256): 
                card.style.backgroundColor = 'yellow';
                break;
            case(512): 
                card.style.backgroundColor = 'yellow';
                break;
            case(1024): 
                card.style.backgroundColor = 'yellow';
                break;
            case(2048): 
                card.style.backgroundColor = 'yellow';
                break;
            case(4096): 
                card.style.backgroundColor = 'yellow';
                break;
            case(8192): 
                card.style.backgroundColor = 'yellow';
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
            game.moveNums();
            game.addNewNum();
            display.clearCards();
            display.setCards();
        }
    })

    

    return {initialize}
})();

controller.initialize();

