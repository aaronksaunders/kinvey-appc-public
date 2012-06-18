/**
 * Aaron K. Saunders
 *
 * Clearly Innovative Inc
 *
 * http://www.clearlyinnovative.com
 * http://blog.clearlyinnovative.com
 *
 * This is sample code creating a todo object and a todo-collection to be used
 * in an upcoming blog post utilizing Kinvey and Appcelerator
 *
 *
 * You need an account with Kinvey to run this application; please sign up here
 *
 * https://console.kinvey.com/#signup
 *
 * You will then need to update the User.js file to include your own
 * Kinvey application credentials
 *
 * <code>
 *	this.Kinvey.init({
 *		appKey : 'YOUR-APP-KEY',
 *		appSecret : 'YOUR-SECRET'
 *	});
 *	</code>
 *
 * The application also assumes a default User, John Doe, if you look in
 * User.js you will see that the test account is created in the application
 *
 * The account is created in ApplicationWindows.js
 *
 * <code>
 * 	var user = new User();
 *	user.login({
 *		"username" : "JohnDoe",
 *		"password" : "password"
 *	}, function() {
 *		todoList.fireEvent('todosUpdated');
 *	});
 *	</code>
 *
 * */

if(true) {
	var ApplicationWindow = require('ui/ApplicationWindow');
	new ApplicationWindow().open();
} else {
	// run test.js
}
