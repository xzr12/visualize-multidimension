function init_css(){

	var select_results_max_height = 100;
	$("#select_results").css("max-Height", select_results_max_height);
	$("#tags input").attr("readonly", true);

	var window_height = $(window).height();
	var left_panel_height = window_height - 2;
	var left_panel_head_height = $("#left-sidebar .panel-heading").outerHeight();
	var left_panel_body_height = left_panel_height - left_panel_head_height;
	$("#left-sidebar .panel-body").outerHeight(left_panel_body_height);

	var tags_height = $("#tags").outerHeight();
	var select_results_height = $("#select_results").outerHeight() + 15;
	var tabs_height = window_height - tags_height - select_results_height;
	$("#tabs").outerHeight(tabs_height);
	var tabs_head_height = $("#tabs .nav-tabs").outerHeight();
	var map_height = tabs_height - tabs_head_height - 25;
	$("#map").outerHeight(map_height);
	$("#lugui-wrapper").outerHeight(map_height);
	var reslist_height = window_height - tags_height;
	var reslist_head_height = $("#reslist div").outerHeight();
	var reslist_body_height = reslist_height - reslist_head_height - 10;
	$("#reslist ul").outerHeight(reslist_body_height);
}

function update_css(){
	var window_height = $(window).height();
	var tags_height = $("#tags").outerHeight();
	// set map size
	var select_results_height = $("#select_results").outerHeight() + 15;
	var tabs_height = window_height - tags_height - select_results_height;
	$("#tabs").outerHeight(tabs_height);
	var tabs_head_height = $("#tabs .nav-tabs").outerHeight() + 25;
	var map_height = tabs_height - tabs_head_height;
	$("#map").outerHeight(map_height);
	$("#lugui-wrapper").outerHeight(map_height);
	var reslist_height = window_height - tags_height;
	var reslist_head_height = $("#reslist div").outerHeight();
	var reslist_body_height = reslist_height - reslist_head_height - 10;
	$("#reslist ul").outerHeight(reslist_body_height);
}

function update_display(type)
{
	update_list();
	update_select();
	update_map(type);
	update_summarize();
	update_css();
}

function init_components()
{
	var filter = Object.create(Filter);
	filter.init();
	$('#filter [id]').change(function(){ var id = this.id; filter.filter_changed(id); });
	$("[href='#panel-summarize']").on('show.bs.tab', function(e){
		mapShow = false;
		update_summarize();
	});
	$("[href='#panel-map']").on('show.bs.tab', function(e){
		mapShow = true;
		setZoom();
	});
}

var query_results;
var select_results = new Array();
var mapShow = true;
$(document).ready(function(){
	init_css();
	// setTimeout(function(){$(".loading").css("display", "none")},5000);
	$(".loading").css("display", "none");
	init_components();
});
