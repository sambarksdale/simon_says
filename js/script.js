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
//gets random number
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomValue(max) {
    return Math.floor(Math.random() * Math.floor(max));
}    


function addCompArrayValue(){
    comp.compArray.push(getRandomValue(staticArray.length));
}



function lightUpButton(id){
    let startColor = $(id).css('background');
    $(id).css('background','black')
    setTimeout(function(){
        $(id).css('background',startColor)
    },1000) 
}

$(function(){
    lightUpButton('#B4');
})

   



