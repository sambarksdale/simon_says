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
let duration = 350;
let turnLength = (duration * 1.2) * (comp.compArray.length + 1);


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
    player.playerArray.push(Number(button.id.substring(button.id.length - 1)));
    console.log(player.playerArray);
}

//checks playerArray against compArray
function checkValues(index){
    if(player.playerArray[index] !== comp.compArray[index]){
        console.log('alert');
        alert('you lose');
        reset();
    }else {
        flipTurn()
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
    $('#light-off-'+id).attr('id','light-on-' + id);
    setTimeout(function(){
        $('#light-on-'+id).attr('id','light-off-' + id);
    },duration) 
}

//triggers audio
function playAudio(id){
    let audio = document.getElementById('a' + id);
    console.log(audio);
    let audioClone = audio.cloneNode(true);
    audioClone.play()
    //document.getElementById('a' + id).play();       
}

//switches turns
function switchTurns(){
    comp.isTurn = !comp.isTurn;
    console.log('comp turn ' + comp.isTurn);
    player.isTurn = !player.isTurn;
    console.log('player turn ' + player.isTurn);
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
    },turnLength + duration)
     
}

function flipTurn(){
    if(player.playerArray.length === comp.compArray.length){
        player.playerArray = []
        switchTurns();
        setTimeout(function(){
            compTurn();
        },duration * 1.2)
    }
}

function playerTurn(){
    if(player.isTurn === true){
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
}

function playGame(){
    $('#start').on('click',function(){
        compTurn();
    })  
}


$(function(){
    let comp = new createPlayer(true);
    let player = new createPlayer(false);
    console.log(comp);
    console.log(player)
})




   



