
var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var game = true;

var level = 0;

$(document).keydown(function(){
    if(!started){
        $("#level-title").text("Level "+ level);
        nextSequence();
        started = true;
        game = true;
    }
});

$(".btn").click(function (){
    if(game){
        var userChosenColor = $(this).attr("id");
        userClickedPattern.push(userChosenColor);
    
        playSound(userChosenColor);
        animatePress(userChosenColor);
    
        checkAnswer(userClickedPattern.length - 1);
}


    
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){

        if(currentLevel === gamePattern.length -1){
            setTimeout(function(){
                nextSequence();
            }, 1000);
            
        }
    }else{
        game = false;
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200)
        playSound("wrong");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }    
       
}

function nextSequence(){
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    
    level++;
    $("h1").html("Level "+level);
    


    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

}

function playSound(name){
    var sound;
    switch(name){
        case 'green':
            sound = new Audio("sounds/green.mp3");

            break;
        case 'blue':
            sound = new Audio("sounds/blue.mp3");
            
            break;
        case 'yellow':
            sound = new Audio("sounds/yellow.mp3");
            
            break;
        case 'red':
            sound = new Audio("sounds/red.mp3");
            
            break;
        case 'wrong':
            sound = new Audio("sounds/wrong.mp3");
            break;

    }
    sound.play();
}

function animatePress(currentColor){
    $("."+currentColor).addClass("pressed");
    setTimeout(function(){
        $("."+currentColor).removeClass("pressed");
    }, 100);
}

function startOver(){
        level = 0;
        started = false;
        gamePattern = [];
}