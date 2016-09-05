// <author>Djordje Nedeljkovic</author>
var homeView = PPGenericView.extend({
    populate: function () {
        homeView.self = this;
        if (Util.doNotHaveCredentials()) {
            PPRouter.navigate("login");
        }
    //    this.populateBannerAndIcons();
        this.displayRatePopup();

        Util.goToBrowserOnSearch();
        Util.setUpShopPPSubMenu();

        $("#title").text("Hello " + store.get("userFirstName") + "!");
        $("#newArrivals").attr("payFreq",store.get("payPeriod"));
        $("#newArrivals").attr("catalog",store.get("userGroup"));

    },
    events: {
        "click #home": "goToHome",
        "click #item": "bannerClick",
        "click #shop": "goToShop",
        "click #account": "goToAccount",
        "click #upload": "goToUpload",
        "click #order-status": "goToOrderStatus",
        "click #scan-product": "scanProduct",
        "click #about": "goToContactUs",
        "click #signOut": "logout",
//        "click #icon-slot-1": "goToNewArrivals",
//       "click #icon-slot-2": "goToBestSellers",
        "click .externalLinks": "externalLinks",
        "click #newbanners": "newBannerLinkClick",
        "click #homeFurniture": "homeFurnitureAndPatio",
        "click #tvAndEntertainment": "tvAndEntertainment",
        "click #appliances": "appliances",
        "click #fashionAndAccessories": "fashionAndAccessories",
        "click #sports_Fitness_Rec": "sports_Fitness_Rec",
        "click #toys_Baby_Kids": "toys_Baby_Kids",
        "click #luggageAndTravel": "luggageAndTravel",
        "click #healthAndBeauty": "healthAndBeauty",
        "click #autoAndHomeImprovment": "autoAndHomeImprovment",
        "click #education": "education",
        "click #settingMenu": "goTosetting",
        "click #callUs": "goTocall",
    }
    ,
    newBannerLinkClick: function (ev) {
        var href = $(ev.currentTarget).attr("href");
        var url = encodeURI(PPConfig.storeFrontLoginUrl + Util.createFastLoginCredentials(href,"chn=app&scn=home"));
        Util.safariRedirectionAlert(url);
        return false;
    },
    externalLinks: function (ev) {
        var href = $(ev.currentTarget).attr("href");
        var url="";
        if (href.indexOf("http://") > -1 || href.indexOf("https://") > -1) {
            url = href;
        } else {
            var actionUrl = PPConfig.storeFrontImageUrl + '/store' + href;
            url = encodeURI(PPConfig.storeFrontLoginUrl + Util.createFastLoginCredentials(actionUrl,"chn=app&scn=home"));
        }
        Util.safariRedirectionAlert(url);
        return false;
    },
    homeFurnitureAndPatio: function () {
        var actionUrl = PPConfig.storeFrontImageUrl + '/store/All/Home%2C-Furniture-%26-Patio/c/15_home_furniture_patio';
        var url = encodeURI(PPConfig.storeFrontLoginUrl + Util.createFastLoginCredentials(actionUrl,"chn=app&scn=home"));
        Util.safariRedirectionAlert(url);
        return false;
    },//Appliances
    tvAndEntertainment: function () {
        var actionUrl = PPConfig.storeFrontImageUrl + '/store/All/TV-%26-Entertainment/c/15_tventertainment';
        var url = encodeURI(PPConfig.storeFrontLoginUrl + Util.createFastLoginCredentials(actionUrl,"chn=app&scn=home"));
        Util.safariRedirectionAlert(url);
        return false;
    },
    appliances: function () {
        var actionUrl = PPConfig.storeFrontImageUrl + '/store/All/Appliances/c/15_appliances';
        var url = encodeURI(PPConfig.storeFrontLoginUrl + Util.createFastLoginCredentials(actionUrl,"chn=app&scn=home"));
        Util.safariRedirectionAlert(actionUrl);
        return false;
    },
    fashionAndAccessories: function () {
        var actionUrl = PPConfig.storeFrontImageUrl + '/store/All/Fashion-%26-Accessories/c/15_fashion_accessories';
        var url = encodeURI(PPConfig.storeFrontLoginUrl + Util.createFastLoginCredentials(actionUrl,"chn=app&scn=home"));
        Util.safariRedirectionAlert(url);
        return false;
    },
    sports_Fitness_Rec: function () {
        var actionUrl = PPConfig.storeFrontImageUrl + '/store/All/Sports%2C-Fitness-%26-Rec/c/15_fitness';
        var url = encodeURI(PPConfig.storeFrontLoginUrl + Util.createFastLoginCredentials(actionUrl,"chn=app&scn=home"));
        Util.safariRedirectionAlert(url);
        return false;

    },
    toys_Baby_Kids: function () {
        var actionUrl = PPConfig.storeFrontImageUrl + '/store/All/Toys%2C-Baby-%26-Kids/c/15_toys_baby_kids';
        var url = encodeURI(PPConfig.storeFrontLoginUrl + Util.createFastLoginCredentials(actionUrl,"chn=app&scn=home"));
        Util.safariRedirectionAlert(url);
        return false;
    },
    luggageAndTravel: function () {
        var actionUrl = PPConfig.storeFrontImageUrl + '/store/All/Luggage-%26-Travel/c/15_luggage_travel';
        var url = encodeURI(PPConfig.storeFrontLoginUrl + Util.createFastLoginCredentials(actionUrl,"chn=app&scn=home"));
        Util.safariRedirectionAlert(actionUrl);
        return false;
    },
    healthAndBeauty: function () {
        var actionUrl = PPConfig.storeFrontImageUrl + '/store/All/Health-%26-Beauty/c/15_health_beauty';
        var url = encodeURI(PPConfig.storeFrontLoginUrl + Util.createFastLoginCredentials(actionUrl,"chn=app&scn=home"));
        Util.safariRedirectionAlert(url);
        return false;
    },
    autoAndHomeImprovment: function () {
        var actionUrl = PPConfig.storeFrontImageUrl + '/store/All/Auto-%26-Home-Improvement/c/15_auto_home_improvement';
        var url = encodeURI(PPConfig.storeFrontLoginUrl + Util.createFastLoginCredentials(actionUrl,"chn=app&scn=home"));
        Util.safariRedirectionAlert(url);
        return false;
    },
    education: function () {
        var actionUrl = PPConfig.storeFrontImageUrl + '/store/All/-Education/c/15_education';
        var url = encodeURI(PPConfig.storeFrontLoginUrl + Util.createFastLoginCredentials(actionUrl,"chn=app&scn=home"));
        Util.safariRedirectionAlert(url);
        return false;
    },
    bannerClick: function (ev) {
        var actionUrl = encodeURI(PPConfig.storeFrontLoginUrl + Util.createFastLoginCredentials($(ev.currentTarget).attr("data-action"),"chn=app&scn=home"));
        Util.safariRedirectionAlert(actionUrl);
        return false;
    },
    goToShop: function () {
        var url = encodeURI(PPConfig.storeFrontLoginUrl + Util.createFastLoginCredentials());
        Util.attachInAppBrowserListeners(browser);
        return false;
    },
    goToAccount: function () {
        PPRouter.navigate("account");
        return false;
    },
    goToUpload: function () {
        PPRouter.navigate("upload");
        return false;
    },
    goToOrderStatus: function () {
        PPRouter.navigate("orderStatus");
        return false;
    },
    scanProduct: function () {
        cordova.plugins.barcodeScanner.scan(
            function (result) {
                alert("Barcode scanned\n" + "Result: " + result.text + "\n" + "Format: " + result.format + "\n" + "Cancelled: " + result.cancelled);
            },
            function (error) {
                alert("Scanning failed: " + error);
            }
        );
    },
    goToContactUs: function () {
        PPRouter.navigate("contactUs");
        return false;
    },
    goTosetting: function () {
        PPRouter.navigate("settings");
        return false;
    },
    goToHome: function () {
        PPRouter.navigate("home");
        return false;
    },
    logout: function () {
        navigator.notification.confirm('Are you sure you want to log out?',
            function (buttonIndex) {
                if (buttonIndex === 1) {
                    //store.remove('username');
                    //store.remove('password');
                    //store.remove('isSuccessLogin');
                    //store.remove('isTouchIdChecked');
                    //store.remove('search');
                    //store.remove('isRememberMyUsername');
                    //store.remove('isKeepMeSignedIn');
                    store.remove("isLoggedIn");
                    PPRouter.navigate("login");
                }
            },
            'Log Out',
            ['Yes', 'No']);
        return false;
    },
    goToNewArrivals: function () {
//        var actionUrl = PPConfig.storeFrontImageUrl + PPConfig.newArrivalsUrl;
//        var url = encodeURI(PPConfig.storeFrontLoginUrl + Util.createFastLoginCredentials(actionUrl));
//        Util.safariRedirectionAlert(url);
//        return false;

        var actionUrl = PPConfig.storeFrontImageUrl + '/store/p/1736962';
        var url = encodeURI(PPConfig.storeFrontLoginUrl + Util.createFastLoginCredentials(actionUrl,"chn=app&scn=home"));
        Util.safariRedirectionAlert(url);
        return false;
    },
    goToBestSellers: function () {
        var actionUrl = PPConfig.storeFrontImageUrl + PPConfig.goToBestSellers;
        var url = encodeURI(PPConfig.storeFrontLoginUrl + Util.createFastLoginCredentials(actionUrl,"chn=app&scn=home"));
        Util.safariRedirectionAlert(url);
        return false;
    },
    displayRatePopup: function () {
        if (typeof AppRate !== 'undefined') {
            var customLocale = {};
            customLocale.title = "Rate Purchasing Power Mobile";
            customLocale.message = "If you enjoy using Purchasing Power Mobile, would you mind taking a moment to rate it? It won't take more than a minute. Thanks for your support!";
            customLocale.cancelButtonLabel = "No, Thanks";
            customLocale.laterButtonLabel = "Remind Me Later";
            customLocale.rateButtonLabel = "Rate It Now";
            AppRate.preferences.customLocale = customLocale;
            AppRate.preferences.openStoreInApp = true;
            AppRate.preferences.storeAppURL.ios = '934544219';
            AppRate.preferences.storeAppURL.android = 'market://details?id=com.purchasingpower.mobile';
            AppRate.preferences.displayAppName = 'Purchasing Power Mobile';
            AppRate.preferences.usesUntilPrompt = 5;
            AppRate.preferences.promptAgainForEachNewVersion = false;
            AppRate.promptForRating();
        }
        return false;
    },
    populateBannerAndIcons: function () {
        var fillCarousel = true;
        if (typeof homeView.self.bannerResponse !== 'undefined') {
            homeView.self.fillCarouselAndIcons(homeView.self.bannerResponse);
            fillCarousel = false;
        }
        $.serverCall({
            url: PPConfig.serverUrl + '/get-home-banners.json',
            type: 'GET',
            async: true,
            noLoader: true,
            success: function (response) {
                var responseString = JSON.stringify(response);
                if (homeView.self.bannerResponseString !== responseString) {
                    homeView.self.bannerResponseString = responseString;
                    homeView.self.bannerResponse = response;
                    if (fillCarousel) {
                        homeView.self.fillCarouselAndIcons(response);
                    }
                }
            }
        });
        return false;
    },
    fillCarouselAndIcons: function (response) {
        if (response && response.banners) {
            $("#carousel").empty();
            $.each(response.banners, function () {
                $("#carousel").append("<div class='item' id='item' data-action='" + this.actionUrl + "'><img class='lazyOwl' src='" + this.imageUrl + "'></div");
            });
            $("#carousel").owlCarousel({
                navigation: false,
                slideSpeed: 300,
                paginationSpeed: 400,
                singleItem: true,
                autoPlay: PPConfig.mainCarouselSpeed
            });
        }
        PPConfig.slot1text = undefined;
        PPConfig.slot1action = undefined;
        PPConfig.slot2text = undefined;
        PPConfig.slot2action = undefined;
        if (response && response.icons) {
            $.each(response.icons, function () {
                if (this.name === 'slot1') {
                    PPConfig.slot1text = this.displayText;
                    PPConfig.slot1action = this.actionUrl;
                    PPConfig.slot1image = this.imageUrl;
                } else if (this.name === 'slot2') {
                    PPConfig.slot2text = this.displayText;
                    PPConfig.slot2action = this.actionUrl;
                    PPConfig.slot2image = this.imageUrl;
                }
            });
            //Util.setupIconSlots();
        }
        return false;
    },
    goTocall: function () {
        navigator.notification.confirm('Are you sure you want to Call this number?',
            function (buttonIndex) {
                if (buttonIndex === 1) {
                    var browser = open('tel:' + store.get('clientPhone'), '_system');
                    Util.attachInAppBrowserListeners(browser);

                }
            },
            store.get('clientPhone'),
            ['Yes', 'No']);
        return false;
    }
});
