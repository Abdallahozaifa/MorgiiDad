/* global $, AOS*/
$(document).ready(function() {
    console.log("Morgi JS File Running! :)");

    /* Variable Declarations */
    var form = {};
    var imgCount = 1;
    var navItems = $("#myNavbar > ul > li");
    var navBar = $("#myNavbar");
    var pics = []; // All of the images in the photo gallery 
    form.submit = $(".submit-btn"); // form submit button

    /* Collapses navbar when item is clicked */
    navItems.click(function() {
        console.log("Clicked navbar item!!");
        navBar.toggleClass("in", false);
    });

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

        if (form.phone == "") {
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
            clearForm();
        }
        else {
            swal(
                'OOPS',
                'Please fill in all the required fields!',
                'error'
            )
        }
        e.preventDefault();
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

    var eventCount = 0;
    var createEvent = function(month, day, title, description) {
        var li = document.createElement("li");
        $(".event-list").append(li);
        if (eventCount % 2 == 0)
            $(li).attr("data-aos", "fade-right");
        else
            $(li).attr("data-aos", "fade-left");

        $(li).attr("data-aos-easing", "ease-out-cubic");
        $(li).attr("data-aos-duration", "2000");

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
        $(aSocial).append(spanSocial);
        eventCount++;
    };

    /* Function Calls */

    /******************************************************** 
     *  AREA TO ADD PICTURE TO PAGE                          *
     *  MUST BE BEFORE magnificAllPics function call below!  *
     *  EX. addPic('hozaifa.jpg', 'Hozaifa is awesome!');    *
     *********************************************************/
    addPic('Christmas.jpg');
    addPic('family.jpg');
    addPic('beginning.jpg');
    addPic('ClearGroupPhoto.jpg');
    addPic('children.jpeg');
    addPic('sign.jpg');
    addPic('soup.jpg');
    addPic('dave.jpg');
    addPic('Easter egg hunt.jpg');
    addPic('Lincoln Day Dinner 3.JPG');
    addPic('Veterans.jpg');
    addPic('Penn State Athletics.jpg')
    addPic("Mark.jpg")

    //DON'T TOUCH
    magnificAllPics();

    AOS.init();

    /************************************************************** 
     *  AREA TO ADD EVENT                                         *
     *                                                            *
     * EX. createEvent('JUL', '1', "Event Title", "Description"); *
     **************************************************************/
    createEvent("AUG", "12", "Lakeland FOP Steak Fry");
    createEvent("AUG", "19", "Hermitage Fire Department Gun Raffle");
    createEvent("AUG", "27", "Atterholt for District Judge Fundraiser", "Join us to raise funds to help our campaign! Held at the Mercer County Shrine Club from 12-6")
    createEvent("AUG", "28", "Hermitage FOP Steak Fry");
    createEvent("SEPT", "4", "Buhl Day");
    createEvent("SEPT", "24th", "Atterholt for District Judge Fundraiser", "Join us to raise funds to help our campaign! Held at the Mercer County Shrine Club. Time TBA")
    createEvent("OCT", "10", "Last Day to Register to vote");
    createEvent("OCT", "31", "Last Day to Apply for Civilian Absentee Ballot");
    createEvent("NOV", "3", "Last Day for County to Receive Voted Civilian Absentee Ballotts");
    createEvent("NOV", "7", "Municipal Election", "Don't forget to get out and vote!");

});
