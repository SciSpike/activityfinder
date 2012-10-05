steal('jquery/class',
      'jquery/controller',
      'jquery/model',
      'jquery/view/ejs',
      'jquery/dom/fixture',
      function($){

  $.Model('Activity',{
    findAll : "GET /activities",
    findOne : "GET /activities/{id}",
    create  : "POST /activities",
    update  : "PUT /activities/{id}",
    destroy : "DELETE /activities/{id}"
  },
  {})
  
  
  
  // our list of todos
var ACTIVITIES = [
    {
		id: 0,
		time: "5:00 pm",
		day: 'Friday',
		suburb: null,
		city: 'Oak park',
		zipcode: '60302',
		involvement: 'participation',
		type: 'sport',
		activity: 'golf',
		description: 'Need a 4th for golf'
	}
];
// findAll
$.fixture("GET /activities", function(){
  return [ACTIVITIES]
});

// findOne
$.fixture("GET /activities/{id}", function(orig){
  return ACTIVITIES[(+orig.data.id)-1];
})

// create
var id= 4;
$.fixture("POST /activities", function(){
  return {id: (id++)}
})

// update
$.fixture("PUT /activities/{id}", function(){
  return {};
})

// destroy
$.fixture("DELETE /activities/{id}", function(){
  return {};
})

/*Todo.findAll({}, function( todos ) {
  console.log( todos );
})

Todo.findOne({}, function( todo ) {
  console.log( todo );
})

var todo = new Todo({name: "mow lawn"})
todo.save(function(todo){
  console.log( todo );
})

var todo = new Todo({name: "mow lawn"});
todo.save( function(todo){
  console.log("created", todo );

  todo.attr("name", "mow my lawn")
  todo.save( function( todo ) {
    console.log("updated", todo );
  })
})

var todo = new Todo({name: "mow lawn"});
todo.save( function(todo){
  console.log("created", todo );

  todo.destroy( function( todo ) {
    console.log("destroyed", todo );
  })
})

var todo = new Todo({name: "mow lawn"});
todo.bind('created', function(ev, todo){
  console.log("created", todo );
})
todo.save();

Todo.bind('created', function(ev, todo){
  console.log("created", todo );
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