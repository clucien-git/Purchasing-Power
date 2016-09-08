(function ($) {
    $.extend($, {
        serverCall: function (options) {
            options.data = options.data || {};

            if (!options.noLoader) {
                options.beforeSend = function () {
                    Util.showLoader(options.loaderText || '');
                };
            }
            var complete = options.complete;
            options.complete = function (data) {
                try {
                    if (typeof(complete) == "function") {
                        complete(data);
                    }
                } catch (e) {
                }
                Util.hideLoader();
            }

            options.dataType = 'json';
            options.cache = false;
            if (options.async) {
                options.async = true;
            } else {
                options.async = false;
            }


            var success = options.success;
            options.success = function (data) {
                try {
                    if (typeof(success) == "function") {
                        success(data);
                    }
                } catch (e) {
                    console.log('exception in handler for ' + options.url);
                    console.log('exception: ' + e);
                }
            }


            //add credentials
            if (store.get('username')) {
                options.url = options.url + '?usr=' + store.get('username') + '&tok=' + Util.makeToken();
                console.log(options.url);

            }

            // error handler;
            // note that this kind of errors are happening due to network failure or server side errors
            // any error handler defined in view is wrapped in this one, so we can clean up stuff
            var errorCallBack = options.error;
            options.error = function (xhr, status, error) {
                if (xhr.status === 401) {
                    navigator.notification.alert(
                        'The email or password you entered is incorrect.',
                        null,
                        'Invalid Credentials',
                        'OK'
                    );

                    //PPRouter.navigate("start");
                } else if (typeof errorCallBack === 'function') {
                    errorCallBack();
                } else {
                    //alert("xhr.status:" + xhr.status + "|status: " + status + "|error:" + error)
                    //Server side error have happened or network failure.
                    navigator.notification.alert(
                        'Sorry, there was a problem connecting to the server. Please try again.',
                        null,
                        'Connection Error',
                        'OK'
                    );

                }
                console.log(error);
                //TODO maybe we could report error to another web service which will log that error
            };

            options.complete = options.complete || function (context, xhr, status) {
                    if (xhr === 'timeout') {
                        console.log('timeout happened!!!');
                    }
                };

            options.timeout = options.timeout || 25000;

            try {
                $.ajax(options);
            } catch (e) {
                console.log('$.ajax exception');
                console.log(e);
            }
        }

    });
})($);
