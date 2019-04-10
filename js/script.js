let comp = {
    compArray: [],
    isTurn: false
    
}

let player = {
    playerArray: [],
    isTurn: true,
    longestSequence: 0,
    checkLongestSequence: function(){
        if(this.playerArray.length > this.longestSequence){
            this.longestSequence = this.playerArray.length;
        }
    },
}

const staticArray = [0,1,2,3]
let duration = 1000;
let turnLength = (duration * 1.2) * comp.compArray.length;
let count = 0;
let index = 0

//gets random number
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomValue(max) {
    return Math.floor(Math.random() * Math.floor(max));
}    
//adds new value to compArray
function addCompArrayValue(){
    comp.compArray.push(getRandomValue(staticArray.length));
}

//adds new value to playerArray
function addPlayerArrayValue(button){
    player.playerArray.push(Number(button.id.charAt(1)));
    console.log(player.playerArray);
}

//checks playerArray against compArray
function checkValues(index){
    if(player.playerArray[index] !== comp.compArray[index]){
        alert('you lose');
        reset();
    }
}

//resets arrays, and turns
function reset(){
    comp.compArray = [];
    comp.isTurn = true;
    player.playerArray = [];
    player.isTurn = false;
}

//lights up button
function lightUpButton(id){
    //let startColor = $('#b'+id).css('background');
    //$('#b'+id).css('background','black');
    $('#b'+id).attr('id','c' + id);
    setTimeout(function(){
        $('#c'+id).attr('id','b' + id);
        //$('#b'+id).css('background',startColor)
    },duration) 
}

//triggers audio
function playAudio(id){
        document.getElementById('a' + id).play()
}

//switches turns
function switchTurns(){
    comp.isTurn = !comp.isTurn;
    player.isTurn = !player.isTurn;
} 

function compTurn(){
    console.log('comp start');
    //adds new value to compArray
    addCompArrayValue()
    console.log('comp'+comp.compArray.length)
    //iterates through comArray, lights up button, plays sound
    for(let i = 0; i < comp.compArray.length; i++){
        setTimeout(function(){
            console.log(comp.compArray[i]);
            lightUpButton(comp.compArray[i]);
            playAudio(comp.compArray[i]);
        },i * (duration * 1.2))
        
    }

    //switches turns
    setTimeout(function(){
        switchTurns();
        playerTurn();
    },turnLength)
     
}




/*function playerTurn(){
    $('.button').on('click',function(){
        addPlayerArrayValue(this);
        lightUpButton(player.playerArray[player.playerArray.length-1]);
        playAudio(player.playerArray[player.playerArray.length-1]);
        setTimeout(function(){
            checkValues(player.playerArray.length - 1);
        },duration * 1.1)
    })

}*/

/*function compTurn(){
    console.log('comp turn start');
    let turn = 0
    addCompArrayValue()
    console.log('comp array = '+ comp.compArray.length);
    turn = turn + 1
    if(turn > 0){
        console.log('comp turn end');
        playerTurn();
    }
}*/

function flipTurn(){
    if(player.playerArray.length === comp.compArray.length){
        player.playerArray = []
        setTimeout(function(){
            compTurn();
        },duration)
    }
}

function playerTurn(){
    console.log('player turn start')
    $('.button').off().on('click', function(){
        addPlayerArrayValue(this); 
        lightUpButton(player.playerArray[player.playerArray.length-1]);
        playAudio(player.playerArray[player.playerArray.length-1]);  
        flipTurn();
    })    
}





function playGame(){
    $('#start').on('click',function(){
        compTurn();
    })  
}


$(function(){
    playGame()
})

 /*for(let i = 0; i < comp.compArray.length; i++){
        setTimeout(function(){
            lightUpButton(comp.compArray[i]);
            $('#A0').trigger('play')
        },i * 600)
        
    }*/



   



