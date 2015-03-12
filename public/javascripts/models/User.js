var User = Backbone.Model.extend({
	initialize: function(){
		this.set("connections", new ConnectionList());
	}
});