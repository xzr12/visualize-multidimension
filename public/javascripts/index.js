function init_css(){
	var window_height = $(window).height();

	var left_panel_head_height = $("#left-sidebar .panel-heading").outerHeight();
	var left_panel_body_height = window_height - left_panel_head_height;
	$("#left-sidebar .panel-body").outerHeight(left_panel_body_height - 2);

	// set map size
	var tags_height = $("#tags").outerHeight();
	var thumbnails_height = $("#thumbnails").outerHeight();
	var tabs_height = window_height - tags_height - thumbnails_height;
	$("#tabs").outerHeight(tags_height);
}

function update_display()
{
	// update_thumbnails();
	update_map();
	update_summarize();
	// update_details();
}

function init()
{
	init_filter();
	// init_tags();
	// init_thumbnails();
	// init_map();
	// init_summarize();
	// init_details();

	init_css();
}

$(document).ready(function(){
	var filter = new Object();
	var query_results;
	var select_results = new Array();
	var maxnum_select_results = 5;

	init();
})
