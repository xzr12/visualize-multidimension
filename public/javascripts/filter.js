// filter:{"state","city","time","category","score","service","environment","taste"}

//初始化filter对象
function init_filter()
{
	// init filter variable
	filter.review = new Object();
	filter.attr = new Object();
	
	filter.state = null;
	filter.city = null;
	filter.hours = null;
	filter.attr.GoodFor = null;
	filter.attr.Parking = null;
	filter.attr.WiFi = null;
	filter.attr.NoiseLevel = null;
	
	filter.stars = null;
	filter.review.service = null;
	filter.review.environment = null;
	filter.review.food = null;
	filter.review.price = null;
	
	filter.attr.AcceptsCreditCards = null;
	filter.attr.HappyHour = null;
	filter.attr.TakeReservations = null;
	filter.attr.Open24Hours = null;	

	// init filter doms
	init_all_filters();
	$('#filter [id]').change(filter_changed);
}
//初始化所有选择框
function init_all_filters(){
	//filter-state
	var filter_state = $("#filter-state select");
	filter_state.select2({
	  placeholder: "Select a state",
	  allowClear: true
	});
	var filter_city = $("#filter-city select");
	filter_city.select2({
	  placeholder: "Select a city",
	  allowClear: true
	});
	filter_city.prop("disabled", true);
	//filter-time
	var filter_time = $("#filter-time select");
	filter_time.select2({
	  placeholder: "Select a time",
	  allowClear: true
	});
	//filter-type
	var filter_type = $("#filter-type select");
	filter_type.select2({
	  placeholder: "Select a type",
	  allowClear: true
	});
	//filter-parking
	var filter_parking = $("#filter-attr-parking select");
	filter_parking.select2({
	  placeholder: "Parking demand",
	  allowClear: true
	});
	//filter-wifi
	var filter_wifi = $("#filter-attr-wifi select");
	filter_wifi.select2({
	  placeholder: "Wifi demand",
	  allowClear: true
	});
	//filter-noiselevel
	var filter_noiselevel = $("#filter-attr-noiselevel select");
	filter_noiselevel.select2({
	  placeholder: "Accepted noise level",
	  allowClear: true
	});
}

// 选择响应
function filter_changed(){
	// change query condition
	change_query_conditions(this.id);
	// abled filter-city
	if (this.id == "filter-state")
	{
		generate_city_options();
	}
	send_query_conditions();
}
function change_query_conditions(id){
	switch (id)
	{
		case "filter-state":
		{
			filter.state = $("#filter-state select").val();
			if (filter.state == "")
				filter.state = null;
			break;
		}
		case "filter-city":
		{
			filter.city = $("#filter-city select").val();
			break;
		}
		case "filter-time":
		{
			filter.hours = $("#filter-time select").val();
			break;
		}
		case "filter-type":
		{
			filter.attr.GoodFor = $("#filter-type select").val();
			break;
		}
		case "filter-attr-parking":
		{
			filter.attr.Parking = $("#filter-attr-parking select").val();
			break;
		}
		case "filter-attr-wifi":
		{
			filter.attr.WiFi = $("#filter-attr-wifi select").val();
			break;
		}
		case "filter-attr-noiselevel":
		{
			filter.attr.NoiseLevel = $("#filter-attr-noiselevel select").val();
			break;
		}
		case "filter-star":
		{
			filter.stars = $("#filter-star input").val();
			break;
		}
		case "filter-review-service":
		{
			filter.review.service = $("#filter-review-service input").val();
			break;
		}
		case "filter-review-environment":
		{
			filter.review.environment = $("#filter-review-environment input").val();
			break;
		}
		case "filter-review-food":
		{
			filter.review.food = $("#filter-review-food input").val();
			break;
		}
		case "filter-review-price":
		{
			filter.review.price = $("#filter-review-price input").val();
			break;
		}
		case "filter-attr-AcceptsCreditCards":
		{
			if ($("#filter-attr-AcceptsCreditCards input").is(':checked'))
				filter.attr.AcceptsCreditCards = true;
			else
				filter.attr.AcceptsCreditCards = null;
			break;
		}
		case "filter-attr-TakeReservations":
		{
			if ($("#filter-attr-TakeReservations input").is(':checked'))
				filter.attr.TakeReservations = true;
			else
				filter.attr.TakeReservations = null;
			break;
		}
		case "filter-attr-Open24Hours":
		{
			if ($("#filter-attr-Open24Hours input").is(':checked'))
				filter.attr.Open24Hours = true;
			else
				filter.attr.Open24Hours = null;
			break;
		}
		case "filter-attr-HappyHour":
		{
			if ($("#filter-attr-HappyHour input").is(':checked'))
				filter.attr.HappyHour = true;
			else
				filter.attr.HappyHour = null;
			break;
		}
		default:
		{
		}
	}
}
function generate_city_options(){
	var state = $("#filter-state select").val();
	if (state != "")
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
		        var filter_city = $("#filter-city select");
		        for (var i = 0;i < data.cities.length;i ++)
		        {
		        	add_option(filter_city, data.cities[i]);
		        }
		    }
		}
		$("#filter-city select").prop("disabled", false);
	}
	else
	{
		$("#filter-city select").prop("disabled", true);
	}
}
function add_option(dst, content){
	var select = $(dst);
	var option = $("<option></option");
	option.text(content);
	select.append(option);
}

// 发送筛选条件
function send_query_conditions()
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
	// var str_filter = 'state=' + filter.state + '&' + 'city=' + filter.city + '&' + 'time=' + filter.time + '&' + 'category=' + filter.category;
	var str_filter = generate_query_str();
	console.log(str_filter);
	xmlhttp.open("GET",("/query/filter_result.json?"+str_filter),true);
	xmlhttp.send();
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200){
		    query_results = JSON.parse(xmlhttp.responseText);
		    console.log(query_results);
		    // update_by_query_results();
		}
	}
}
function generate_query_str(){
	var str = "";
	// filter.state
	if (filter.state != null) str += 'state=' + filter.state + '&';
	if (filter.city != null) str += 'city=' + filter.city + '&';
	if (filter.hours != null) str += 'hours=' + filter.hours + '&';
	if (filter.stars != null) str += 'stars=' + filter.stars + '&';
	if (filter.review.service != null) str += 'review.service=' + filter.review.service + '&';
	if (filter.review.environment != null) str += 'review.environment=' + filter.review.environment + '&';
	if (filter.review.food != null) str += 'review.food=' + filter.review.food + '&';
	if (filter.review.price != null) str += 'review.price=' + filter.review.price + '&';
	if (filter.attr.Parking != null) str += 'attributes.Parking=' + filter.attr.Parking + '&';
	if (filter.attr.WiFi != null) str += 'attributes.Wi-Fi=' + filter.attr.WiFi + '&';
	if (filter.attr.NoiseLevel != null) str += 'attributes.Noise-Level=' + filter.attr.NoiseLevel + '&';
	if (filter.attr.HappyHour != null) str += 'attributes.Happy-Hour=' + filter.attr.HappyHour + '&';
	if (filter.attr.AcceptsCreditCards != null) str += 'attributes.Accepts-Credit-Cards=' + filter.attr.AcceptsCreditCards + '&';
	if (filter.attr.TakeReservations != null) str += 'attributes.Take-Reservations=' + filter.attr.TakeReservations + '&';
	if (filter.attr.Open24Hours != null) str += 'attributes.Open-24-Hours=' + filter.attr.Open24Hours + '&';
	if (filter.attr.GoodFor != null) str += 'attributes.Good-For=' + filter.attr.GoodFor + '&';

	str = str.substring(0, str.length-1);
	// str = "attributes.Good-For=Breakfast&attributes.Good-For=Lunch";
	return str;
}
// update right-list-group & thumbnails & map & summarize
function update_by_query_results(){
	update_right_list_group();
	update_thumbnails();
	update_map();
	update_summarize();
}