$(document).ready(function() {


    jQuery.validator.addMethod( "lettersonly", function( value, element ) {
        return this.optional( element ) || /^[a-zA-Z ]+$/i.test( value );
    }, "Letters only please" );

    jQuery.validator.addMethod( "alphanumeric", function( value, element ) {
        return this.optional( element ) || /^[a-zA-Z0-9]+$/i.test( value );
    }, "Letters, numbers only please" );

    $("#settingForm").validate({
        rules: {
            ballNumbers: {
                required: true,
                digits: true,
                range: [50,90]
            },
            gameTime: {
                required: true,
                digits: true,
                min: 60
            },
            monsterPicker: {
                required: true,
                digits: true,
                range: [1,4]
            }
        },
        messages: {
            ballNumbers: {
                required: "Please enter number of balls",
                digits: "Please enter numbers only",
                range: "Must be a number between 50 and 90"
            },
            gameTime: {
                required: "Please enter game time",
                digits: "Please enter numbers only",
                range: "Must be a number bigger than 60"
            },
            monsterPicker: {
                required: "Please enter number of monsters",
                digits: "Please enter numbers only",
                range: "Must be a number between 1 and 4"
            }
        }
    });
});

function settingsGameKeyUp() {
    window.addEventListener("keydown", chooseGameUpKeyForEvent, false);
}

function chooseGameUpKeyForEvent(event) {
    keyMap["up"] = event.which
    keyMapForGameDisplay["Up"] = event.code
    document.getElementById('showUpKey').innerHTML=event.code
    window.removeEventListener("keydown", chooseGameUpKeyForEvent);
}

function settingsGameKeyDown() {
    window.addEventListener("keydown", chooseGameDownKeyForEvent, false);
}

function chooseGameDownKeyForEvent(event) {
    keyMap["down"] = event.which
    keyMapForGameDisplay["Down"] = event.code
    document.getElementById('showDownKey').innerHTML=event.code
    window.removeEventListener("keydown", chooseGameDownKeyForEvent);
}

function settingsGameKeyLeft() {
    window.addEventListener("keydown", chooseGameLeftKeyForEvent, false);
}

function chooseGameLeftKeyForEvent(event) {
    keyMap["left"] = event.which
    keyMapForGameDisplay["Left"] = event.code
    document.getElementById('showLeftKey').innerHTML=event.code
    window.removeEventListener("keydown", chooseGameLeftKeyForEvent);
}

function settingsGameKeyRight() {
    window.addEventListener("keydown", chooseGameRightKeyForEvent, false);
}

function chooseGameRightKeyForEvent(event) {
    keyMap["right"] = event.whic
    keyMapForGameDisplay["Right"] = event.code
    document.getElementById('showRightKey').innerHTML=event.code
    window.removeEventListener("keydown", chooseGameRightKeyForEvent);
}


function generateRandomSettings(){
    
    ballColor5.value = get_random_color();
    ballColor15.value =get_random_color();
    ballColor25.value = get_random_color();
    ballNumbers.value = Math.floor(Math.random()*40 + 50);
    monsterPicker.value = Math.floor(Math.random()*4 + 1);
    document.getElementById('showRightKey').innerHTML= "ArrowRight"
    document.getElementById('showLeftKey').innerHTML= "ArrowLeft"
    document.getElementById('showDownKey').innerHTML= "ArrowDown"
    document.getElementById('showUpKey').innerHTML= "ArrowUp"
    gameTimeFromSettings.value = Math.floor(Math.random()*60 + 60);

}

function get_random_color() 
{
    var color = "";
    for(var i = 0; i < 3; i++) {
        var sub = Math.floor(Math.random() * 256).toString(16);
        color += (sub.length == 1 ? "0" + sub : sub);
    }
    return "#" + color;
}

function submitSettingsForm(){
    if ($("#settingForm").valid()) {
        fivePointsColor = ballColor5.value;
        fifteenPointsColor =ballColor15.value;
        twenyFivePointsColor = ballColor25.value;
        food_remain = ballNumbers.value;
        numberOfMonsters = monsterPicker.value;
        upArrow = keyMap["up"];
        downArrow = keyMap["down"];
        leftArrow = keyMap["left"];
        rightArrow = keyMap["right"];
        gameTime = parseInt(gameTimeFromSettings.value);
        putSettingsAsideCanvase();
        Start();

    }
}

function putSettingsAsideCanvase(){
    LeftArrowGameDisplay.innerHTML = keyMapForGameDisplay["Left"]
    RightArrowGameDisplay.innerHTML = keyMapForGameDisplay["Right"]
    UpArrowGameDisplay.innerHTML = keyMapForGameDisplay["Up"]
    DownArrowGameDisplay.innerHTML = keyMapForGameDisplay["Down"]
    NumberOfBallsGameDisplay.innerHTML = food_remain.toString()
    FivePointBallCollorGameDisplay.innerHTML = fivePointsColor.toString();
    FiveTeenPointBallCollorGameDisplay.innerHTML = fifteenPointsColor.toString();
    TwentFivePointBallCollorGameDisplay.innerHTML = twenyFivePointsColor.toString();
    GameTimeGameDisplay.innerHTML = gameTime.toString();
    NumberOfMonstersGameDisplay.innerHTML = numberOfMonsters.toString();
}
