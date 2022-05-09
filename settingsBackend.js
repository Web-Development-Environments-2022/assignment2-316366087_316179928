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
    document.getElementById('showUpKey').innerHTML=event.code
    window.removeEventListener("keydown", chooseGameUpKeyForEvent);
}

function settingsGameKeyDown() {
    window.addEventListener("keydown", chooseGameDownKeyForEvent, false);
}

function chooseGameDownKeyForEvent(event) {
    keyMap["down"] = event.which
    document.getElementById('showDownKey').innerHTML=event.code
    window.removeEventListener("keydown", chooseGameDownKeyForEvent);
}

function settingsGameKeyLeft() {
    window.addEventListener("keydown", chooseGameLeftKeyForEvent, false);
}

function chooseGameLeftKeyForEvent(event) {
    keyMap["left"] = event.which
    document.getElementById('showLeftKey').innerHTML=event.code
    window.removeEventListener("keydown", chooseGameLeftKeyForEvent);
}

function settingsGameKeyRight() {
    window.addEventListener("keydown", chooseGameRightKeyForEvent, false);
}

function chooseGameRightKeyForEvent(event) {
    keyMap["right"] = event.which
    document.getElementById('showRightKey').innerHTML=event.code
    window.removeEventListener("keydown", chooseGameRightKeyForEvent);
}
