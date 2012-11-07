$.Model('Activity',{
				findAll : "GET /activities",
				findOne : "GET /activities/{id}",
				create  : "POST /activities",
				update  : "PUT /activities/{id}",
				destroy : "DELETE /activities/{id}"
			},
			{}
		)
  
  // THE INITIAL ARRAY OF ACTIVITIES
	var ACTIVITIES = [
		{
			id: 0,
			title: 'Golf Evening',
			time: "5:00 pm",
			day: 'Friday',
			suburb:  null,
			city: 'Oak park',
			zipcode: '60302',
			involvement: 'participation',
			type: 'sport',
			activity: 'golf',
			description: 'Need a 4th for golf'
		},
		{
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
			description: 'this Wednsday evening'
		}
	];
	
	// findAll
	$.fixture("GET /activities", function(orig){
	  return [ACTIVITIES]
	});
	
	// findOne
	var id= 4;
	/*$.fixture("GET /activities/{id}", function(orig){
	  return ACTIVITIES[(+orig.data.id)-1];
	})*/
	
	// create
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
	
	// BIND LISTENERS
	Activity.bind('created', function(ev, singleActivity){/* callback */})
	Activity.bind('updated', function(ev, singleActivity){/* callback */})
	
	