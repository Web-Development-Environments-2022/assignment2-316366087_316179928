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

    $("#registrationForm").validate({
        rules: {
            registrationUsername: "required",
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
            registrationUsername: "Please enter your username",
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