function init_css(){
	var window_height = $(window).height();

	var left_panel_head_height = $("#left-sidebar .panel-heading").outerHeight();
	var left_panel_body_height = window_height - left_panel_head_height;
	$("#left-sidebar .panel-body").outerHeight(left_panel_body_height - 2);

	var tags_height = $("#tags").outerHeight() + 20;
	var reslist_height = window_height - tags_height;
	var reslist_head_height = $("#reslist div").outerHeight();
	var reslist_body_height = reslist_height - reslist_head_height - 15;
	$("#reslist").css("margin-bottom", 0);
	$("#reslist ul").css("margin-top", 20);	
	$("#reslist ul").outerHeight(reslist_body_height);

	// set map size
	// var tags_height = $("#tags").outerHeight();
	// var thumbnails_height = $("#thumbnails").outerHeight();
	// var tabs_height = window_height - tags_height - thumbnails_height;
	// $("#tabs").outerHeight(tags_height - 20);
}

function update_display()
{
	// update_thumbnails();
	update_list();
	// console.log("new2",select_results);
	update_map();
	// console.log("new3",select_results);
	update_summarize();
	// update_details();
}

function init()
{
	filter = Object.create(Filter);
	filter.init();
	$('#filter [id]').change(function(){ var id = this.id; filter.changed(id); });
	init_css();
}

var query_results;
var select_results = new Array();
var maxnum_select_results = 5;
$(document).ready(function(){
	init();
});
