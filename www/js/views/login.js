// <author>Djordje Nedeljkovic</author>
var loginView = PPGenericView.extend({
    populate: function () {
        $(".login-container").height(window.innerHeight);
        var username = store.get("username");
        var password = store.get("password");

        if (store.get("isSuccessLogin")) {
            var isTouchIdChecked = store.get("isTouchIdChecked");
            if (isTouchIdChecked) {
                document.getElementById("touchID").checked = true;
            }
            else {
                document.getElementById("touchID").checked = false;
            }
        }
        else {
            document.getElementById('touchID').checked = true;
        }

        if (store.get("isRememberMyUsername")) {
            if (username) {
                $("#username").val(username);
            }
            if (password) {
                $("#password").val(password);
            }
        }
        if (store.get("isRememberMyUsername")) {
            $("#rememberMe").prop('checked', true);
        } else {
            $("#rememberMe").prop('checked', false);
        }

    },
    events: {
        "click #login": "login",
        "click #forgotPassword": "gotToforgotPassword",
        "click #registration": "goToRegistration",
        "click #rememberMe": "rememberMe"

    },
    rememberMe: function () {
        if ($("#rememberMe").is(":checked")) {
            store.set("isRememberMyUsername", true);
        } else {
            store.set("isRememberMyUsername", false);
        }
    },
    login: function () {
        if ($("#rememberMe").is(":checked")) {
            store.set("isRememberMyUsername", true);
        } else {
            store.set("isRememberMyUsername", false);
        }
        if (store.get("username") != $.trim($("#username").val())) {
        }
        //PPRouter.navigate("main");
        if (document.getElementById('touchID').checked) {
            store.set("isTouchIdChecked", true);
        }
        else {
            store.set("isTouchIdChecked", false);
        }

        var username = $.trim($("#username").val().toLowerCase());
        var password = $.trim($("#password").val());

        if (username) {
            store.set("username", username);
        } else {
            navigator.notification.alert(
                'Please fill your username',
                null,
                'Empty username',
                'OK'
            );
            return;
        }
        if (password) {
            store.set("password", password);
        } else {
            navigator.notification.alert(
                'Please fill your password',
                null,
                'Empty password',
                'OK'
            );
            return;
        }

        //test username and password
        $.serverCall({
            url: PPConfig.serverUrl + '/login.json',
            type: 'GET',
            async: true,
            loaderText: 'logging in...',
            success: function (response) {
                store.set("isSuccessLogin", true);
                store.set('clientPhone',response.clientPhone);
                store.set("userFirstName", response.name);
                store.set("payPeriod", response.payPeriod);
                store.set("userGroup", response.userGroup);

                PPRouter.navigate("home");
            }
        });
    },
    gotToforgotPassword: function () {
        var actionUrl = PPConfig.storeFrontRegistrationUrl + '/pw/request';
        var url = encodeURI(PPConfig.storeFrontLoginUrl + Util.createFastLoginCredentials(actionUrl,"chn=app&scn=login"));
        Util.safariRedirectionAlert(url);
        return false;
        //if(device.platform == "iOS" && parseInt(device.version) < 9) {
        //    navigator.notification.confirm(PPConfig.safariAlertMessage,
        //        function (buttonIndex) {
        //            if (buttonIndex === 1) {
        //                var browser = window.open(url, '_system', 'location=yes');
        //                Util.attachInAppBrowserListeners(browser);
        //                return false;
        //            }
        //        },
        //        'Forgot Password',
        //        ['Ok', 'Cancel']);
        //    //PPRouter.navigate("resetPassword");
        //    return false;
        //}
        //else{
        //    var browser = window.open(url, '_system', 'location=yes');
        //    Util.attachInAppBrowserListeners(browser);
        //    return false;
        //}
    },
    goToRegistration: function () {
        var browser = PPConfig.storeFrontRegistrationUrl;
        Util.safariRedirectionAlert(browser);
        return false;
        //
        //browser.addEventListener('loadstop', function () {
        //    browser.executeScript({
        //        code: "document.getElementById('openRegistration').click();"
        //    });
        //});
    }
});
