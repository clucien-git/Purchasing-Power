/**
 * Created by bobby on 11/5/15.
 */
$(document).ready(function(){

    var xmlhttp = new XMLHttpRequest();
    var url = "https://s3.amazonaws.com/ppc-mobile-app-2/home/slot1/list.json?jsoncallback=";

    $.ajax({
        type: 'GET',
        url: url,
        async: false,
        jsonpCallback: 'jsonCallback',
        contentType: "application/json",
        dataType: 'jsonp',
        success: function(json) {
            var myArr = json.image_list;
            myBanners(myArr);
            bannerCarousel();
        },
        error: function(e) {
            console.log(e);
        }
    });


    function myBanners(arr) {
        var myFeed = "";
        var i;
        for(i = 0; i < arr.length; i++) {
            myFeed += '<div><a href="' + arr[i].image_link + '&chn=app&scn=home&pe=hero" target="storefront"><img src="https://s3.amazonaws.com/ppc-mobile-app-2/home/slot1/' + arr[i].image_url + '" /></a></div>';
            console.log(myFeed);
        }
        document.getElementById("heroBanners").innerHTML = myFeed;
    };



    function bannerCarousel() {
        $('#heroBanners').slick({
            speed: 600,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            autoplay: true,
            autoplaySpeed: 5200,
            arrows: false
        });
    };

});