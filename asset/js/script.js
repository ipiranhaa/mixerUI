// slider: https://github.com/seiyria/bootstrap-slider
// knob: https://github.com/aterrien/jQuery-Knob
$( document ).ready(function() {
	var scaleElement = "<div class='eq-label'><table><tr><td>-</td></tr><tr><td>-</td></tr><tr><td>-</td></tr><tr><td>-</td></tr><tr><td>-</td></tr><tr><td>-</td></tr><tr><td>-</td></tr><tr><td>-</td></tr><tr><td>-</td></tr><tr><td>-</td></tr><tr><td>-</td></tr></table></div>";
	var isDesktopView = true;
	var KnobRendered = false;

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
		'change' : function (v) {
			var nocache = "&nocache=" + Math.random() * 1000000;
    	var request = new XMLHttpRequest();

			var eleId = this.$[0].id;
			var data = eleId + '=' + Math.round(v);
			
			console.log(data);

			request.open("GET", "ajax_inputs" + data, true);
    	request.send(null);
		}
	};
	
	var eqInOptions = {
		'width': 60,
		'thickness': 0.2,
		'bgColor': "#eee",
		'min': -50,
		'max': 10,
		'step': 1,
		'skin': 'tron',
		'angleOffset': -125,
		'angleArc': 250,
		'change' : function (v) {
			var nocache = "&nocache=" + Math.random() * 1000000;
    	var request = new XMLHttpRequest();

			var eleId = this.$[0].id;
			var data = eleId + '=' + Math.round(v);
			
			console.log(data);

			request.open("GET", "ajax_inputs" + data, true);
    	request.send(null); 
		}
	};

	var checkScreen = function() {
		var height = $(window).height();
		var width = $(window).width();
		if (height == 768 && width == 1024) {
			isDesktopView = false
		} else {
			isDesktopView = true;
		}
	}

	var renderKnob = function() {
		console.log('render knob');
		checkScreen();
		if (!isDesktopView) {
			if (!KnobRendered) {
				eqInOptions.width = 60;
				hpFilterOptions.width = 80;
				KnobRendered = true;
				$(".eq-in").knob(eqInOptions);
				$(".hp-filter").knob(hpFilterOptions);
			} else {
				$(".eq-in").trigger(
					'configure',
					{
						"width": 60
					});

				$(".hp-filter").trigger(
					'configure',
					{
						"width": 80
					});
			}	
		} else {
			if (!KnobRendered) {
				eqInOptions.width = 60
				hpFilterOptions.width = 100;
				KnobRendered = true;
				$(".eq-in").knob(eqInOptions);
				$(".hp-filter").knob(hpFilterOptions);
			} else {
				$(".eq-in").trigger(
					'configure',
					{
						"width": 60
					});

				$(".hp-filter").trigger(
					'configure',
					{
						"width": 100
					});
			}	
		}	
	}
	
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
	$(".eq-top").on("change", function(slideEvt) {
		var nocache = "&nocache=" + Math.random() * 1000000;
    var request = new XMLHttpRequest();

		var eleNumberId = (slideEvt.currentTarget.id).split('eq')[1];
		var value = slideEvt.value.newValue;
		var newEleId = 'eq' + (parseInt(eleNumberId) + 1);
		var data = newEleId + '=' + value;

		if (filterTopData != data) {
			console.log(data);
			filterTopData = data;
			request.open("GET", "ajax_inputs" + data, true);
    	request.send(null);
		}
	});
	
	// hook eq value
	$(".eq-bottom").on("change", function(slideEvt) {
		var nocache = "&nocache=" + Math.random() * 1000000;
    var request = new XMLHttpRequest();

		var eleNumberId = (slideEvt.currentTarget.id).split('eq')[1];
		var value = slideEvt.value.newValue;
		var newEleId = 'eq' + (parseInt(eleNumberId) + 1);
		var data = newEleId + '=' + value;

		if (filterBottomData != data) {
			console.log(data);
			filterBottomData = data;
			request.open("GET", "ajax_inputs" + data, true);
    	request.send(null);
		}
	});
	
	// init knob
	renderKnob();
	
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
		
		if (!isDesktopView) {
			hpFilterOptions.width = 80;
		} else {
			hpFilterOptions.width = 100;
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

	$(window).resize(function() {
		renderKnob();
	});

});