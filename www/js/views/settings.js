// <author>Djordje Nedeljkovic</author>
var settingsView = PPGenericView.extend({
    populate: function () {
        settingsView.self = this;
        if (typeof cordova !== 'undefined') {
            cordova.getAppVersion().then(function (version) {
                $("#app-version").text("" + version);
            });
        }
        if (store.get("isRememberMyUsername")) {
            $("#rememberMe").prop('checked', true);
        } else {
            $("#rememberMe").prop('checked', false);
        }

        if (store.get("isTouchIdChecked")) {
            $("#touchID").prop('checked', true);
        } else {
            $("#touchID").prop('checked', false);
        }

        if (store.get("isKeepMeSignedIn")) {
            $("#keepMe").prop('checked', true);
        } else {
            $("#keepMe").prop('checked', false);
        }
        Util.setUpShopPPSubMenu();
        //Util.setupIconSlots();
        _satellite.track('mobile Settings');
    },
    events: {
        "click #home": "goToHome",
        "click #rememberMe": "rememberMe",
        "click #touchID": "signInWithTouchID",
        "click #keepMe": "keepMeSignedIn",
        "click #termofUse": "termOfUse",
        "click #privacyPolicy": "privacyPolicy"

    },
    goToLogin: function () {
        PPRouter.navigate("login");
    },
    goToHome: function () {
        PPRouter.navigate("home");
    },
    rememberMe: function () {
        if ($("#rememberMe").is(":checked")) {
            store.set("isRememberMyUsername", true);
        } else {
            store.set("isRememberMyUsername", false);
        }
    },
    signInWithTouchID: function () {
        if ($("#touchID").is(":checked")) {
            store.set("isTouchIdChecked", true);
        } else {
            store.set("isTouchIdChecked", false);
        }
    },
    keepMeSignedIn: function () {
        if ($("#keepMe").is(":checked")) {
            store.set("isKeepMeSignedIn", true);
        } else {
            store.set("isKeepMeSignedIn", false);
        }
    },
    termOfUse: function () {
        var url = 'https://www.purchasingpower.com/terms-and-conditions';
        Util.safariRedirectionAlert(url);
        return false;
    },
    privacyPolicy: function () {
        var url = 'https://www.purchasingpower.com/privacy-policy';
        Util.safariRedirectionAlert(url);
        return false;
    },
    endUserAggrement: function () {
        var url = 'https://www.purchasingpower.com/how-it-works';
        Util.safariRedirectionAlert(url);
        return false;
    }
    });

