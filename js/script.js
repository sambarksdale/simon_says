//creates comp object
let comp = {
    array: [],
    isTurn: true
}

//creates player object
let player = {
    array: [],
    isTurn: false,
    longestSequence: 0,
    checkLongestSequence: function(){
        if(this.array.length > this.longestSequence){
            this.longestSequence = this.array.length;
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

//adds new value to comp array
function addCompArrayValue(){
    comp.array.push(getRandomValue(staticArray.length));
}

//sets turnLength
function setTurnLength(){
    turnLength = duration * comp.array.length;
}

//controlls speed
function speedUp(){
    if(duration !== 350){
        duration = duration - 50;
    }
}

//adds new value to player array
function addPlayerArrayValue(button){
    player.array.push(Number(button.id.substring(button.id.length - 1)));
}

//checks player array against comp array
function checkValues(index){
    if(player.array[index] !== comp.array[index]){
        setTimeout(function(){
            $('.modal').show();
            //alert('you lose');
            reset();
        },duration * 1.2)
    }else {
        endPLayerTurn()
    }
}

//resets arrays, and turns
function reset(){
    comp.array = [];
    comp.isTurn = true;
    player.array = [];
    player.isTurn = false;
    duration = 800;
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

//switches boolean turn values
function switchTurns(){
    comp.isTurn = !comp.isTurn;
    player.isTurn = !player.isTurn;
} 

//ends player's turn
function endPLayerTurn(){
    if(player.array.length === comp.array.length){
        player.array = []
        switchTurns();
        setTimeout(function(){
            compTurn();
        },duration + 250)
    }
}

//player turn indicator
function turnIndicator(){
    if(comp.isTurn === true){
        $('#comp-turn').attr('class','is-on');
        $('#player-turn').attr('class','is-off');
    } else {
        $('#comp-turn').attr('class','is-off');
        $('#player-turn').attr('class','is-on');
    }
}


function compTurn(){

    turnIndicator();

    addCompArrayValue();

    speedUp();
    setTurnLength();

    //iterates through comArray, lights up button, plays sound
    for(let i = 0; i < comp.array.length; i++){
        setTimeout(function(){
            lightUpButton(comp.array[i]);
            playAudio(comp.array[i]);
        },i * (duration * 1.2))
        
    }

    setTimeout(function(){
        switchTurns();
        playerTurn();
    },turnLength)
     
}

function playerTurn(){
    turnIndicator();
    $('.button').off().on('click', function(){
        if(player.isTurn === true){
            addPlayerArrayValue(this); 
            lightUpButton(player.array[player.array.length-1]);
            playAudio(player.array[player.array.length-1]);
            player.checkLongestSequence();
            checkValues(player.array.length - 1);  
        }    
    })
}

function playGame(){
    $('#start').on('click',function(){
        $('.modal').hide();
        compTurn();
        $('#start').off()
    })  
}


$(function(){
    playGame();
})




   



