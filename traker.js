list = new Meteor.Collection("List");
tracker = new Meteor.Collection("Tracker");


if (Meteor.isClient) {
}


if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  
});
}
