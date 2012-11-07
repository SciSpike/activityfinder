steal('jquery/class',
      'jquery/controller',
      'jquery/model',
      'jquery/view/ejs',
      'jquery/dom/fixture',
	  'js/activityModel.js',
      function($){

		// THE CONTROLLER SETS UP LISTENER FUNCTIONS, CALLS VIEWS AND SETS UP EVENTS
		$.Controller("Activities",{
			/*listensTo: select
  			},{*/
		  "init" : function( element , options ){
			  var activities = Activity.findAll();
			this.element.append('js/activityView.ejs', Activity.findAll() )
		  },
		  "{Activity} created" : function(Activity, ev , activity){
			this.element.append('js/activityView.ejs', [activity])
		  },
		  "{Activity} updated" : function(Activity, ev , activity){
			this.element.append('js/activityView.ejs', [activity])
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
		//new Activities('#activityList', {});
		
		// BIND LISTENERS
		//Activity.bind('created', function(ev, singleActivity){/* callback */})
		//Activity.bind('updated', function(ev, singleActivity){/* callback */})
		
		// CREATE A NEW ACTIVITY
		/*var singleActivity = new Activity({
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
		singleActivity.save();*/
  
  
});