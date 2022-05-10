$(document).ready(function() {
    $( function() {
        $( "#registrationBirthDate" ).datepicker();
    } );
    jQuery.validator.addMethod( "lettersonly", function( value, element ) {
        return this.optional( element ) || /^[a-zA-Z ]+$/i.test( value );
    }, "Letters only please" );

    jQuery.validator.addMethod( "alphanumeric", function( value, element ) {
        return this.optional( element ) || /^[a-zA-Z0-9]+$/i.test( value );
    }, "Letters, numbers only please" );

    jQuery.validator.addMethod( "freeUserName", function( value, element ) {
        return this.optional( element ) || !(value in users);
    }, "Username is taken already" );

    $("#registrationForm").validate({
        rules: {
            registrationUsername: {
                required: true,
                freeUserName: true
            },
            registrationPassword: {
                required: true,
                minlength: 6,
                alphanumeric: true
            },
            registrationName: {
                required: true,
                lettersonly: true
            },
            registrationEmail: {
                required: true,
                email: true
            },
            registrationBirthDate: "required"
        },
        messages: {
            registrationUsername:  {
                required: "Please enter your username",
                freeUserName: "This username is already in user."
            },
            registrationPassword: {
                required: "Please enter your password",
                minlength: "Your password should be at least 6 characters long",
                alphanumeric: "Your password should contain only digits and letters"
            },
            registrationName: {
                required: "Please enter your name",
                lettersonly: "Your name should contain only letters"
            },
            registrationEmail: {
                required: "Please enter your email",
                email: "Please enter a valid email address"
            },
            registrationBirthDate: "Please choose your birthday"
        }
    });
});

function submitRegistrationForm() {
    if ($("#registrationForm").valid()) {
        users[document.getElementById("registrationUsername").value]=document.getElementById("registrationPassword").value
        document.getElementById("registrationForm").reset();
        alert("Successful registration!")
        showOneScreen("loginPage")
    }
}