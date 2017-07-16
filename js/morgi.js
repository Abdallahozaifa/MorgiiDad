/* global $*/
$(document).ready(function() {
    console.log("Morgi JS File Running! :)");

    /* Variable Declarations */
    var form = {};
    var imgCount = 1;
    // All of the images in the photo gallery 
    var pics = [];

    form.submit = $("#submit"); // form submit button

    /* Click handler that executes when user clicks submit button */
    form.submit.click(function(e) {
        form.name = $("#name");
        form.email = $("#email");
        form.descr = $("#Description");
        console.log(form.name.val());
        console.log(form.email.val());
        console.log(form.descr.val());

        /* Send contact info to the server through a post request */
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

    /* Adds a picture object to the pics array */
    var addPic = function(imageName, title) {
        pics.push({
            src: "../static/images/" + imageName,
            title: title
        });
    };

    /* Animates a magnific pop up event to an image passed in */
    var animatePic = function(picArr) {
        var clsName = ".group-photo-link-" + imgCount;
        $(clsName).magnificPopup({
            items: picArr,
            gallery: {
                enabled: true
            },
            type: 'image'
        });
        imgCount++;
    };

    /* Adds the magnific pop up to every picture in the pics array */
    var magnificAllPics = function() {
        var count = 0;
        var picsLen = pics.length;
        while (count < picsLen) {
            if (count == 0) {
                animatePic(pics);
            }
            else {
                var picElm = pics[0];
                pics.splice(0, 1);
                pics.push(picElm);
                animatePic(pics);
            }
            count++;
        }
    };

    /* Scrolls to the anchor tag slowly */
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top
            }, 1000);
        }
    });

    /* Function Calls */

    /******************************************************** 
     *  AREA TO ADD PICTURE TO PAGE                          *
     *  MUST BE BEFORE magnificAllPics function call below!  *
     *  EX. addPic('hozaifa.jpg', 'Hozaifa is awesome!');    *
     *********************************************************/
    addPic('dave.jpg', 'Dave!');
    addPic('family.jpg', 'Familia! <3');
    addPic('beginning.jpg', 'When I became an OG!');
    addPic('ClearGroupPhoto.jpg', 'Hanging with the big dogs!');
    addPic('group.jpg', 'Chilling with the homies! :))');
    addPic('sign.jpg', 'Holding up the signs!');
    addPic('soup.jpg', 'I like eating soup!');
    addPic('mercer.jpeg', 'I like mercer!');

    //DON'T TOUCH
    magnificAllPics();
});
