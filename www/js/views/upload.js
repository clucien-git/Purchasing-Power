// <author>Djordje Nedeljkovic</author>
var uploadView = PPGenericView.extend({
    populate: function () {
        uploadView.self = this;
        if (Util.doNotHaveCredentials()) {
            PPRouter.navigate("login");
            return;
        }
        Util.setUpShopPPSubMenu();
        //Util.setupIconSlots();
        $.serverCall({
            url: PPConfig.serverUrl + '/upload.json',
            type: 'GET',
            async: true,
            loaderText: 'retrieving documents...',
            success: function (response) {
                uploadView.self.fillData(response);
            }
        });
        _satellite.track('mobile upload');
        $(".upload-document-holders").text('');
    },
    events: {
        "click .upload-document-holder": "upload",
        "click #home": "goToHome"
    },

    upload: function (ev) {
        var selectedUpload = $(ev.currentTarget);
        var captureError = function (error) {
            if (error === 'has no access to assets' || error === 'Camera cancelled.') {
                //do not display message in case of cancel camera callback
                return;
            } else {
                navigator.notification.alert(
                    error,
                    null,
                    'Camera Error',
                    'OK'
                );
            }
        }
        var captureSuccess = function (imageURI) {
            $.serverCall({
                url: PPConfig.serverUrl + '/upload-get-token.json',
                type: 'GET',
                async: true,
                success: function (response) {
                    if (response) {
                        try {
                            var options = new FileUploadOptions();
                            options.fileKey = "file";
                            options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
                            options.mimeType = "image/jpeg";
                            options.chunkedMode = false;
                            options.httpMethod = 'POST';

                            var params = {};
                            params.from = store.get("username");
                            params.subject = "UPLOAD",
                                params.orderNumber = selectedUpload.attr("id");
                            params.customerNumber = uploadView.self.customerId;
                            options.params = params;

                            var uploadSuccess = function (r) {
                                var docName = selectedUpload.find(".upload-document-name").text() || 'document';
                                navigator.notification.alert(
                                    'Your ' + docName + ' has been successfully uploaded and received. Once the document is processed by our team, the status of your order will be updated.',
                                    null,
                                    'Upload Successful',
                                    'OK'
                                );
                                _satellite.track('mobile upload success');
                            }
                            var uploadError = function (error) {
                                navigator.notification.alert(
                                    'An unexpected error has occurred when trying to upload your document. Please try again later.',
                                    null,
                                    'Upload Error',
                                    'OK'
                                );
                            }
                            var ft = new FileTransfer();
                            ft.upload(imageURI, encodeURI(PPConfig.docUploadLink + response.token), uploadSuccess, uploadError, options);
                        } catch (err) {
                            navigator.notification.alert(
                                'An unexpected error has occurred when trying to upload your document. Please try again later.',
                                null,
                                'Upload Error',
                                'OK'
                            );
                        }
                    }
                }
            });
        }

        navigator.notification.confirm('Please choose upload method',
            function (buttonIndex) {
                if (buttonIndex === 1) {
                    PPConfig.cameraOptions.sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
                    navigator.camera.getPicture(captureSuccess, captureError, PPConfig.cameraOptions);
                } else if (buttonIndex === 2) {
                    PPConfig.cameraOptions.sourceType = Camera.PictureSourceType.CAMERA;
                    navigator.camera.getPicture(captureSuccess, captureError, PPConfig.cameraOptions);
                }
            },
            'Upload document',
            ['Choose Photo from Gallery', 'Take Photo', 'Cancel']);
        return false;
    },
    fillData: function (response) {
        var docs = response.docs;
        if (docs) {
            var docLength = docs.length;
            if (docLength > 0) {
                var docHolder = $("#upload-holder");
                docHolder.empty();
                for (var i = 0; i < docLength; i++) {
                    var doc = docs[i];
                    var docEl = $("#upload-document-template").clone().attr("id", doc.orderNumber).show();
                    docEl.find(".upload-document-ordernumber").text(doc.orderNumber);
                    docEl.find(".upload-document-name").text(doc.name);
                    var statusText = "";
                    var statusColor = "";
                    if (doc.status === "VALID") {
                        statusText = "Approved";
                        statusColor = "green";
                    } else if (doc.status === "NOT_VALID") {
                        statusText = "Error";
                        statusColor = "red";
                    } else {
                        statusText = "Not Received";
                        statusColor = "red";
                    }
                    docEl.find(".upload-document-status").text(statusText).css("color", statusColor);
                    docHolder.append(docEl);
                }
            }
            else
            {
                $(".upload-document-holders").text('No pending documents');

            }
        }
        uploadView.self.customerId = response.customerId;
    },
    goToHome: function () {
        PPRouter.navigate("home");
    }
});
