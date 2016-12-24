function init_css(){
	$("#reslist").css("margin-bottom", 0);
	$("#reslist ul").css("margin-top", 20);	
	var select_results_max_height = 100;
	$("#select_results").css("max-Height", select_results_max_height);
	$("#tags input").attr("readonly", true);
	
	var window_height = $(window).height();
	var left_panel_head_height = $("#left-sidebar .panel-heading").outerHeight();
	var left_panel_body_height = window_height - left_panel_head_height;
	$("#left-sidebar .panel-body").outerHeight(left_panel_body_height - 2);
	var tags_height = $("#tags").outerHeight() + 20;
	var reslist_height = window_height - tags_height;
	var reslist_head_height = $("#reslist div").outerHeight();
	var reslist_body_height = reslist_height - reslist_head_height - 23;
	$("#reslist ul").outerHeight(reslist_body_height);
	// set map size
	var select_results_height = $("#select_results").outerHeight();
	var tabs_height = window_height - tags_height - select_results_height;
	var map_height = tabs_height - 100;
	$("#map").outerHeight(map_height);
}

function update_css(){
	var window_height = $(window).height();
	var tags_height = $("#tags").outerHeight() + 20;
	var reslist_height = window_height - tags_height;
	var reslist_head_height = $("#reslist div").outerHeight();
	var reslist_body_height = reslist_height - reslist_head_height - 23;
	$("#reslist ul").outerHeight(reslist_body_height);
	// set map size
	var select_results_height = $("#select_results").outerHeight();
	var tabs_height = window_height - tags_height - select_results_height;
	var map_height = tabs_height - 100;
	$("#map").outerHeight(map_height);
}

function update_display(type)
{
	update_list();
	update_select();
	update_map(type);
	update_summarize();
	update_css();
}

function init()
{
	var filter = Object.create(Filter);
	filter.init();
	$('#filter [id]').change(function(){ var id = this.id; filter.filter_changed(id); });
	init_css();
}

var query_results;
var select_results = new Array();
$(document).ready(function(){
	init();
});
