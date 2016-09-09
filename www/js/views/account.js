// <author>Djordje Nedeljkovic</author>
var accountView = PPGenericView.extend({
    populate: function () {
        accountView.self = this;
        if (Util.doNotHaveCredentials()) {
            PPRouter.navigate("login");
            return;
        }
        Util.setUpShopPPSubMenu();
        //Util.setupIconSlots();
        $.serverCall({
            url: PPConfig.serverUrl + '/v2/account.json',
            type: 'GET',
            async: true,
            loaderText: 'updating account...',
            success: function (response) {
                accountView.self.fillData(response.account);
            }
        });
        _satellite.track('mobile my account');


    },
    events: {
        "click #home": "goToHome",
        "click #viewAccountStatement": "goViewAccountStatement",
        "click #referFriend": "referFriend",
        "click #updateContactInfo": "updateContactInfo",
        "click #updateEmail": "updateEmail",
        "click #updatePassword": "updatePassword"


    },
    fillData: function (response) {
        //spending limit chart
        var avail = response.availableSpendingLimit;
        var tot = response.totalSpendingLimit;
        var bal = tot - avail;
        $("#available-limit").text(avail).formatCurrency({negativeFormat: '-%s%n'});
        $("#current-balance").text(bal).formatCurrency({negativeFormat: '-%s%n'});
        $("#total-limit").text(tot).formatCurrency({negativeFormat: '-%s%n'});

        if (response.maxLimit) {
            //Do nothing
        } else {
            $("#my-account").append('<dt>Purchases Available</dt><dd id="purchases-avaliable">' + response.numberOfRemainingPurchases + '</dd>');
        }

        if (response.myRewardBalance) {
            $("#myRewardedPoint").text(response.myRewardBalance).formatCurrency();
        }
        else {
            $("#myRewardedPoint").hide();
            $("#myRewardsTitle").hide();
            $("#referFriend").hide();
        }
        $("#name").text(response.name);
        if (response.email) {
            var emailArr = $.trim(response.email).split("@");
            var emailtext = emailArr[0] + "@" + emailArr[1].substring(0, 2) + "...";
            $("#email").text(emailtext);
        }
        if (response.phone1TypeName) {
            $('.myAccountPhone').append('<dt id="phoneType1">Phone (' + response.phone1TypeName + ')</dt>');
        }

        if (response.phone1) {
            $('.myAccountPhone').append('<dd id="phoneMobile">' + response.phone1 + '</dd>');
        }


        if (response.phone2TypeName) {
            $('.myAccountPhone').append('<dt id="phoneType2">Phone (' + response.phone2TypeName + ')</dt>');
        }

        if (response.phone2) {
            $('.myAccountPhone').append('<dd id="phoneHome">' + response.phone2 + '</dd>');
        }


//        $("#phoneType1").text("Phone (" + response.phone1TypeName + " )");
//        $("#phoneType2").text("Phone (" + response.phone2TypeName + " )");
//        $("#phoneMobile").text(response.phone1);
//        $("#phoneHome").text(response.phone2);


    },
    goToHome: function () {
        PPRouter.navigate("home");
    },
    goViewAccountStatement: function () {
        var browser = encodeURI(PPConfig.storeFrontLoginUrl + Util.createFastLoginCredentials(PPConfig.viewAccountStatement, "chn=app&scn=account"));
        Util.safariRedirectionAlert(browser);
        return false;
    },
    referFriend: function () {
        var browser = encodeURI(PPConfig.storeFrontLoginUrl + Util.createFastLoginCredentials(PPConfig.storeFrontImageUrl + "/store/my-account", "chn=app&scn=account"));
        Util.safariRedirectionAlert(browser);
        return false;
    },
    updateContactInfo: function () {
        var browser = encodeURI(PPConfig.storeFrontLoginUrl + Util.createFastLoginCredentials(PPConfig.storeFrontImageUrl + "/store/my-account/update-profile", "chn=app&scn=account"));
        Util.safariRedirectionAlert(browser);
        return false;
    },
    updateEmail: function () {
        var browser = encodeURI(PPConfig.storeFrontLoginUrl + Util.createFastLoginCredentials(PPConfig.storeFrontImageUrl + "/store/my-account/update-email", "chn=app&scn=account"));
        Util.safariRedirectionAlert(browser);
        return false;
    },
    updatePassword: function () {
        var browser = encodeURI(PPConfig.storeFrontLoginUrl + Util.createFastLoginCredentials(PPConfig.storeFrontImageUrl + "/store/my-account/update-password", "chn=app&scn=account"));
        Util.safariRedirectionAlert(browser);
        return false;
    }
});
