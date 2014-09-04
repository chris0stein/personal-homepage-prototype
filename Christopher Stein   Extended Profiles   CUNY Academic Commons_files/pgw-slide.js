function pgw_cycle_before() {
	jQuery(this).children("img").trigger("cycle");
}

jQuery(document).ready(function() {
	jQuery('.slideshow').cycle({
		fx: 'fade',
		timeout: 7000,
		prev:    '#pgw-prev',
		next:    '#pgw-next',
		before:  pgw_cycle_before
	});

	jQuery(".slide img").lazyload({
		event:   'cycle',
		effect : 'fadeIn'
	});
});
