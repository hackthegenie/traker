Session.setDefault('list_id', null);


var TodosRouter = Backbone.Router.extend({
routes: {
		":listid": "main"
		},
	main: function (listid) {
							Session.set("list_id", listid);
							}
});

Router = new TodosRouter;


Meteor.startup(function () {
  Backbone.history.start({pushState: true});
});
