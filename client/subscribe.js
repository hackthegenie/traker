Meteor.subscribe("List");

Deps.autorun(function () {
	Meteor.subscribe("Tracker", {list_id: Session.get('list_id')});

});
//See if this can be refactored to use Session Equals insetead of Session Get? 
Template.tracker.helper = function () {
var usersID = Meteor.userId();
  return tracker.find({userId: usersID, list_id: Session.get('list_id')}, {sort: {Date: -1}});
};

Template.list.helper = function (){
	var userID = Meteor.userId();
	return list.find({UserId: userID},{sort: {name: 1}});
};

Template.listSelected.helper = function () {
	var selectedList = Session.get("list_id");
  	return list.find({_id: selectedList });
};


Template.listEdit.helper = function (){
	var userID = Meteor.userId();
	return list.find({UserId: userID},{sort: {name: 1}});
};


//!!! Need to re-factor this so that it pulls the default list from the collection, not the selected list. 
Template.listEditContent.selected = function () {  // ok this checks to see if 
    var LISTID = Session.get('list_id');
	return Session.equals('list_id', LISTID) ?  "checked" : '';
  };

