// <author>Djordje Nedeljkovic</author>
var resetPasswordView = PPGenericView.extend({
    populate: function () {
        resetPasswordView.self = this;
    },
    events: {
        "click #back-button": "goToLogin",
        "click #resetPassword": "resetPassword"
    },
    goToLogin: function () {

        PPRouter.navigate("login");
    },
    resetPassword: function () {
        $.serverCall({
            url: PPConfig.serverUrl + '/reset-password.json',
            type: 'POST',
            data: {
                email: $("#email").val()
            },
            loaderText: 'Reseting password...',
            success: function (response) {
                if (eval(response.success)) {
                    navigator.notification.alert(
                        'An email has been sent. If you do not receive it within 15 minutes, please check your spam folder, then retry or call Customer Care at 1-888-923-6236 for assistance.',
                        null,
                        'Forgot Username/Password',
                        'OK'
                    );
                } else {
                    navigator.notification.alert(
                        'The email address you entered is not recognized. Please try again.',
                        null,
                        'Forgot Username/Password',
                        'OK'
                    );
                }
            }
        });
    }
});
