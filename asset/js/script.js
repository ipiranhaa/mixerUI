$( document ).ready(function() {
	var scaleElement = "<div class='eq-label'><table><tr><td>-</td></tr><tr><td>-</td></tr><tr><td>-</td></tr><tr><td>-</td></tr><tr><td>-</td></tr><tr><td>-</td></tr><tr><td>-</td></tr><tr><td>-</td></tr><tr><td>-</td></tr><tr><td>-</td></tr><tr><td>-</td></tr></table></div>";
	
	// init slider
	var options = {
		value: 0,
		orientation: 'vertical',
		reversed: true
	}

	for (i = 0; i < 60; i++) {
		var ele = '#eq' + i.toString();
		$(ele).slider(options);

		if (i < 29 || (i > 29 && i < 59)) {
			$(ele).before(scaleElement);
		}
	}

	// blind slider event
	var filterTopData, filterBottomData;
	$(".eq-top").on("slideStop", function(slideEvt) {
		var eq = [];
		var data = "";
		for (var i = 0; i < 30; i++) {
			eq[i] = $("#eq" + i).val();
			if (!eq[i]) {
				eq[i] = 0;
			}

			if (i == 29) {
				data += eq[i];
			}
			else {
				data += eq[i] + " : ";
			} 
			
		};
		
		if (filterTopData != data) {
			console.log('Top -> ' + data);
			filterTopData = data;
			// socket.emit('eqData', 'Top -> ' + data);
		} else {
			console.log("denied");		
		}
	});
	
	// hook eq value
	$(".eq-bottom").on("slideStop", function(slideEvt) {
		var eq = [];
		var data = "";
		for (var i = 30; i < 60; i++) {
			eq[i] = $("#eq" + i).val();
			if (!eq[i]) {
				eq[i] = 0;
			}

			if (i == 59) {
				data += eq[i];
			}
			else {
				data += eq[i] + " : ";
			} 
			
		};
		
		if (filterBottomData != data) {
			console.log('Bottom -> ' + data);
			filterBottomData = data;
			// socket.emit('eqData', 'Bottom -> ' + data);
		} else {
			console.log("denied");		
		}
	});
	
	// init knob
	$(".eq-in").knob({
		'width': 100,
		'thickness': 0.2,
		'bgColor': "#eee",
		'min': -50,
		'max': 10,
		'step': 1,
		'skin': 'tron',
		'angleOffset': -125,
		'angleArc': 250,
		'width': 60,
		'change' : function (v) { console.log(v); }
	});

	$(".hp-filter").knob({
		'width': 100,
		'thickness': 0.2,
		'bgColor': "#eee",
		'min': 20,
		'max': 250,
		'step': 1,
		'skin': 'tron',
		'angleOffset': -125,
		'angleArc': 250,
		'change' : function (v) { console.log(v); }
	});
	
	// bing switch event
	$('.hp-filter-btn').click(function(e)	{
		console.log('hp switch clicked');
		e.preventDefault();
		if ($(this).hasClass('pressed')) {
			$(this).removeClass('pressed');
		} else {
			$(this).addClass('pressed');
		}
	});

	$('.eq-in-btn').click(function(e)	{
		console.log('eq switch clicked');
		e.preventDefault();
		if ($(this).hasClass('pressed')) {
			$(this).removeClass('pressed');
		} else {
			$(this).addClass('pressed');
		}
	});
	
	$('.reset').click(function(e)	{
		console.log('Reset state');
		e.preventDefault();
		
		// reset sliders
		for (i = 0; i < 60; i++) {
			var ele = '#eq' + i.toString();
			$(ele).slider('setValue', 0);
		}
		
		// reset knobs
		$('#knob1').val(20).trigger('change');;
		$('#knob2').val(-50).trigger('change');;
		$('#knob3').val(-50).trigger('change');;
		$('#knob4').val(20).trigger('change');;
		
		//reset switches
		$('.hp-filter-btn').each(function() {
			if ($(this).hasClass('pressed')) {
				$(this).removeClass('pressed')
			}
		});
		
		$('.eq-in-btn').each(function() {
			if ($(this).hasClass('pressed')) {
				$(this).removeClass('pressed')
			}
		});
	});

});