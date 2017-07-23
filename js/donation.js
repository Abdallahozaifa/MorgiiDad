/* global $*/
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
        ){
            return false;
        }
        return true;
    };

    $('#details .next').on("click", function(e) {
        console.log(form.email.val());
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
            e.preventDefault();
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
            }, function success(data) {

            });
            clearForm();
            // swal({
            //         title: 'Thank you for the information',
            //         text: 'Redirecting to Paypal',
            //         timer: 2000
            //     }).then(
            //         function() {},
            //         // handling the promise rejection
            //         function(dismiss) {
            //             if (dismiss === 'timer') {
            //                 window.location.href = "https://www.paypal.com/donate/?token=OojGnlR2tX109ZiLMq3Ns3oz-arLHydM6td7zpvgIT0TqucrxXeh7G7mKm21t9v6gH8Bim&country.x=US&locale.x=US";
            //             }
            //         }
            //     )
            // e.preventDefault();
            // window.location.href = "https://www.paypal.com/donate/?token=OojGnlR2tX109ZiLMq3Ns3oz-arLHydM6td7zpvgIT0TqucrxXeh7G7mKm21t9v6gH8Bim&country.x=US&locale.x=US";
        }
    });


});
