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
    return {gameboard}
})();


const display = (() => {
    const makeCard = (cardNum, boardIndex) => {
        const gameSquares = document.querySelectorAll('.gamesquare');
        const card = document.createElement('div');
        card.classList.add('numcard');
        
        switch(cardNum){
            case(2): 
                card.style.backgroundColor = 'yellow';
                break; 
            case(4): 
                card.style.color = 'orange';
                break;
            case(8): 
                card.style.color = 'red';
                break;
            case(16): 
                card.style.color = 'purple';
                break;
            case(32): 
                card.style.color = 'blue';
                break;
            case(64): 
                card.style.color = 'green';
                break;
            case(128): 
                card.style.color = 'gray';
                break;
            case(256): 
                card.style.color = 'yellow';
                break;
            case(512): 
                card.style.color = 'yellow';
                break;
            case(1024): 
                card.style.color = 'yellow';
                break;
            case(2048): 
                card.style.color = 'yellow';
                break;
            case(4096): 
                card.style.color = 'yellow';
                break;
            case(8192): 
                card.style.color = 'yellow';
                break;
        }
        gameSquares[boardIndex].appendChild(card);
        console.log(gameSquares[cardNum]);
    }

    const setCards = () => {
        for(let i=0; i<16; i++){
            if(game.gameboard[i]._num !== 0){
                makeCard(game.gameboard[i]._num, i);
            } 
        }
    }

    return {setCards}
})();
display.setCards();
