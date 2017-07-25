/* global $, swal*/
$(document).ready(function() {
    var form = {};
    form.firstName = $("#firstName");
    form.lastName = $("#lastName");
    form.email = $("#email");
    form.street = $("#street");
    form.city = $("#city");
    form.zipcode = $("#zipcode");
    form.state = $("#state");
    form.occupation = $("#occupation");
    form.submit = {};

    var clearForm = function() {
        form.firstName.val("");
        form.lastName.val("");
        form.email.val("");
        form.street.val("");
        form.city.val("");
        form.zipcode.val("");
        form.state.val("");
        form.occupation.val("");
    };

    var validateForm = function() {
        if (form.firstName.val() == "" ||
            form.lastName.val() == "" ||
            form.email.val() == "" ||
            form.street.val() == "" ||
            form.city.val() == "" ||
            form.zipcode.val() == "" ||
            form.state.val() == "" ||
            form.occupation.val() == ""
        ) {
            return false;
        }
        return true;
    };

    $('#details .next').on("click", function(e) {
        e.preventDefault();
        form.submit.email = form.email.val();
        form.submit.occupation = form.occupation.val();
        form.submit.address = form.street.val() + " " + form.city.val() + " " + form.state.val() + " " + form.zipcode.val();
        form.submit.name = form.firstName.val() + " " + form.lastName.val();

        if (validateForm() == false) {
            // SWALL
            swal(
                'OOPS',
                'Please fill in all the required fields!',
                'error'
            );
        }
        else {

            var emailData = {
                name: form.submit.name,
                email: form.submit.email,
                address: form.submit.address,
                occupation: form.submit.occupation
            };

            /* Send contact info to the server through a post request */
            $.ajax({
                url: "/donation",
                method: "POST",
                type: 'json',
                data: emailData,
                crossDomain: true
            }).done(function(data) {
                if (data == "Success") {
                    clearForm();
                    swal({
                        title: 'Your information was sent to Atterholt!',
                        text: 'Currently Redirecting to Paypal',
                        type: 'success',
                        timer: 2000
                    });
                    setTimeout(function() {
                        window.parent.location.href = "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=PY5XEJTUVRNCA";
                    }, 2000);
                }
                else {
                    swal(
                        'Problem with the server!',
                        'Please try again!',
                        'error'
                    );
                }
            });
        }
    });
});
