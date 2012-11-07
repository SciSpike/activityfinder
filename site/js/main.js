$(document).ready(function() {
	$('.ui-popup-container').each(function(){
		$(this).addClass('ui-selectmenu-hidden');
	});
	
	/* #################### SCROLL DIAL FEATURE MOBISCROLL #################### */
	 $(function () {
            var curr = new Date().getFullYear();
            var opt = {
                'date': {
                    preset: 'date',
                    dateOrder: 'd Dmmyy',
                    invalid: { daysOfWeek: [0, 6], daysOfMonth: ['5/1', '12/24', '12/25'] }
                },
                'datetime': {
                    preset: 'datetime',
                    minDate: new Date(2012, 3, 10, 9, 22),
                    maxDate: new Date(2014, 7, 30, 15, 44),
                    stepMinute: 5
                },
                'time': {
                    preset: 'time'
                },
                'credit': {
                    preset: 'date',
                    dateOrder: 'mmyy',
                    dateFormat: 'mm/yy',
                    startYear: curr,
                    endYear: curr + 10,
                    width: 100
                },
                'btn': {
                    preset: 'date',
                    showOnFocus: false
                },
                'inline': {
                    preset: 'date',
                    display: 'inline'

                }
            }

            $('.scrollSelect').scroller({ preset: 'select' }).bind('change', function() {
                $('#test').val('').scroller('destroy').scroller($.extend(opt[$('#demo').val()], { theme: $('#theme').val(), mode: $('#mode').val(), lang: $('#language').val() }));
                $('#demo').val() == 'btn' ? $('#buttons').show() : $('#buttons').hide();
            });

            $('#demo').trigger('change');

            $('#trigger').click(function() {
                $('#test').scroller('show');
                return false;
            });

            $('#clear').click(function() {
                $('#test').val('');
                return false;
            });
        });
		
		
		
		var times = [];
		var d = new Date();    // defaults to the current time in the current timezone
		var currentHrs = d.getHours();
		var currentMins = d.getMinutes();
		var timePeriod = 'am';
		
		if(currentHrs > 12){
			currentHrs = currentHrs-12;
			timePeriod = 'pm';
		}
		if(currentMins > 30){
			currentMins = '00';
			currentHrs++;
			if(currentHrs > 12){
				currentHrs = 1;
			}
			if(currentHrs >= 12){
				if(timePeriod == 'am'){
					timePeriod = 'pm';
				}else{
					timePeriod = 'am';
				}
			}
		}else{
			currentMins = '30';
		}
		
		for(var i=0; i<48; i++){
			var currentTime = currentHrs + ':' + currentMins + '' + timePeriod;
			$('<option />', {
				value:currentTime,
				text:currentTime
			}).appendTo($('#time'));
			
			if(currentMins == '00'){
				currentMins = '30';
			}else{
				currentMins = '00';
				currentHrs++;
				if(currentHrs > 12){
					currentHrs = 1;
				}
				if(currentHrs >= 12){
					if(timePeriod == 'am'){
						timePeriod = 'pm';
					}else{
						timePeriod = 'am';
					}
				}
			}
		}
		
		var days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
		var currentday = d.getDay() - 1;
		
		for(var j=0; j<days.length; j++){
			$('<option />', {
				value:days[currentday],
				text:days[currentday]
			}).appendTo($('#day'));
			currentday++;
			if(currentday + 1 > days.length){
				currentday = 0;
			}
		}
		
		
		
		/* #################### JQUERY UI MOBILE EVENTS #################### */
		
		$( "#flip-1" ).bind( "change", function(event, ui) {
			var useCurrentLocation = $(this).val();
			if(useCurrentLocation == 'yes'){
				$('.otherAddress').slideUp();
			}else{
				$('.otherAddress').slideDown();
			}
		});
		
		
		
		
		/* #################### REDIRECTS #################### */
		
		$('#searchActivity').click(function(e) {
			var useCurrentLocation = $("#flip-1").val();
			var suburb = $("#suburb").val();
			var city = $("#city").val();
			var zipcode = $("#zipcode").val();
			var radius = $("#select-radius").val();
			
			if(useCurrentLocation == 'yes'){
            	window.location.href = "activityMapView.html?currLoc=" + useCurrentLocation + "&radius=" + radius;
			}else{
				if(suburb == ''){suburb = 'null'}
				if(city == ''){city = 'null'}
				if(zipcode == ''){zipcode = 'null'}
				window.location.href = "activityMapView.html?currLoc=" + useCurrentLocation + "&suburb=" + suburb + "&city=" + city + "&zipcode=" + zipcode + "&radius=" + radius;
			}
        });
});