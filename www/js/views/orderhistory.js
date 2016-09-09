// <author>Djordje Nedeljkovic</author>
var orderStatusView = PPGenericView.extend({
    populate: function () {
        orderStatusView.self = this;
        if (Util.doNotHaveCredentials()) {
            PPRouter.navigate("login");
            return;
        }
        Util.setUpShopPPSubMenu();
        //Util.setupIconSlots();
        $("#noOrders").hide();
        $.serverCall({
            url: PPConfig.serverUrl + '/v2/get-orders.json',
            type: 'GET',
            async: true,
            loaderText: 'loading orders...',
            success: function (response) {
                if (response && response.orders) {
                    if (response.orders.length > 0) {
						var actionclass=0;
                        $("#orderHolder").empty();
                        $.each(response.orders, function () {
                            orderStatusView.self.addOrder(this,actionclass);
							actionclass=actionclass+1;
                        });
                    }
                    else
                    {
                        $("#noOrders").show();

                    }
                }
            }
        });
        _satellite.track('mobile order status');
        Util.goToBrowserOnSearch();
    },
    events: {
        "click #order-details": "showOrderDetails",
        "click #home": "goToHome"
    },
    goToHome: function () {
        PPRouter.navigate("home");
    },
    showOrderDetails: function (e) {
        var orderId = $(e.target).closest(".order-holder").find("#order-number").text();
		PPRouter.navigate("orderDetails-"+orderId);
        return false;
    },
    addOrder: function (order,actionclass) {
        var orderElement = $("#order-template").clone().show();

        if(order.orderStatus=='Customer Action Required'){
            orderElement.find("#alert").css("display","block");
        }
        else{
            orderElement.find("#alert").css("display","none");
        }
		orderElement.find("#order-number").text(order.orderNumber);
        orderElement.find(".order-status").text(order.orderStatus);
        orderElement.find("#order-date").text(order.placedDate);
        orderElement.find("#order-total-price").text(order.totalPriceIncludingTax).formatCurrency();
        $("#orderHolder").append(orderElement);
    }
});
