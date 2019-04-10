let comp = {
    compArray: [0],
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

const staticArray = [0,1,2,3]
let duration = 300;
let turnLength = (duration * 1.2) * comp.compArray.length;
count = 0

//gets random number
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomValue(max) {
    return Math.floor(Math.random() * Math.floor(max));
}    

function addCompArrayValue(){
    comp.compArray.push(getRandomValue(staticArray.length));
}
//determines length of lightup/sound


function lightUpButton(id,){
    let startColor = $('#b'+id).css('background');
    console.log($('#b'+id).css('background'))
    $('#b'+id).css('background','black')
    console.log($('#b'+id).css('background'))
    setTimeout(function(){
        $('#b'+id).css('background',startColor)
        console.log($('#b'+id).css('background'))
    },duration) 
}

function playAudio(id){
        document.getElementById('a' + id).play()
}



function compTurn(){
    for(let i = 0; i < comp.compArray.length; i++){
        setTimeout(function(){
            lightUpButton(comp.compArray[i]);
            playAudio(comp.compArray[i]);
        },i * (duration * 1.3))
        
    }
     
}

function playerTurn(){
    $('body').on('click',function(){
        compTurn(); 
      })
}

function playGame(){
    $('body').on('click',function(){
      compTurn();  
    })
}


$(function(){ 
      playGame();
})

 /*for(let i = 0; i < comp.compArray.length; i++){
        setTimeout(function(){
            lightUpButton(comp.compArray[i]);
            $('#A0').trigger('play')
        },i * 600)
        
    }*/



   



