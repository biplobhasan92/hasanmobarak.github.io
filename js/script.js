// Document load event
"use strict";

var menu = $(".lx-main-menu", ".lx-wrapper");
var socialMedia = $(".lx-social-media", ".lx-wrapper");
var settings = $(".lx-settings", ".lx-wrapper");

// Windows load event
$(window).on("load", function() {
    // Loader Fade Out
    $(".lx-loader", ".lx-wrapper").fadeOut();
    return false;
});

function addMapMarker(){
	var latLng = new google.maps.LatLng(23.7541415, 90.3931183);
	var mapProp = {
		center: latLng,
		zoom:8,
		mapTypeId:google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("lx-map-contact"),mapProp);		
	var marker = new google.maps.Marker({
		draggable: true,
		position : latLng,
		map      : map,
		title    : 'Software Technology Park, Janata Tower, Dhaka 1215.'
	});		
}

$(document).on("ready", function() {
    // Resize blocs
    $(".lx-current-section").css("height", $(window).height() + "px");
    $(".lx-main-menu").css("height", $(window).height() + "px");
    $(".lx-social-media").css("height", $(window).height() + "px");
    // Set Current Section
    for (var i = 0; i < $(".lx-blocs").length; i++) {
        if ($(this).scrollTop() > $(".lx-blocs:eq(" + i + ")").offset().top) {
            $(".lx-main-menu ul li a").removeClass("active");
            $(".lx-main-menu ul li a[data-title='" + $(".lx-blocs:eq(" + i + ")").attr('class').split(' ')[0] + "']").addClass("active");
            $(".lx-current-section-item").css({
                "opacity": "0.3",
                "transform": "scale(0.5)"
            });
            $(".lx-current-section-item[data-section='" + $(".lx-blocs:eq(" + i + ")").attr('class').split(' ')[0] + "']").css({
                "opacity": "1.0",
                "transform": "scale(1.0)"
            });
        }
    }
	addMapMarker()
    // Redirection to the requested bloc
    hashHistory();
    return false;
});

$(window).on("hashchange", function() {
    // Redirection to the requested bloc
    hashHistory();
    return false;
});

function hashHistory() {
    var page = "";
    if (window.location.hash) {
        page = document.location.hash;
        page = page.replace(/\#/, "");
    } else {
        page = "home";
    }
    // Remove active class from menus
    $(".lx-main-menu ul li a").removeClass("active");
    // Set clicked menu active
    $(".lx-main-menu ul li a[data-url='" + page + "']").addClass("active");
    // Scroll to the correspondant scetion
    $('html, body').animate({
        scrollTop: $("." + $(".lx-main-menu ul li a[data-url='" + page + "']").attr("data-title")).offset().top + 2
    }, 1000);
}

// Main menu event : show correspondant section
$(".lx-main-menu ul li a").on("click", function() {
    // Remove active class from menus
    $(".lx-main-menu ul li a").removeClass("active");
    // Set clicked menu active
    $(this).addClass("active");
    history.pushState('data', '', 'index.html#' + $(this).attr("data-url"));
    // Scroll to the correspondant scetion
    $('html, body').animate({
        scrollTop: $("." + $(this).attr("data-title")).offset().top + 2
    }, 1000);
    if ($(window).width() < 769) {
        menu.css("left", "-40px");
        $(".lx-main-menu > i").attr("class", "fa fa-bars");
    }
    return false;
});

// Current section event
$(".lx-current-section-item").on("click", function() {
    // Trigger Main Menu
    $(".lx-main-menu ul li a[data-title='" + $(this).attr("data-section") + "']").trigger("click");
    return false;
});

$(window).on("resize", function() {
    // Resize blocs
    $(".lx-current-section").css("height", $(window).height() + "px");
    $(".lx-main-menu").css("height", $(window).height() + "px");
    $(".lx-social-media").css("height", $(window).height() + "px");
    return false;
});

$(document).on("scroll", function() {
    // Loading bars
    if ($(this).scrollTop() > $(".lx-bars-chart").offset().top - 400) {
        for (var i = 0; i < $(".lx-bar", ".lx-bars-chart").length; i++) {
            $(".lx-bar:eq(" + i + ") .lx-bar-counter").text($(".lx-bar:eq(" + i + ")").attr("data-max") + "%");
            $(".lx-bar:eq(" + i + ") .lx-bar-fill").css("width", $(".lx-bar:eq(" + i + ")").attr("data-max") + "%");
        }
    }
    // Set Current Section
    for (var i = 0; i < $(".lx-blocs").length; i++) {
        if ($(this).scrollTop() > $(".lx-blocs:eq(" + i + ")").offset().top) {
            $(".lx-main-menu ul li a").removeClass("active");
            $(".lx-main-menu ul li a[data-title='" + $(".lx-blocs:eq(" + i + ")").attr('class').split(' ')[0] + "']").addClass("active");
            $(".lx-current-section-item").css({
                "opacity": "0.3",
                "transform": "scale(0.5)"
            });
            $(".lx-current-section-item[data-section='" + $(".lx-blocs:eq(" + i + ")").attr('class').split(' ')[0] + "']").css({
                "opacity": "1.0",
                "transform": "scale(1.0)"
            });
        }
    }
    return false;
});

// Responsive menu event
$(".lx-main-menu > i").on("click", function() {
    if (menu.css("left") === "-40px") {
        menu.css("left", "0px");
        $(".lx-main-menu > i").attr("class", "fa fa-remove");
        socialMedia.css("right", "-40px");
        $(".lx-social-media > i").attr("class", "fa fa-share-alt");
        settings.css("left", "-111px");
    } else {
        menu.css("left", "-40px");
        $(".lx-main-menu > i").attr("class", "fa fa-bars");
    }
    return false;
});

// Responsive social media event
$(".lx-social-media > i").on("click", function() {
    if (socialMedia.css("right") === "-40px") {
        socialMedia.css("right", "0px");
        $(".lx-social-media > i").attr("class", "fa fa-remove");
        menu.css("left", "-40px");
        $(".lx-main-menu > i").attr("class", "fa fa-bars");
        settings.css("left", "-111px");
    } else {
        socialMedia.css("right", "-40px");
        $(".lx-social-media > i").attr("class", "fa fa-share-alt");
    }
    return false;
});

// Responsive color setting event
$(".lx-settings > i").on("click", function() {
    if (settings.css("left") === "-111px") {
        settings.css("left", "0px");
        if ($(window).width() < 769) {
            $(".lx-main-menu > i").attr("class", "fa fa-bars");
            menu.css("left", "-40px");
            $(".lx-social-media > i").attr("class", "fa fa-share-alt");
            socialMedia.css("right", "-40px");
        }
    } else {
        settings.css("left", "-111px");
    }
    return false;
});

// Responsive color event
$(".lx-colors > a").on("click", function() {
    // Change style
    $("link[title='main']").attr("href", "css/" + $(this).attr("data-css-link"));
    return false;
});

// Contact Form Errors
$(".lx-contact form input[type='button']").on("click", function() {
    // Remove all errors
    $(".lx-contact form span").remove();
    $(".lx-contact form input[type='text']").css("border-right", "0px");
    $(".lx-contact form textarea").css("border-right", "0px");
    // Test fullname
    var fullname = $(".lx-contact form input[name='fullname']");
    if (fullname.val() === "") {
        fullname.after("<span>This field must be filled</span>").css("border-right", "3px solid #a94442");
    }
    // Test email
    var email = $(".lx-contact form input[name='email']");
    var patt = /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
    if (!patt.test(email.val())) {
        email.after("<span>Invalid Email</span>").css("border-right", "3px solid #a94442");
    }
    // Test message
    var txtarea = $(".lx-contact form textarea");
    if (txtarea.val() === "") {
        txtarea.after("<span>This field must be filled</span>").css("border-right", "3px solid #a94442");
    }
	
	if($(".lx-contact form span").length == 0){
		var url = "send-contact-form.php?fullname="+fullname.val()+"&email="+email.val()+"&message="+txtarea.val();
		var posting = $.post( url );
		posting.done(function( data ) {
			$(".lx-contact-saved").html(data);	
			$(".lx-contact form input[name='fullname']").val("");
			$(".lx-contact form input[name='email']").val("");
			$(".lx-contact form textarea").val("");
		});	
	}
    return false;
});

// Remove email error
$(".lx-contact form input[name='email']").on("keyup", function() {
    var patt = /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
    if (patt.test($(this).val())) {
        $(this).css("border-right", "0px").next("span").remove();
    }
    return false;
});

// Remove fullname error
$(".lx-contact form input[name='fullname']").on("keyup", function() {
    if ($(this).val() !== "") {
        $(this).css("border-right", "0px").next("span").remove();
    }
    return false;
});

// Remove textarea error
$(".lx-contact form textarea").on("keyup", function() {
    if ($(this).val() !== "") {
        $(this).css("border-right", "0px").next("span").remove();
    }
    return false;
});

// Legal Notice Popup JS
$(".lx-popup-open").on("click",function(){
	$("."+$(this).attr("data-bloc")).css("display","block");
	return false;
});
$(".legal .lx-popup-inside a .fa-remove").click(function() {
    $(".lx-popup").css({"display": "none"});
	return false;
});
$(document).on("keyup", function(e) {
    if (e.keyCode === 27) {
       $(".lx-popup").css({"display": "none"});
    }
	return false;
});