var TodoCollection = require('model/TodoCollection').TodoCollection;
var Todo = require('model/TodoCollection').Todo;

function TodoFormView() {
	//load dependencies

	//create object instance
	var self = Ti.UI.createView({
		backgroundColor : '#cdcdcd',
		height : 50
	});

	//construct UI
	var field = Ti.UI.createTextField({
		hintText : "Enter Task Here",
		top : 5,
		left : 5,
		right : 90,
		bottom : 5,
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	self.add(field);

	var button = Ti.UI.createButton({
		right : 5,
		top : 5,
		bottom : 5,
		width : 80,
		title : 'Save'
	});
	self.add(button);

	//add behavior
	button.addEventListener('click', processEvent);
	field.addEventListener('return', processEvent);

	//
	// PRIVATE
	//
	function processEvent(e) {

		var todo = new Todo({
			"text" : field.value,
			"done" : false,
		});

		todo.save({
			success : function(response) {
				// Nice! Everything went smoothly.
				Ti.API.info('todo saved ' + JSON.stringify(response));

				// clean up ui
				self.fireEvent('todoSaved');
				field.blur();
				field.value = "";
			},
			error : function(error) {
				Ti.API.error('kinvey error ' + JSON.stringify(error));
			}
		})

	};

	//return instance from constructor
	return self;
}

module.exports = TodoFormView;
