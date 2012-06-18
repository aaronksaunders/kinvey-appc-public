         

When in Boston a few weeks ago, I had the opportunity to meet the guys over at Kinvey. I had been hearing about the service and features a for a while. Had not paid much attention since I have been working with Appcelerator Cloud Services, but I figured options and multiple tools for my company and for the community only makes it better for everyone.

For those who don't know, this is what Kinvey does...

Kinvey (pronounced Kin-vey, like convey) makes it ridiculously easy for developers to setup, use and operate a cloud backend for their mobile apps. They don't have to worry about connecting to various cloud services, setting up servers for their backend, or maintaining and scaling them.

And if you are like me and need a picture...

       

After taking a look at the documentation and the "Success Pricing"; I figure lets see what the javascript library looked like. There were two major changes I had to make to get it to work.

Add the Titanium http client code
Replace the use of HTML5 LocalStorage with Appcelerator Properties
After those changes, things just worked.

So before you hop into the Appcelerator code, you need to head over to the Kinvey site and create your account and setup your application.

After you signup, you need to create an application



Then you will need the app keys for your Titanium Application



I am not going to repeat the basics that are needed for getting started with Kinvey API since their documentation covers it pretty well; I will just jump into the Appcelerator code.

Appcelerator Todo App + Kinvey

Step One - Initialize (Download Modified Kinvey.js API)

you will need to include the specific application information when initializing the application of utilizing Kinvey.

<code>
<pre>
//
// code snippet from User.js in sample application
//
this.Kinvey = require('kinvey-appc');
Ti.API.info('kinvey ' + JSON.stringify(this.Kinvey));

var options = {
    appKey : '',
    appSecret : ''
}

if (options.appKey === null || options.appSecret === null) {
    Ti.API.info('ERROR YOU MUST SET KETS IN USER.JS FOR APPLICATION TO FUNCTION');
    return;
}
this.Kinvey.init(options);
</pre>
</code>
Step Two - Create Object


<code>
<pre>
//
// Create my custom object todo object by extending the base Kinvey object
//
exports.Todo = Kinvey.Entity.extend({
    constructor : function(attributes) {
        Kinvey.Entity.prototype.constructor.call(this, attributes, 'todo-collection');

        // my own uuid
        if(!attributes.guid) {
            this.set("guid", Titanium.Platform.createUUID());
        }
    }
});
</pre>
</code>

Step Three - Create Collection

We added some extra code here, the queryType that is provided to the collection allows us to apply a query to the collection when initializing it

<code>
<pre>
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
</pre>
</code>
Step Four - Saving a Todo Object

Here we create the todo object as a simple javascript object, and then we call save on the newly created object to persist the information to the backend

<code>
<pre>
//
// this code is executed to save the todo object
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
</pre>
</code>