$( document ).ready(function() {
	var scaleElement = "<div class='eq-label'><table><tr><td>-</td></tr><tr><td>-</td></tr><tr><td>-</td></tr><tr><td>-</td></tr><tr><td>-</td></tr><tr><td>-</td></tr><tr><td>-</td></tr><tr><td>-</td></tr><tr><td>-</td></tr><tr><td>-</td></tr><tr><td>-</td></tr></table></div>";
	var hpFilterOptions = {
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
	};
	
	var eqInOptions = {
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
	};
	
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
	$(".eq-in").knob(eqInOptions);
	$(".hp-filter").knob(hpFilterOptions);
	
	// bind switch event
	$('.hp-filter-btn').click(function(e)	{
		console.log('hp switch clicked');
		e.preventDefault();
		if ($(this).hasClass('pressed')) {
			$(this).removeClass('pressed');
		} else {
			$(this).addClass('pressed');
		}
		
		$(this).blur();
		
		var id = $(this)[0].id;
		var knobElement;
		if (id.indexOf('1') > 0) {
			knobElement = $('#knob1');
		} else if (id.indexOf('4') > 0) {
			knobElement = $('#knob4');
		} 
		
		knobElement.siblings("canvas").remove();
		if (knobElement.attr("data-readOnly")=='true') {
			knobElement.unwrap().removeAttr("data-readOnly readonly").data("kontroled","").data("readonly",false).knob(hpFilterOptions);
		} else {
			knobElement.unwrap().attr("data-readOnly",true).data("kontroled","").data("readonly",true).knob(hpFilterOptions);
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
		
		$(this).blur();
		
		var id = $(this)[0].id;
		var knobElement;
		if (id.indexOf('2') > 0) {
			knobElement = $('#knob2');
		} else if (id.indexOf('3') > 0) {
			knobElement = $('#knob3');
		}
		
		knobElement.siblings("canvas").remove();
		if (knobElement.attr("data-readOnly")=='true') {
			knobElement.unwrap().removeAttr("data-readOnly readonly").data("kontroled","").data("readonly",false).knob(eqInOptions);
		} else {
			knobElement.unwrap().attr("data-readOnly",true).data("kontroled","").data("readonly",true).knob(eqInOptions);
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
		$('#knob1').val(20).trigger('change');
		$('#knob2').val(-50).trigger('change');
		$('#knob3').val(-50).trigger('change');
		$('#knob4').val(20).trigger('change');
		
		for (i = 1; i <= 4; i++) {
			if (i == 1 || i == 4) {
				filter = hpFilterOptions;
			} else {
				filter = eqInOptions;
			}
			
			if ($('#knob' + i).attr("data-readOnly")!='true') {
				$('#knob' + i).siblings("canvas").remove();
				$('#knob' + i).unwrap().attr("data-readOnly",true).data("kontroled","").data("readonly",true).knob(filter);
			}
		}
		
		//reset switches
		$('.hp-filter-btn').each(function() {
			if ($(this).hasClass('pressed')) {
				$(this).removeClass('pressed');
			}
		});
		
		$('.eq-in-btn').each(function() {
			if ($(this).hasClass('pressed')) {
				$(this).removeClass('pressed');
			}
		});
	});

});