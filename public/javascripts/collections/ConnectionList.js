var ConnectionList = Backbone.Collection.extend({
	url: '/connections',
	model: Connection,
});