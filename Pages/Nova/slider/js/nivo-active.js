(function ($) {
 "use strict";
	//---------------------------------------------
	//Nivo slider
	//---------------------------------------------
	$('#nivo-active').nivoSlider({
		slices: 15,
		boxCols: 8,
		boxRows: 4,
		animSpeed: 500,
		pauseTime: 5000,
		directionNav: true,
		controlNav:true,
		randomStart:true,
		controlNavThumbs: false,
		pauseOnHover: false,    // Hover to puse slider auto play
		manualAdvance: true,  // Autoplay option
		prevText: '<i class="icofont icofont-simple-left"></i>', 
		nextText: '<i class="icofont icofont-simple-right"></i>',
	});
})(jQuery); 