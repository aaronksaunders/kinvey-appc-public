function TodoTableView() {
	//load dependencies
	var TodoCollection = require('model/TodoCollection').TodoCollection;
	var Todo = require('model/TodoCollection').Todo;

	//create object instance
	var self = Ti.UI.createTableView({
		data : [{
			title : 'Loading Data...'
		}]
	});

	/**
	 *  used as an event callback, and a method to update the table
	 */
	function loadData(options) {

		var tableData = [];

		var collection = new TodoCollection(options.queryType || "ALL").fetch({
			success : function(list) {
				// Nice! Everything went smoothly.
				Ti.API.info('loadData success ' + JSON.stringify(list));

				// populate table
				for(var i = 0, l = list.length; i < l; i++) {
					var todo = list[i].attr;
					tableData.push({
						title : todo.text,
						hasCheck : todo.done,
						todoObject : list[i] // save kinvey object for later
					});
				}
				self.setData(tableData);
			},
			error : function(error) {
				Ti.API.info('loadData error ' + JSON.stringify(error));
			}
		});

	}

	//
	// toggle done state of todo item on click based on the click
	// event, and then fire an event to update the table
	//
	self.addEventListener('click', function(e) {

		// get kinvey object
		var todo = e.rowData.todoObject;

		// toggle the done value when a user clicks on it
		todo.set("done", todo.get("done") == 0 ? true : false);

		// save the object, the save will update since object
		// already exists
		todo.save({
			success : function(response) {
				// Nice! Everything went smoothly.
				Ti.API.info('todo saved ' + JSON.stringify(response));

				// clean up ui, fire event to update table
				self.fireEvent('todoSaved');
			},
			error : function(error) {
				Ti.API.error('kinvey error ' + JSON.stringify(error));
			}
		});

		//update row UI
		e.row.hasCheck = todo.get("done");

	});
	//reload data when we're told that it has changed
	self.addEventListener('todosUpdated', loadData);

	return self;
}

module.exports = TodoTableView;
