const staticArray = [0,1,2,3]

let comp = {
    compArray: [0,3,1,3,2,3,3,2,1,0,3,1,3,2,3,3,2,1,0,3,1,3,2,3,3,2,1,0,3,1,3,2,3,3,2,1,0,3,1,3,2,3,3,2,1,0,3,1,3,2,3,3,2,1],
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
//determines length of lightup/sound
let duration = 500;

function lightUpButton(id){
    let startColor = $('#B'+id).css('background');
    $('#B'+id).css('background','black')
    setTimeout(function(){
        $('#B'+id).css('background',startColor)
    },500) 
}

$(function(){
    for(let i = 0; i < comp.compArray.length; i++){
        setTimeout(function(){
            lightUpButton(comp.compArray[i]);  
        },i * 600)
        
    }
})


   



