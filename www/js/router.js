// <author>Djordje Nedeljkovic</author>
var PPRouter = Backbone.Router.extend({
	navigate: function(fragment, options) {
		$('#menu,#menuOverlay').attr('active',false);
		Backbone.history.navigate(fragment, typeof options === 'undefined' ? true : options);
	},

	routes: {
		'home': 'showHome',
		'account': 'showAccount',
		'upload': 'showUpload',
		'orderStatus':'showOrderStatus',
		'orderDetails-:orderId':'showOrderDetails',
		'contactUs':'showContactUs',
		'resetPassword':'showResetPassword',
		'registration':'showRegistration',
        'settings':'showSettings',
		// Default
		'*actions': 'defaultAction'
	},
	showHome: function() {
		PPView.getView('home').render();
	},
	showAccount: function() {
		PPView.getView('account').render();
	},
	showUpload: function() {
		PPView.getView('upload').render();
	},
	showOrderStatus: function() {
		PPView.getView('orderStatus').render();
	},
	showOrderDetails: function(orderId) {
		var view = PPView.getView('orderDetails');
		view.orderId = orderId;
		view.render();
	},
	showContactUs: function() {
		PPView.getView('contactUs').render();
	},
	showResetPassword: function() {
		PPView.getView('resetPassword').render();
	},
	showRegistration: function() {
		PPView.getView('registration').render();
	},
    showSettings: function() {
        PPView.getView('settings').render();
    },
	defaultAction: function(actions) {
		// We have no matching route, lets display the home page
		PPView.getView('login').render();
	}
});
