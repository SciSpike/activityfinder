steal('jquery/class',
      'jquery/controller',
      'jquery/model',
      'jquery/view/ejs',
      'jquery/dom/fixture')
	  .then(
	  'js/activities/activityModel.js',
      function($){

		// THE CONTROLLER SETS UP LISTENER FUNCTIONS, CALLS VIEWS AND SETS UP EVENTS
		$.Controller("Activities",{
		  "init" : function( element , options ){
			  //var activities = Activity.findAll();
			this.element.append('js/activities/activityListView.ejs', Activity.findAll() )
		  },
		  "{Activity} created" : function(Activity, ev , activity){
			this.element.append('js/activities/activityListView.ejs', [activity])
		  },
		  "{Activity} updated" : function(Activity, ev , activity){
			this.element.append('js/activities/activityListView.ejs', [activity])
		  },
			submit : function(el, ev){
			  ev.preventDefault();
			  this.element.find('[type=submit]').val('Creating...');
			  new Activities(el.formParams()).save(this.callback('saved'));
			},
			saved : function(){
			  this.element.find('[type=submit]').val('Create');
			  this.element[0].reset();
			}
		})
		
		// INITIALIZE ON PAGE LOAD
		new Activities('#activityList', {});
		
		
		
		// CREATE A NEW ACTIVITY
		var singleActivity = new Activity({
			id: 2,
			title: 'Surfing Today',
			time: "2:00 pm",
			day: 'Wednesday',
			suburb: 'Sumner',
			city: 'Christchurch',
			zipcode: '8081',
			involvement: 'independent',
			type: 'sport',
			activity: 'surfing',
			description: 'time for a wave'
		})
		
		// SAVE THE NEW ACTIVITY
		singleActivity.save();






/*Activity.findAll({}, function( activities ) {
  console.log( activities );
})

Activity.findOne({}, function( activity ) {
  console.log( activity );
})*/

/*var singleActivity = new Activity({
	id: 1,
	time: "2:00 pm",
	day: 'Wednesday',
	suburb: 'Sumner',
	city: 'Christchurch',
	zipcode: '8081',
	involvement: 'independent',
	type: 'sport',
	activity: 'surfing',
	description: 'surfing comp on this Wednsday evening'
})

singleActivity.save();

Activity.findAll({}, function( activities ) {
  console.log( activities );
})*/











/*var singleActivity = {
	id: 1,
	title: 'Surfing Comp',
	time: "2:00 pm",
	day: 'Wednesday',
	suburb: 'Sumner',
	city: 'Christchurch',
	zipcode: '8081',
	involvement: 'independent',
	type: 'sport',
	activity: 'surfing',
	description: 'surfing comp on this Wednsday evening'
}



var newActivity = new Activity(singleActivity);
newActivity.save(function(newActivity){
  console.log( newActivity );
})*/











/*var singleActivity = new Activity({name: "mow lawn"});
singleActivity.save( function(singleActivity){
  console.log("created", singleActivity );

  singleActivity.attr("name", "mow my lawn")
  singleActivity.save( function( singleActivity ) {
    console.log("updated", singleActivity );
  })
})

singleActivity.save( function(singleActivity){
  console.log("created", singleActivity );

  singleActivity.destroy( function( singleActivity ) {
    console.log("destroyed", singleActivity );
  })
})

singleActivity.bind('created', function(ev, singleActivity){
  console.log("created", singleActivity );
})
singleActivity.save();

Activity.bind('created', function(ev, singleActivity){
  console.log("created", singleActivity );
})*/




/*var li = $('<li>').model( new Todo({id: 5}) )
                  .appendTo("#todos");
			  
console.log(li.model().id);

 Todo.findAll( {}, function( todos ){
     console.log( $.View( 'todos.ejs', todos ) );
 });
 
 Todo.findAll( {}, function( todos ){
  $('#todos').html( 'todos.ejs', todos );
});

$('#todos').html('todos.ejs', Todo.findAll() )*/











/*$.Controller("Todos",{
  "init" : function( element , options ){
    this.element.html('todos.ejs', Todo.findAll() )
  }
})

new Todos('#todos', {});*/

/*$.Controller("Todos",{
  "init" : function( element , options ){  },
  "li click" : function(li){  },

  "li .destroy {destroyEvent}" : function(el, ev){ 
    // previous destroy code here
  }
})

// create Todos with this.options.destroyEvent
new Todos("#todos",{destroyEvent: "mouseenter"})*/

/*$.Controller("Todos",{
  "init" : function( element , options ){  },
  "li click" : function(li){  },

  "li .destroy {Events.destroy}" : function(el, ev){ 
    // previous destroy code here
  }
})

// Events config
Events = {destroy: "click"};

// Events.destroy is looked up on the window.
new Todos("#todos")*/

/*$.Controller("Tooltip",{
  "{window} click" : function(el, ev){
    // hide only if we clicked outside the tooltip
    if(! this.element.has(ev.target ) {
      this.element.remove();
    }
  }
})

// create a Tooltip
new Tooltip( $('<div>INFO</div>').appendTo(el) )*/




/*$.Controller("Todos",{
  "init" : function( element , options ){
    this.element.html('todos.ejs', Todo.findAll() )
  },
  "li click" : function(li){
    li.trigger('selected', li.model() );
  },
  "li .destroy click" : function(el, ev){
    el.closest('.todo')
      .model()
      .destroy();
    ev.stopPropagation();
  },
  "{Todo} destroyed" : function(Todo, ev, destroyedTodo){
    destroyedTodo.elements(this.element)
                 .remove();
  },
  "{Todo} updated" : function(Todo, ev, updatedTodo){
    updatedTodo.elements(this.element)
               .replaceWith('todos.ejs',[updatedTodo]);
  }
})

//new Todos("#todos");
//var todo = new Todos("#todos");
//$.Controller.prototype.destroy unbinds a controller's event handlers and releases its element, but does not remove the element from the page.
//todo.destroy();

$.Controller('Editor',{
  update : function(options){
    this._super(options)
    this.setName();
  },
  // a helper that sets the value of the input
  // to the todo's name
  setName : function(){
    this.element.val(this.options.todo.name);
  },
  // listen for changes in the todo
  // and update the input
  "{todo} updated" : function(){
    this.setName();
  },
  // when the input changes
  // update the todo instance
  "change" : function(){
    var todo = this.options.todo
    todo.attr('name',this.element.val() )
    todo.save();
  }
});

//var todo1= new Todo({id: 6, name: "trash"}),
    //todo2 = new Todo({id: 6, name: "dishes"});

// create the editor;
//var editor = new Editor("#editor");

// show the first todo
//editor.update({todo: todo1})

// switch it to the second todo
//editor.update({todo: todo2});




$.Controller("Routing",{
  init : function(){
    this.editor = new Editor("#editor")
    new Todos("#todos");
  },
  // the index page
  "route" : function(){
     $("#editor").hide();
  },
  "todos/:id route" : function(data){
    $("#editor").show();
    Todo.findOne(data, $.proxy(function(todo){
      this.editor.update({todo: todo});
    }, this))
  },
  ".todo selected" : function(el, ev, todo){
    $.route.attr('id',todo.id);
  }
});

// create routing controller
new Routing(document.body);*/
				  


  
  
  
});