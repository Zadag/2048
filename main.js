const game = (() => {
    let gameboard = [];

    class NumCard {
        constructor(num){
            this.num = num;
        }
        get num(){
            return this._num
        }
        set num(val){
            return this._num = val;
        }
    }

    for(let i=0; i<16; i++) {
        gameboard.push(new NumCard(0));
    }

    const freeSquares = () => {
        let openSquares = [];
        gameboard.forEach(boardSquare =>{
            if(boardSquare._num === 0) openSquares.push(boardSquare);
        })
        console.log(openSquares);
    }



    return {gameboard, freeSquares}
})();


const display = (() => {
    const makeCard = (cardNum, boardIndex) => {
        const gameSquares = document.querySelectorAll('.gamesquare');
        const card = document.createElement('div');
        card.classList.add('numcard');
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
        console.log(gameSquares[boardIndex]);
    }

    const setCards = () => {
        for(let i=0; i<16; i++){
            makeCard(game.gameboard[i]._num, i);
        }
    }

    return {setCards}
})();
display.setCards();
game.freeSquares();
