/* global $, AOS*/
$(document).ready(function() {
    console.log("Morgi JS File Running! :)");

    /* Variable Declarations */
    var form = {};
    var imgCount = 1;
    // All of the images in the photo gallery 
    var pics = [];

    form.submit = $(".submit-btn"); // form submit button

    /* Click handler that executes when user clicks submit button */
    form.submit.click(function(e) {
        form.firstName = $("#form_firstname");
        form.lastName = $("#form_lastname");
        form.email = $("#form_email");
        form.phone = $("#form_phone");
        form.message = $("#form_message");
        console.log(form.firstName.val());
        console.log(form.lastName.val());
        console.log(form.email.val());
        console.log(form.phone.val());
        console.log(form.message.val());

        var emailData = {};

        if (form.phone != "") {
            emailData = {
                "name": form.firstName.val() + " " + form.lastName.val(),
                "phone": form.phone.val(),
                "email": form.email.val(),
                "message": form.message.val()
            };
        }
        else {
            emailData = {
                "name": form.firstName.val() + " " + form.lastName.val(),
                "email": form.email.val(),
                "message": form.message.val()
            }
        }

        /* Send contact info to the server through a post request */
        $.ajax({
            url: "/",
            method: "POST",
            type: 'json',
            data: emailData,
            crossDomain: true
        }, function success(data) {

        });
        e.preventDefault();
        clearForm();
    });

    /* Clears the form */
    var clearForm = function() {
        form.firstName.val("");
        form.lastName.val("");
        form.phone.val("");
        form.email.val("");
        form.message.val("");
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
    
    
    var createEvent = function(month, day, title, description){
        var li = document.createElement("li");
        $(".event-list").append(li);
        
        var time = document.createElement("time");
        time.className = "event-date";
        
        $(li).append(time);
        
        var dayElm = document.createElement("span");
        dayElm.className = "day";
        dayElm.textContent = day;
        
        var monthElm = document.createElement("span");
        monthElm.className = "month";
        monthElm.textContent = month;
        
        var yearElm = document.createElement("span");
        yearElm.className = "year";
        yearElm.textContent = "2017";
        
        $(time).append(dayElm);
        $(time).append(yearElm);
        $(time).append(monthElm);
        
        var divInfo = document.createElement("div");
        divInfo.className = "info";

        var h2 = document.createElement("h2");
        h2.className = "title";
        h2.textContent = title;
        
        var p = document.createElement("p");
        p.className = "desc";
        p.textContent = description;
        
        $(li).append(divInfo);
        $(divInfo).append(h2);
        $(divInfo).append(p);
        
        var divSocial = document.createElement("div");
        divSocial.className = "social";
        
        var ulSocial = document.createElement("ul");
    
        var liSocial = document.createElement("li");
        liSocial.className = "google-plus";
        liSocial.style = "width:33%";
        
        var aSocial = document.createElement("a");
        aSocial.href = "#google-plus";
        
        var spanSocial = document.createElement("span");
        spanSocial.className = "fa fa-calendar";
        
        $(li).append(divSocial);
        $(divSocial).append(ulSocial);
        $(ulSocial).append(liSocial);
        $(liSocial).append(aSocial);
        $(aSocial).append(spanSocial)
    };
    
    /* Function Calls */

    /******************************************************** 
     *  AREA TO ADD PICTURE TO PAGE                          *
     *  MUST BE BEFORE magnificAllPics function call below!  *
     *  EX. addPic('hozaifa.jpg', 'Hozaifa is awesome!');    *
     *********************************************************/
    addPic('Christmas.jpg', 'Dave!');
    addPic('family.jpg', 'Familia! <3');
    addPic('beginning.jpg', 'When I became an OG!');
    addPic('ClearGroupPhoto.jpg', 'Hanging with the big dogs!');
    addPic('children.jpeg', 'Chilling with the homies! :))');
    addPic('sign.jpg', 'Holding up the signs!');
    addPic('soup.jpg', 'I like eating soup!');
    addPic('dave.jpg', 'I like mercer!');

    //DON'T TOUCH
    magnificAllPics();

    AOS.init();
    
    /************************************************************** 
     *  AREA TO ADD EVENT                                         *
     *                                                            *
     * EX. createEvent('JUL', '1', "Event Title", "Description"); *
     **************************************************************/
    createEvent("JUL" , "1", "Hozaifa's Birthday", "It was awesome!");
});
