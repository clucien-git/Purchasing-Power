$(document).ready(function(){

                var xmlhttp = new XMLHttpRequest();
				var payments = "26"; // NOTE: Needs to pull data from hybris
                var url = "https://s3.amazonaws.com/platform-extension/widgets/demo/faux_feed.json?jsoncallback=?";

                $.ajax({
                    type: 'GET',
                    url: url,
                    async: false,
                    jsonpCallback: 'jsonCallback',
                    contentType: "application/json",
                    dataType: 'jsonp',
                    success: function(json) {
                        var myArr = json.products;
                        myProducts(myArr);
						myCarousel();
                    },
                    error: function(e) {
                    }
                });


                function myProducts(arr) {
                    var myFeed = "";
                    var i;
                    for(i = 0; i < arr.length; i++) {
                        
                          myFeed += '<div>' + '<a href="https://www.purchasingpower.com/store/p/' + arr[i].sku + '?mobileApp" target="storefront"><img src="' + arr[i].img + '" /></a>' +
                                '<div class="name"><a href="https://www.purchasingpower.com/store/p/' + arr[i].sku + '?mobileApp" target="storefront">' + arr[i].name + '</a></div>' +
                                '<div class="price"> $' + (arr[i].price / payments).toFixed(2) + ' / Payment</div></div>';

                    }
                    document.getElementById("newArrivals").innerHTML = myFeed;

                };
				
                function myCarousel() {	
					if ($(window).width() < 600) {
						$('.products').slick({
							speed: 300,
							slidesToShow: 2,
							slidesToScroll: 2,
							dots: true,
							autoplay: false,
							arrows: false
						});
					}
					else {
						$('.products').slick({
							speed: 300,
							slidesToShow: 4,
							slidesToScroll: 4,
							dots: true,
							autoplay: false,
							arrows: false
						});
					}
	
					truncate();

				};
				
				function truncate() {
                    $('.products .name a').each(function(e){
                        var target = $(this).text();
                        var targetLength = $(this).text().length;                       
                        var shortText = target.slice(0,35);
                        if (targetLength > 35) {
                             $(this).text(shortText + "...");
                        };
                    });


                };

				
				
});