// <author>Djordje Nedeljkovic</author>
var registrationView = PPGenericView.extend({
	populate: function() {
		registrationView.self = this;
	},
	events: {
		"click #back-button": "goToLogin",
		"click #register": "register"
	},
	goToLogin: function() {
		PPRouter.navigate("login");
	},
	register: function() {
	}
});
