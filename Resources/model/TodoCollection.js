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
 */
// Appcelerator specific module
var Kinvey = require('kinvey-appc');

// Create my custom objects
exports.Todo = Kinvey.Entity.extend({
	constructor : function(attributes) {

		Kinvey.Entity.prototype.constructor.call(this, attributes, 'todo-collection');

		// my own uuid
		if(!attributes.guid) {
			this.set("guid", Titanium.Platform.createUUID());
		}
	}
});

// Create my custom collection
exports.TodoCollection = Kinvey.Collection.extend({
	// Set the entity definition for entities in this collection.
	entity : exports.Todo,
	// get a collection based on the queryType
	constructor : function(queryType) {
		var query = new Kinvey.Query();

		// based on the type passed in, we execute a specific
		// query on the collection
		if(queryType === "DONE") {
			query.on('done').equal("1");
		} else if(queryType === "OPEN") {
			query.on('done').equal("0");
		}
		query.on('text').sort();

		// create the collection
		Kinvey.Collection.prototype.constructor.call(this, 'todo-collection', query);
	},
});

exports.TodoCollection.DONE = "DONE";
exports.TodoCollection.OPEN = "OPEN";
exports.TodoCollection.ALL = "ALL";
