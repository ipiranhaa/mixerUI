var socket = io.connect('http://localhost:5555');
	socket.on('connect', function() {
		console.log("user connected")
	});

$( document ).ready(function() {
	// init slider
    for (i = 0; i < 60; i++) {
		var ele = '#eq' + i.toString();
		$(ele).slider({
			value: 0,
			orientation: 'vertical'
		});
	}
	
	var filterTopData, filterBottomData;
	$(".eq-top").on("slide", function(slideEvt) {
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
			socket.emit('eqData', 'Top -> ' + data);
		} else {
			console.log("denied");		
		}
	});
	
	$(".eq-bottom").on("slide", function(slideEvt) {
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
			socket.emit('eqData', 'Bottom -> ' + data);
		} else {
			console.log("denied");		
		}
	});
});