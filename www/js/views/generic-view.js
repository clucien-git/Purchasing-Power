// <author>Djordje Nedeljkovic</author>
var PPGenericView = Backbone.View.extend({
	render: function() {
		$(this.el).html(PPView.getTemplate(this.options.htmlTemplate));
		this.populate();
		$(this.el).trigger( 'create' );
		FastClick.attach(this.el);
		return this;
	},
	// function to override
	populate: function() {}
});
