var loggedInUser = null;

$(document).ready(function() {
    jQuery.validator.addMethod( "userNameExists", function( value, element ) {
        return this.optional( element ) || (value in users);
    }, "Username doesn't exist" );

    jQuery.validator.addMethod( "correctPassword", function( value, element ) {
        return this.optional( element ) || (document.getElementById("userNameLogin").value in users && users[document.getElementById("userNameLogin").value]==value);
    }, "Wrong password" );

    $("#loginForm").validate({
        rules: {
            userNameLogin: {
                required: true,
                userNameExists: true
            },
            passwordLogin: {
                required: true,
                correctPassword: true
            }
        },
        messages: {
            userNameLogin: {
                required: "Please enter user name",
                userNameExists: "Username doesn't exist" ,
            },
            passwordLogin: {
                required: "Please enter password",
                correctPassword: "Wrong password"
            }
        }
    });
});

function authenticate(user,pass){
    if ($("#loginForm").valid()) {
	        isLoggedIn = true;
            loggedInUser = user.value;
            gameUserName.innerHTML = user.value;
            alert("Successful log-in!")
			showOneScreen("settingsPage");
	}
}