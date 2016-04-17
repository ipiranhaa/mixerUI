$( document ).ready(function() {
	var scaleElement = "<div class='eq-label'><table><tr><td>-</td></tr><tr><td>-</td></tr><tr><td>-</td></tr><tr><td>-</td></tr><tr><td>-</td></tr><tr><td>-</td></tr><tr><td>-</td></tr><tr><td>-</td></tr><tr><td>-</td></tr><tr><td>-</td></tr><tr><td>-</td></tr></table></div>";
	// var numberElement = "<div class='eq-container col-md-10 col-lg-10'><span class='eq-label'><table><tr><td valign='top'>+10</td></tr><tr><td>0</td></tr><tr><td valign='bottom'>-10</td></tr></table></span>";
	// init slider
	var options = {
		value: 0,
		orientation: 'vertical',
		reversed: true
		// ticks: [-1, -2, -3, -4, -5, -6, -7, -8, -9, 0, 1, 2, 3, 4, 5, 6, 7, 8 ,9, 10],
    // ticks_labels: ['-1', '-2', '-3', '-4', '-5', '-6', '-7', '-8', '-9', '0', '1', '2', '3', '4', '5', '6', '7', '8' ,'9', '10'],
    // ticks_snap_bounds: 30
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
	
	$(".knob").knob({
		width: '100',
		thickness: ".2",
		bgColor: "#eee",
		draw : function () {
      // "tron" case
      if (this.$.data('skin') == 'tron') {
      	this.cursorExt = 0.3;
					var a = this.arc(this.cv)  // Arc
						, pa                   // Previous arc
						, r = 1;
						this.g.lineWidth = this.lineWidth;
						if (this.o.displayPrevious) {
							pa = this.arc(this.v);
							this.g.beginPath();
							this.g.strokeStyle = this.pColor;
							this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, pa.s, pa.e, pa.d);
							this.g.stroke();
						}
						this.g.beginPath();
						this.g.strokeStyle = r ? this.o.fgColor : this.fgColor ;
						this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, a.s, a.e, a.d);
						this.g.stroke();
						this.g.lineWidth = 2;
						this.g.beginPath();
						this.g.strokeStyle = this.o.fgColor;
						this.g.arc( this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
						this.g.stroke();
						return false;
					}
				}
			});
});