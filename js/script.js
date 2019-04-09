const staticArray = [0,1,2,3]

let comp = {
    compArray: [],
    isTurn: true
}

let player = {
    playerArray: [],
    isTurn: false,
    longestSequence: 0,
    checkLongestSequence: function(){
        if(this.playerArray.length > this.longestSequence){
            this.longestSequence = this.playerArray.length;
        }
    }
}

