function ApplicationWindow() {
	//load dependencies
	var TodoFormView = require('ui/TodoFormView'), TodoTableView = require('ui/TodoTableView');
	var User = require('model/User').User;

	//create object instance
	var self = Ti.UI.createWindow({
		backgroundColor : 'white',
		exitOnClose : true,
		layout : 'vertical'
	});

	//construct UI
	var todoForm = new TodoFormView();
	todoForm.top = 0;
	self.add(todoForm);

	// add toolbar
	var todoSearch = Ti.UI.createTabbedBar({
		style : Titanium.UI.iPhone.SystemButtonStyle.BAR,
		labels : ['ALL', 'OPEN', 'DONE'],
		height : 35,
		width : 320,
	});
	todoSearch.addEventListener('click', function(e) {
		switch(e.index) {
			case 0:
				todoList.fireEvent('todosUpdated', {
					queryType : require('model/TodoCollection').TodoCollection.ALL
				});
				break;
			case 1:
				todoList.fireEvent('todosUpdated', {
					queryType : require('model/TodoCollection').TodoCollection.OPEN
				});
				break;
			case 2:
				todoList.fireEvent('todosUpdated', {
					queryType : require('model/TodoCollection').TodoCollection.DONE
				});

				break;
		}

	});

	self.add(todoSearch);
	todoSearch.setIndex(0);

	var todoList = new TodoTableView();
	todoList.top = 1;
	self.add(todoList);

	//
	// initialize with test user
	//
	var user = new User();
	user.login({
		"username" : "JohnDoe",
		"password" : "password"
	}, function() {
		todoList.fireEvent('todosUpdated');
	});

	//add behavior
	todoForm.addEventListener('todoSaved', function() {
		todoList.fireEvent('todosUpdated');
	});

	// PRIVATE

	//return instance from constructor
	return self;
}

module.exports = ApplicationWindow;
