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
 * You will need to set you app information here in the object constructor
 */
var User = function() {
	// load the kinvey library
	this.Kinvey = require('kinvey-appc');
	Ti.API.info('kinvey ' + JSON.stringify(this.Kinvey));

	var options = {
		appKey : 'kid1781',
		appSecret : 'c89c700cede4484183a4fc4677ea2602'
	}
	
	if (options.appKey === null || options.appSecret === null) {
		Ti.API.info('ERROR YOU MUST SET KETS IN USER.JS FOR APPLICATION TO FUNCTION');
		return;
	}
	this.Kinvey.init(options);

}
/**
 * login the user, use default user
 */
User.prototype.checkForAccount = function(_callback) {
	// look for credentials stored on device, if no credentials
	// then we should show login screen; else attempt to login

	// get the user credentials
	var userString = Ti.App.Properties.getString('CREDENTIALS');
	if(!userString) {
		_callback && _callback({
			success : false,
			message : "NO_ACCOUNT_EXISTS"
		});
		return;
	}

	// not the best solution, but work for the sample
	var user = JSON.parse(Ti.App.Properties.getString('CREDENTIALS'));
	this.login(user, _callback);
}
/**
 * login the user, use default user
 */
User.prototype.login = function(_user, _callback) {
	var user = new this.Kinvey.User();
	user.login(_user.username, _user.password, {
		success : function(user) {
			// user is now created and logged in.
			Ti.API.info(' user.login ' + JSON.stringify(user));
			_callback && _callback({
				success : true,
				user : user
			});

			// persist the user credentials for next time
			Ti.App.Properties.setString('CREDENTIALS', JSON.stringify(_user));

		},
		error : function(error) {
			Ti.API.info('kinvey error ' + JSON.stringify(error));
			_callback && _callback({
				success : false,
				message : JSON.stringify(error)
			});
		}
	});
}
/**
 * create the user and they should be logged in afterwards
 */
User.prototype.createAccount = function(_user, _callback) {
	var user = new this.Kinvey.User();
	user.create({
		username : _user.username,
		password : _user.password,
		name : _user.name
	}, {
		success : function(user) {
			// user is now created and logged in.
			Ti.API.info(' user.create ' + JSON.stringify(user));
			_callback && _callback({
				success : true,
				user : user
			});

			// persist the user credentials for next time
			Ti.App.Properties.setString('CREDENTIALS', JSON.stringify(_user));

		},
		error : function(error) {
			Ti.API.error('kinvey error ' + JSON.stringify(error));
			Ti.API.error('trying to login in user ' + _username);

			// try to just log the user in
			this.login({
				"username" : _user.username,
				"password" : _user.password
			}, _callback);

		}
	});
}

module.exports.User = User;
