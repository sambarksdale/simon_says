function createPlayer(isTurn){
    this.array = [];
    this.isTurn = isTurn;
    this.longestSequence = 0;
    this. checkLongestSequence = function(){
        if(this.playerArray.length > this.longestSequence){
            this.longestSequence = this.playerArray.length;
            $('#high-score').html(player.longestSequence);
        }
    }

}

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
            $('#high-score').html(player.longestSequence);
        }
    },
}

const staticArray = [0,1,2,3]
let duration = 800;
let durationFloor = 350;
let turnLength = 0;


//gets random value from staticArray
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomValue(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

//adds new value to compArray
function addCompArrayValue(){
    comp.compArray.push(getRandomValue(staticArray.length));
}

//controlls speed
function speedUp(){
    if(duration !== 350){
        duration = duration - 50;
    }
}

//adds new value to playerArray
function addPlayerArrayValue(button){
    player.playerArray.push(Number(button.id.substring(button.id.length - 1)));
}

//checks playerArray against compArray
function checkValues(index){
    if(player.playerArray[index] !== comp.compArray[index]){
        setTimeout(function(){
            alert('you lose');
            reset();
        },duration * 1.2)
    }else {
        endPLayerTurn()
    }
}

//resets arrays, and turns
function reset(){
    comp.compArray = [];
    comp.isTurn = true;
    player.playerArray = [];
    player.isTurn = false;
    playGame();
}

//lights up button
function lightUpButton(id){
    $('#light-off-'+id).attr('id','light-on-' + id);
    setTimeout(function(){
        $('#light-on-'+id).attr('id','light-off-' + id);
    },duration) 
}

//triggers audio
function playAudio(id){
    let audioClone = document.getElementById('a' + id).cloneNode(true);
    audioClone.play()      
}

//switches turns
function switchTurns(){
    comp.isTurn = !comp.isTurn;
    player.isTurn = !player.isTurn;
} 

function compTurn(){
    console.log('comp turn start');
    //adds new value to compArray
    addCompArrayValue()
    speedUp();
    console.log('duration = ' + duration);
    console.log('comp array length = ' + comp.compArray.length);  
    turnLength = duration * comp.compArray.length;
    console.log('turnlength = ' + turnLength);  

    //iterates through comArray, lights up button, plays sound
    for(let i = 0; i < comp.compArray.length; i++){
        setTimeout(function(){
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

function endPLayerTurn(){
    if(player.playerArray.length === comp.compArray.length){
        player.playerArray = []
        switchTurns();
        setTimeout(function(){
            compTurn();
        },duration + 250)
    }
}

function playerTurn(){
    console.log('player turn start')
        $('.button').off().on('click', function(){
            if(player.isTurn === true){
                addPlayerArrayValue(this); 
                lightUpButton(player.playerArray[player.playerArray.length-1]);
                playAudio(player.playerArray[player.playerArray.length-1]);
                player.checkLongestSequence();
                checkValues(player.playerArray.length - 1);  
            }    
        })
}

function playGame(){
    $('#start').on('click',function(){
        compTurn();
        $('#start').off()
    })  
}


$(function(){
    playGame();
})




   



