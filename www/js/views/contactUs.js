var contactUsView = PPGenericView.extend({
    populate: function () {
        if (Util.doNotHaveCredentials()) {
            PPRouter.navigate("login");
            return;
        }
        contactUsView.self = this;
        Util.setUpShopPPSubMenu();
        //Util.setupIconSlots();
        $("#year").text(new Date().getFullYear());

        if (typeof cordova !== 'undefined') {
            cordova.getAppVersion().then(function (version) {
                $("#app-version").text("" + version);
            });
        }

        _satellite.track('mobile Contact Us');
    },
    events: {
        "click #home": "goToHome",
        "click #sendMessage": "sendMessage"
    },

    goToHome: function () {
        PPRouter.navigate("home");
    },
    sendMessage: function () {

        var message = $.trim($("#messageId").val());
        var topic = $.trim($("#topicId").val());

        if (message.length == 0) {

            navigator.notification.alert(
                'Please type your message',
                null,
                'Message is blank',
                'OK'
            );
            return;
        }
        if (topic.length == 0) {
            navigator.notification.alert(
                'Please Select a Topic',
                null,
                'Topic not selected',
                'OK'
            );
            return;
        }

//        var  formData = "subject="+topic+"&message=" + message;
        $.serverCall({
            url: PPConfig.serverUrl + '/contactUs.json',
            type: 'POST',
            data: {
                subject: topic,
                message:message
            },
            loaderText: 'sending message ...',
            success: function (response) {
                PPRouter.navigate("home");
                navigator.notification.alert(
                    'Message successfully sent',
                    null,
                    'Message sent',
                    'OK'
                );

                return false;

            },
            error: function (e) {
                navigator.notification.alert(
                    'Error sending an email',
                    null,
                    e,
                    'OK'
                );
            }
        });

        return false;
    },
    learnMore: function () {
        var browser = window.open('https://www.purchasingpower.com/about-purchasing-power', '_system', 'location=yes');
        Util.attachInAppBrowserListeners(browser);
    }
});
