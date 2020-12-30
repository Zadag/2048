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
console.log(gameboard);