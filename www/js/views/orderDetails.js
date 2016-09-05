// <author>Djordje Nedeljkovic</author>
var orderDetailsView = PPGenericView.extend({
        populate: function () {
            orderDetailsView.self = this;
            if (Util.doNotHaveCredentials()) {
                PPRouter.navigate("login");
                return;
            }
            Util.setUpShopPPSubMenu();
            //Util.setupIconSlots();
            $.serverCall({
                url: PPConfig.serverUrl + '/v2/get-order-details.json',
                data: {
                    orderId: orderDetailsView.self.orderId
                    },
                type: 'GET',
                async: true,
                loaderText: 'loading order details...',
                success: function (response) {
                    if (response) {
                        orderDetailsView.self.fillOrderDetails(response);
                        }
                }
            });

            if (device.platform == 'Android') {
                var backButton = document.getElementById('back-button-order-details');
                backButton.style.display = 'none';
            }
        },
        events: {
            "click #back-button-order-details": "goToOrderStatus",
            "click #home": "goTohome",
            "click #senddocumentsnow": "goToUpload",
            "click #setupAllotment": "setupAllotment",
            "click #tracking": "trackShipping",
            "click #returnLink": "returnLink"
        },
        returnLink: function (ev) {
            var url = encodeURI($(ev.currentTarget).attr("href"));
            Util.safariRedirectionAlert(url);
            return false;
        },
        trackShipping: function (ev) {
            var url = encodeURI($(ev.currentTarget).attr("href"));
            Util.safariRedirectionAlert(url);
            return false;
        },
        setupAllotment: function () {
            var url = encodeURI(PPConfig.storeFrontLoginUrl + Util.createFastLoginCredentials(PPConfig.setupAllotment,"chn=app&scn=orderDetails"));
            Util.safariRedirectionAlert(url);
            return false;
        },
        goTohome: function () {
            PPRouter.navigate("home");
        },
        goToUpload: function () {
            PPRouter.navigate("upload");
            return false;
        },
        goToOrderStatus: function () {
            PPRouter.navigate("orderStatus");
        },
        fillOrderDetails: function (response) {
            if (response.orderDetails.order.orderStatus == 'Customer Action Required') {
                $("#alertBlock").css("display", "block");
            } else {
                $("#alertBlock").css("display", "none");
            }
            $("#order-number").text(response.orderDetails.order.orderNumber);
            $("#order-price-per-payment").text(response.orderDetails.order.pricePerPayment).formatCurrency();
            $(".order-status").text(response.orderDetails.order.orderStatus);
            $("#order-date").text(response.orderDetails.order.placedDate);
            if (response.orderDetails.order.orderStatus == "Processing Error") {
                $("#orderStatus").text("Processing");
            }else{
                $("#orderStatus").text(response.orderDetails.order.orderStatus);
            }


            /**
             * Generate the HTML to append
             */
            $("#moreDetails").append('<dt>Subtotal</dt><dd class="order-subtotal" id="order-subtotal">' + response.orderDetails.order.subTotal + '</dd>');
            $("#order-subtotal").formatCurrency();

            $("#moreDetails").append('<dt>Shipping &amp; Handling</dt><dd class="order-shipping-handling" id="order-shipping-handling">' + response.orderDetails.order.deliveryCost + '</dd>');
            $("#order-shipping-handling").formatCurrency();

            $("#moreDetails").append('<dt>Sales Tax</dt><dd class="order-sales-tax" id="order-sales-tax">' + response.orderDetails.order.totalTax + '</dd>');
            $("#order-sales-tax").formatCurrency();

            if (response.orderDetails.order.shippingDiscount > 0) {
                $("#moreDetails").append('<dt>Shipping Discount</dt><dd class="number-of-payments" id="shippingDiscount">-' + response.orderDetails.order.shippingDiscount + '</dd>');
                $("#shippingDiscount").formatCurrency();
            }

            if (response.orderDetails.order.promotionalDiscount > 0) {
                $("#moreDetails").append('<dt>Promo Code Savings</dt><dd class="number-of-payments" id="promotionalDiscount">-' + response.orderDetails.order.promotionalDiscount + '</dd>');
                $("#promotionalDiscount").formatCurrency();
            }
            if (response.orderDetails.order.rewardsDiscount > 0) {
                $("#moreDetails").append('<dt>Reward Discount</dt><dd class="number-of-payments" id="rewardsDiscount">-' + response.orderDetails.order.rewardsDiscount + '</dd>');
                $("#rewardsDiscount").formatCurrency();
            }

            /**
             * Fees
             */
            if (response.orderDetails.order.fees.length > 0) {

                $.each(response.orderDetails.order.fees, function (i, feeitem) {
                    $("#moreDetails").append('<dt>' + feeitem.description + '</dt><dd class="number-of-payments" id="order-fees'+i+'">' + feeitem.amount + '</dd>');
                    $("#order-fees"+i).formatCurrency();
                });
            }

            if (response.orderDetails.order.downpaymentAmount > 0) {
                $("#moreDetails").append('<dt>Down Payment</dt><dd class="number-of-payments" id="downpaymentAmount">-' + response.orderDetails.order.downpaymentAmount + '</dd>');
                $("#downpaymentAmount").formatCurrency();

            }


            $("#moreDetails2").append('<dt>Price / Payment</dt><dd class="price-per-payment" id="pricePerPayment">' + response.orderDetails.order.pricePerPayment + '</dd>');
            $("#pricePerPayment").formatCurrency();
            $("#moreDetails2").append('<dt>Number of Payments</dt><dd class="number-of-payments" id="number-of-payments">' + response.orderDetails.order.numberOfPayments + '</dd>');
            $("#moreDetails2").append('<dt>Total</dt><dd class="order-total" id="order-total">' + response.orderDetails.order.totalPriceIncludingTax + '</dd>');


            $("#order-total").formatCurrency();

            if (response.orderDetails.order.orderBalance) {
                $("#orderBalance").text(response.orderDetails.order.orderBalance).formatCurrency();
            }
            if (response.orderDetails.supportingDocuments) {
                $.each(response.orderDetails.supportingDocuments, function () {
                    orderDetailsView.self.addSupportingDocument(this);
                });
            }
            if (response.orderDetails.consignments) {
                $.each(response.orderDetails.consignments, function () {
                    orderDetailsView.self.addShippingInfo(this);
                });
            }
            if (response.orderDetails.items) {
                $.each(response.orderDetails.items, function () {
                    if(this.itemReturnable){
                        var orderDetailURLwithOrderId  = PPConfig.orderdetails.replace("{ORDERID}", response.orderDetails.order.orderNumber);
                        var urlToOrderDetailsPageWithFastLogin = encodeURI(PPConfig.storeFrontLoginUrl + Util.createFastLoginCredentials(orderDetailURLwithOrderId,"chn=app&scn=orderDetails"));
                        $("#returnLink").html('<a href="#" target="storefront" class="options link">Return Order</a>');
                        $("#returnLink").attr('href', urlToOrderDetailsPageWithFastLogin);
                    }
                    orderDetailsView.self.addOrderItems(this, response);
                });
            }

        },
        addSupportingDocument: function (doc) {
            var docEl = $("#order-document-template").clone().show();
            docEl.find(".doc-name").text(doc.name + ':');
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
            docEl.find(".doc-status").text(statusText).css("color", statusColor);
            $("#documents-holder").append(docEl);
        },
        addShippingInfo: function (consignment) {
            var consignmentEl = $("#order-consignment-template").clone().show();
            if (consignment.carrier) {
                consignmentEl.find(".consignment-carrier").text(consignment.carrier);

            }
            if (consignment.trackingNumber) {
                consignmentEl.find(".consignment-tracking-number").text(consignment.trackingNumber);

            }
            $("#shipping-holder").append(consignmentEl);
        },
        addOrderItems: function (item, response) {
            var itemEl = $("#order-item-template").clone().show();
            itemEl.find(".item-name").text(item.name);
            itemEl.find(".item-quantity").text(item.quantity);
//            itemEl.find(".item-price").text(item.priceTotal).formatCurrency();
            itemEl.find("#paymentTotal").text(item.priceTotal).formatCurrency();
            itemEl.find("#perpaymentTotal").text(item.pricePerPayment).formatCurrency();

            if (response.orderDetails.order.orderStatus == "Cancelled") {
                $('#order-item-Status').text('Cancelled');
            } else if (item.returnStatus != null && item.returnStatus != 'NORETURN') {
                itemEl.find("#returnStatus").text(item.returnStatus);
            }
            else {
                itemEl.find("#returnStatus").text('');
                if (item.consignment) {
                    itemEl.find("#shipping").text('Shipped via ' + item.consignment.carrier + ':');
                    itemEl.find("#tracking").attr('href', item.consignment.trackingurl).text(item.consignment.trackingNumber);
                }else{
                    itemEl.find("#shipping").text('');
                    itemEl.find("#tracking").text('');
                }
            }

            var imageUrl = item.imageUrl;
            if (imageUrl) {
                if (!/^(f|ht)tps?:\/\//i.test(imageUrl)) {
                    imageUrl = PPConfig.storeFrontImageUrl + imageUrl;
                }
                itemEl.find("img").attr("src", imageUrl);
            }
            $("#items-holder").append(itemEl);
        }
    })
    ;
