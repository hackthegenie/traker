	
var newList = function(LISTNAME){
	var USERID = Meteor.userId();
//	list.remove({"selected": true});
	

	//list.update({_id: LiveID},{ $unset: { selected: 1 }});
//	list.update{"selected": true},{$unset:{"selected": 1}});
	var listId = list.insert({name: LISTNAME, UserId: USERID});
	Session.set('list_id', listId);
	return;
};	


// Grabs the text from the input and saves it
var logToday = function(){
	
	var list_id = Session.get('list_id');
	var dataTracK = document.getElementById("trackerData").value;console.log('This is the value grabbed from the input field before it is saved: ' + dataTracK + ' & This is what is being passed in as list_id: ' + list_id); 
	var userId = Meteor.userId();
	document.getElementById("trackerData").value =""
	tracker.insert({"Log": dataTracK, "Date": dateToday(), "list_id": list_id, "userId": userId});
};

// Grabs the date today and parses it to make it pretty.  Returns it with a variable for Today
var dateToday = function(){
	
	var today = new Date();
	var curr_date = today.getDate();
    var curr_month = today.getMonth() + 1; //Months are zero based
    var curr_year = today.getFullYear();
    today = (curr_date + "-" + curr_month + "-" + curr_year);
	return today;
	
};

// creates a new list, closes the modal window 

Template.NewList.events({
	'mousedown .btn': function (evt) {
	// preventDefault();	
	var dataList = document.getElementById("listInput").value;console.log('This is the value grabbed from the input field before it is saved: ' + dataList + ' & This is what is being passed in as list_id: '); 
	document.getElementById("listInput").value="New list created";
	newList(dataList);
	$('#myModal').modal('hide')
	evt.preventDefault();
	}
	
});


// delete the Tracker by clicking on the Trash can 
// Debugger to bring up ID = DELETE ONLY TEMPORARY
Template.tracker.events({
	
	'click a.btn': function () { 
	tracker.remove({_id: this._id});		
	},
	'click td': function () {
	console.log('This is the List id this tracker belongs to: ' + (this.list_id) + 'This is the user Id of this record: ' + (this.userId));	
	}
	
});

//click the button to save the log
Template.hero.events({

	'mousedown .btn': function (evt) {
	
	//preventDefault();	
	logToday();
	evt.preventDefault();
	}
	
});


// Double CLick to Enter list Editor
Template.navigation.events({
	'dblclick .btn': function () {
			$("#myModal").modal('show')
								}
});


//Enter the function to remove the default flat & and re-set it to another list. Sets session to This ID too. 
// Delete function  - click the trash to remove the list !!! NEED TO EXTEND TO CHANGE URL IF A DELETED LIST IS ALSO SET AS CURRENT  OR DEFAULT LIST
Template.listEditContent.events({
	'mouseup td input':function(){
		var listID = list.findOne(Session.get("list_id")); // Grabs the players that matches 'selected_player' stored in the session
	   // alert(listID._id);
		list.update({_id: listID._id},{$set: {default: false}});
	//	alert('You entered the input'+ this._id);
		list.update({_id: this._id},{$set: {default: true}});
		Session.set('list_id', this._id);
				},
		'click a.btn': function () { 
		list.remove({_id: this._id});		
		},
});






