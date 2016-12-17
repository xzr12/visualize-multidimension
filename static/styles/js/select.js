// filter:{"state","city","time","category","score","service","environment","taste"}
var filter = new Object(); 

function init()
{
	filter.state = "null";
	filter.city = "null";
	filter.time = "null";
	filter.category = "null";
	filter.score = "null";
	filter.service = "null";
	filter.environment = "null";
	filter.taste = "null";
}

//生成所有选择框
function generate_all_query(){
	// select-state
	var filter_state = $("#filter-state select");
	add_option(filter_state, "不限");
	add_option(filter_state, "Alabama");
	add_option(filter_state, "Alaska");
	add_option(filter_state, "Arizona");
	add_option(filter_state, "Arkansas");
	add_option(filter_state, "California");
	add_option(filter_state, "Colorado");
	add_option(filter_state, "Connecticut");
	add_option(filter_state, "Delaware");
	add_option(filter_state, "Florida");
	add_option(filter_state, "Georgia");
	add_option(filter_state, "Hawaii");
	add_option(filter_state, "Idaho");
	add_option(filter_state, "Illinois");
	add_option(filter_state, "Indiana");
	add_option(filter_state, "Iowa");
	add_option(filter_state, "Kansas");
	add_option(filter_state, "Kentucky");
	add_option(filter_state, "Louisiana");
	add_option(filter_state, "Maine");
	add_option(filter_state, "Maryland");
	add_option(filter_state, "Massachusetts");
	add_option(filter_state, "Michigan");
	add_option(filter_state, "Minnesota");
	add_option(filter_state, "Mississippi");
	add_option(filter_state, "Missouri");
	add_option(filter_state, "Montana");
	add_option(filter_state, "Nebraska");
	add_option(filter_state, "Nevada");
	add_option(filter_state, "New Hampshire");
	add_option(filter_state, "New Jersey");
	add_option(filter_state, "New Mexico");
	add_option(filter_state, "New York");
	add_option(filter_state, "North Carolina");
	add_option(filter_state, " North Dakota");
	add_option(filter_state, "Ohio");
	add_option(filter_state, "Oklahoma");
	add_option(filter_state, "Oregon");
	add_option(filter_state, "Pennsylvania");
	add_option(filter_state, "Rhode Island");
	add_option(filter_state, "South Carolina");
	add_option(filter_state, "South Dakota");
	add_option(filter_state, "Tennessee");
	add_option(filter_state, "Texas");
	add_option(filter_state, "Utah");
	add_option(filter_state, "Vermont");
	add_option(filter_state, "Virginia");
	add_option(filter_state, "Washington");
	add_option(filter_state, "West Virginia");
	add_option(filter_state, "Wisconsin");
	add_option(filter_state, "Wyoming");
	
	//select-time
	var filter_time = $("#filter-time select");
	add_option(filter_time, "不限");
	add_option(filter_time, "Weekday");
	add_option(filter_time, "Weekend");
	add_option(filter_time, "Monday");	
	add_option(filter_time, "Tuesday");	
	add_option(filter_time, "Wednesday");	
	add_option(filter_time, "Thursday");	
	add_option(filter_time, "Friday");	
	add_option(filter_time, "Saturday");	
	add_option(filter_time, "Sunday");
}
function add_option(dst, content){
	var select = $(dst);
	var option = $("<option></option");
	option.text(content);
	select.append(option);
}

//select选择响应
function send_filter_query()
{
	// var str_filter = '{"filter":' + '{"state":"' + filter.state + '"},"' + '{"city":' + filter.city + '"},' + '{"time":' + filter.time + '"},' + '{"category":' + filter.category + '"},' + '{"score":' + filter.score + '"},' + '{"service":' + filter.service + '"},' + '{"environment":' + filter.environment + '"},' + '{"taste":' + filter.taste + '"}' + '}';
	var xmlhttp;
	if (window.XMLHttpRequest)
	{
		xmlhttp = new XMLHttpRequest();
	}
	else
	{
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	var str_filter = 'state=' + filter.state + '&' + 'city=' + filter.city + '&' + 'time=' + filter.time + '&' + 'category=' + filter.category;
	xmlhttp.open("GET",("/query/filter_result.json?"+str_filter),true);
	xmlhttp.send();
	xmlhttp.onreadystatechange=function()
	{
	    if (xmlhttp.readyState==4 && xmlhttp.status==200)
	    {
	        var data = JSON.parse(xmlhttp.responseText);
	        var select_city = $("#filter-city select");
	        for (var i = 0;i < data.cities.length;i ++)
	        {
	        	add_option(select_city, data.cities[i]);
	        }
	    }
	}
}
function filter_state_changed(){
	var state = $("#filter-state select").val();
	console.log(state);
	filter.state = state;
	if (state != "不限")
	{
		var xmlhttp;
		if (window.XMLHttpRequest)
		{
			xmlhttp = new XMLHttpRequest();
		}
		else
		{
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.open("GET",("/ajax/cities/"+state+".json"),true);
		xmlhttp.send();
		xmlhttp.onreadystatechange=function()
		{
		    if (xmlhttp.readyState==4 && xmlhttp.status==200)
		    {
		        var data = JSON.parse(xmlhttp.responseText);
		        var select_city = $("#filter-city select");
		        for (var i = 0;i < data.cities.length;i ++)
		        {
		        	add_option(select_city, data.cities[i]);
		        }
		    }
		}
		$("#filter-city").css("display", "block");
	}
	else
	{
		$("#filter-city").css("display", "none");
	}
}
function filter_query_changed(id){
	switch (id)
	{
		case "filter-city":
		{
			filter.city = $("#filter-city select").val();
			console.log("city");
			break;
		}
		case "filter-time":
		{
			filter.time = $("#filter-time select").val();
			break;
		}
		case "filter-category":
		{
			filter.category = $("#filter-category select").val();
			break;
		}
		case "filter-score":
		{
			filter.score = $("#filter-score select").val();
			break;
		}
		case "filter-service":
		{
			filter.service = $("#filter-service select").val();
			break;
		}
		case "filter-environment":
		{
			filter.environment = $("#filter-environment select").val();
			break;
		}
		case "filter-taste":
		{
			filter.taste = $("#filter-taste select").val();
			break;
		}
		default:
		{

		}
	}
	send_filter_query();
}
function filter_changed(){
	if (this.id == "filter-state")
	{
		filter_state_changed();
	}
	else
	{
		filter_query_changed(this.id);
	}
}


// to do
init();
generate_all_query();
$('#filter1 [id]').change(filter_changed);