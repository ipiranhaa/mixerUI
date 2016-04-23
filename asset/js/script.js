$( document ).ready(function() {
	var scaleElement = "<div class='eq-label'><table><tr><td>-</td></tr><tr><td>-</td></tr><tr><td>-</td></tr><tr><td>-</td></tr><tr><td>-</td></tr><tr><td>-</td></tr><tr><td>-</td></tr><tr><td>-</td></tr><tr><td>-</td></tr><tr><td>-</td></tr><tr><td>-</td></tr></table></div>";
	// var numberElement = "<div class='eq-container col-md-10 col-lg-10'><span class='eq-label'><table><tr><td valign='top'>+10</td></tr><tr><td>0</td></tr><tr><td valign='bottom'>-10</td></tr></table></span>";
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

});