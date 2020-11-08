var calendarDays=[];
$('.ui-datepicker-calendar td').each(function(){calendarDays.push($(this))})
var active=false;
var daysCount=5;
for (var i = 0; i < calendarDays.length; i++) {
	if (calendarDays[i].children('.ui-state-active').length) {
		active = true;
	}
	if (active && daysCount) {
		concalendarDays[i].addClass('active')
		daysCount--;
	}
}

.ui-datepicker-calendar td.active a{border:0 !important;outline-color:#e5e5e5;background:#e5e5e5 !important;}