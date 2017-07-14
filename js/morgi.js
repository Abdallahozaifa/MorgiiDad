/* global $, ajax*/
$(document).ready(function() {
    console.log("morgi");

    var form = {};
    form.submit = $("#submit");

    /* Click handler that executes when user clicks submit button */
    form.submit.click(function(e) {
        form.name = $("#name");
        form.email = $("#email");
        form.descr = $("#Description");
        console.log(form.name.val());
        console.log(form.email.val());
        console.log(form.descr.val());

        /* Send contact info to the server */
        $.ajax({
            url: "/",
            method: "POST",
            type: 'json',
            data: {
                "name": form.name.val(),
                "email": form.email.val(),
                "descr": form.descr.val()
            },
            crossDomain: true
        }, function success(data) {
            
        });

        e.preventDefault();
        clearForm();
    });

    /* Clears the form */
    var clearForm = function() {
        form.name.val("");
        form.email.val("");
        form.descr.val("");
    };
});
