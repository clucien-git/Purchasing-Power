$(function() {
	PPRouter = new PPRouter;
	Backbone.history.start();
	document.addEventListener("backbutton", function(e) {
		e.preventDefault();
		if (!Backbone.history.fragment || Backbone.history.fragment === 'home' || Backbone.history.fragment === 'login') {
			navigator.notification.confirm( 'Are you sure you want to exit application?',
					function(buttonIndex) {
						if (buttonIndex === 1){
							navigator.app.exitApp();
						}
					}, 
					'Exit Application', 
					['Yes', 'No']);
		} else {
			navigator.app.backHistory();
		}
	}, false); 
	document.addEventListener("offline", function(e) {
		e.stopPropagation();
		navigator.notification.alert(
				'Internet connection lost. This application requires internet. Please connect to the internet.',
				null,
				'No internet connection',
				'OK'
		);	
	}, false);
});
