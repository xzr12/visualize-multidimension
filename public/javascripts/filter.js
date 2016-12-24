 Filter = {
	//定义变量
	query : new Object(),
	fdom : {
		state             : $("#filter-state select"),
		city              : $("#filter-city select"),
		time              : $("#filter-time select"),
		type              : $("#filter-type select"),
		parking           : $("#filter-parking select"),
		wifi              : $("#filter-wifi select"),
		noise             : $("#filter-noise select"),
		star              : $("#filter-star input"),
		service           : $("#filter-service input"),
		environment       : $("#filter-environment input"),
		food              : $("#filter-food input"),
		price             : $("#filter-price input"),
		AcceptsCreditCards: $("#filter-AcceptsCreditCards input"),
		TakeReservations  : $("#filter-TakeReservations input"),
		Open24Hours       : $("#filter-Open24Hours input"),
		HappyHour         : $("#filter-HappyHour input"),
	},
	
	// 定义函数
	init : function(){
		// 初始化query
		this.query.state = null;
		this.query.city = null;
		this.query.time = null;
		this.query.type = null;
		this.query.parking = null;
		this.query.wifi = null;
		this.query.noise = null;

		this.query.star = null;
		this.query.service = null;
		this.query.environment = null;
		this.query.food = null;
		this.query.price = null;

		this.query.AcceptsCreditCards = null;
		this.query.TakeReservations = null;
		this.query.Open24Hours = null;
		this.query.HappyHour = null;

		// 初始化html
		this.fdom.state.select2({
		  placeholder: "Select a state",
		  allowClear: true
		});
		this.fdom.city.select2({
		  placeholder: "Select a city",
		  allowClear: true
		});
		this.fdom.city.prop("disabled", true);
		this.fdom.time.select2({
		  placeholder: "Select a time",
		  allowClear: true
		});
		this.fdom.type.select2({
		  placeholder: "Select a type",
		  allowClear: true
		});
		this.fdom.parking.select2({
		  placeholder: "Parking demand",
		  allowClear: true
		});
		this.fdom.wifi.select2({
		  placeholder: "Wifi demand",
		  allowClear: true
		});
		this.fdom.noise.select2({
		  placeholder: "Accepted noise level",
		  allowClear: true
		});
		var tfilter = this;
		$('#tags select').on('itemRemoved', function(event) {
			tfilter.tags_changed(event.item);
		});
	},
	// 选择响应
	filter_changed : function(id){
		this.update_query_by_filter_changed(id);
		this.send_query_conditions();
		// abled filter-city
		if (id == "filter-state")
		{
			this.update_city_dom();
		}
		// update tags display
		this.update_tags_by_filter_changed();
	},
	tags_changed : function(item){
		console.log(item);
		if (item.indexOf("state") == 0){
			this.query.state = null;
			this.fdom.state.val("").trigger("change");
			this.query.city = null;
			this.fdom.city.val("").trigger("change");
		}
		else if (item.indexOf("city") == 0){
			this.query.city = null;
			this.fdom.city.val("").trigger("change");
		}
		else if (item.indexOf("time") == 0){
			this.query.time = null;
			this.fdom.time.val(null).trigger("change");
		}
		else if (item.indexOf("type") == 0){
			this.query.type = null;
			this.fdom.type.val(null).trigger("change");
		}
		else if (item.indexOf("parking") == 0){
			this.query.parking = null;
			this.fdom.parking.val(null).trigger("change");
		}
		else if (item.indexOf("wifi") == 0){
			this.query.wiFi = null;
			this.fdom.wifi.val(null).trigger("change");
		}
		else if (item.indexOf("noise") == 0){
			this.query.noise = null;
			this.fdom.noise.val(null).trigger("change");
		}
		else if (item.indexOf("star") == 0){
			this.query.star = null;
			this.fdom.star.rating('update', 0);
		}
		else if (item.indexOf("service") == 0){
			this.query.service = null;
			this.fdom.service.rating('update', 0);
		}
		else if (item.indexOf("environment") == 0){
			this.query.environment = null;
			this.fdom.environment.rating('update', 0);
		}
		else if (item.indexOf("food") == 0){
			this.query.food = null;
			this.fdom.food.rating('update', 0);
		}
		else if (item.indexOf("price") == 0){
			this.query.price = null;
			this.fdom.price.rating('update', 0);
		}
		else if (item.indexOf("Accepts") == 0){
			this.query.AcceptsCreditCards = null;
			this.fdom.AcceptsCreditCards.attr("checked",false);
 		}
 		else if (item.indexOf("Take") == 0){
			this.query.TakeReservations = null;
			this.fdom.TakeReservations.attr("checked",false);
 		}
 		else if (item.indexOf("Open") == 0){
			this.query.Open24Hours = null;
			this.fdom.Open24Hours.attr("checked",false);
 		}
 		else if (item.indexOf("Happy") == 0){
			this.query.HappyHour = null;
			this.fdom.HappyHour.attr("checked",false);
 		}
 		this.send_query_conditions();
	},
	update_query_by_filter_changed : function(id){
		switch (id)
		{
			case "filter-state":
			{
				if (this.fdom.state.val() == ""){
					this.query.state = null;
					this.query.city = null;
				}
				else{
					this.query.state = this.fdom.state.val();
				}
				break;
			}
			case "filter-city":
			{
				if (this.fdom.city.val() == ""){
					this.query.city = null;
				}
				else{
					this.query.city = this.fdom.city.val();
				}
				break;
			}
			case "filter-time":
			{
				this.query.hours = $("#filter-time select").val();
				break;
			}
			case "filter-type":
			{
				this.query.type = $("#filter-type select").val();
				break;
			}
			case "filter-parking":
			{
				this.query.parking = $("#filter-parking select").val();
				break;
			}
			case "filter-wifi":
			{
				this.query.wifi = $("#filter-wifi select").val();
				break;
			}
			case "filter-noise":
			{
				this.query.noise = $("#filter-noise select").val();
				break;
			}
			case "filter-star":
			{
				this.query.stars = $("#filter-star input").val();
				break;
			}
			case "filter-service":
			{
				this.query.service = $("#filter-service input").val();
				break;
			}
			case "filter-environment":
			{
				this.query.environment = $("#filter-environment input").val();
				break;
			}
			case "filter-food":
			{
				this.query.food = $("#filter-food input").val();
				break;
			}
			case "filter-price":
			{
				this.query.price = $("#filter-price input").val();
				break;
			}
			case "filter-AcceptsCreditCards":
			{
				if ($("#filter-AcceptsCreditCards input").is(':checked'))
					this.query.AcceptsCreditCards = true;
				else
					this.query.AcceptsCreditCards = null;
				break;
			}
			case "filter-TakeReservations":
			{
				if ($("#filter-TakeReservations input").is(':checked'))
					this.query.TakeReservations = true;
				else
					this.query.TakeReservations = null;
				break;
			}
			case "filter-Open24Hours":
			{
				if ($("#filter-Open24Hours input").is(':checked'))
					this.query.Open24Hours = true;
				else
					this.query.Open24Hours = null;
				break;
			}
			case "filter-HappyHour":
			{
				if ($("#filter-HappyHour input").is(':checked'))
					this.query.HappyHour = true;
				else
					this.query.HappyHour = null;
				break;
			}
			default:
			{
			}
		}
	},
	update_tags_by_filter_changed : function(){
		var tags_dom = $("#tags select");
		tags_dom.tagsinput('removeAll');
		if (this.query.state != null){
			tags_dom.tagsinput('add', 'state:'+this.query.state);
		}
		if (this.query.city != null){
			tags_dom.tagsinput('add', 'city:'+this.query.city);
		}
		if (this.query.hours != null){
			tags_dom.tagsinput('add', 'time:'+this.query.hours);
		}
		if (this.query.type != null){
			tags_dom.tagsinput('add', 'type:'+this.query.type);
		}
		if (this.query.parking != null){
			tags_dom.tagsinput('add', 'parking:'+this.query.parking);
		}
		if (this.query.wifi != null){
			tags_dom.tagsinput('add', 'wifi:'+this.query.wifi);
		}
		if (this.query.noise != null){
			tags_dom.tagsinput('add', 'noise:'+this.query.noise);
		}

		if (this.query.stars != null){
			tags_dom.tagsinput('add', 'star:'+this.query.stars);
		}
		if (this.query.service != null){
			tags_dom.tagsinput('add', 'service:'+this.query.service);
		}
		if (this.query.environment != null){
			tags_dom.tagsinput('add', 'environment:'+this.query.environment);
		}
		if (this.query.food != null){
			tags_dom.tagsinput('add', 'food:'+this.query.food);
		}
		if (this.query.price != null){
			tags_dom.tagsinput('add', 'food:'+this.query.price);
		}

		if (this.query.AcceptsCreditCards){
			tags_dom.tagsinput('add', 'Accepts Credit Cards √');
		}
		if (this.query.TakeReservations){
			tags_dom.tagsinput('add', 'Take Reservations √');
		}
		if (this.query.Open24Hours){
			tags_dom.tagsinput('add', 'Open 24 Hours √');
		}
		if (this.query.HappyHour){
			tags_dom.tagsinput('add', 'Happy Hour √');
		}
	},
	update_city_dom : function(){
		this.fdom.city.empty();
		if (this.query.state != null)
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
			var send_str = "/query/citylist/" + "?state=" + this.query.state;
			// console.log(send_str);
			xmlhttp.open("GET", send_str, true);
			xmlhttp.send();
			// xmlhttp.onreadystatechange = this.add_city_options_by_response(xmlhttp);
			var tfilter = this;
			xmlhttp.onreadystatechange = function(){
				if (xmlhttp.readyState==4 && xmlhttp.status==200)
			    {
			        var data = JSON.parse(xmlhttp.responseText)[0];
			        // console.log(data);
			        tfilter.fdom.city.append($("<option></option").text(""));
			        for (var i = 0;i < data.city.length;i ++)
			        {
			        	tfilter.fdom.city.append($("<option></option").text(data.city[i]));
			        }
			        tfilter.fdom.city.prop("disabled", false);
			    }
			};
		}
		else
		{
			this.fdom.city.prop("disabled", true);
		}
		this.query.city = null;
	},
	// 发送筛选条件
	send_query_conditions : function()
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
		var str_filter = this.generate_query_str();
		console.log(str_filter);
		xmlhttp.open("GET",("/query/filter_result.json?"+str_filter),true);
		xmlhttp.send();
		var tfilter = this;
		xmlhttp.onreadystatechange=function()
		{
			if (xmlhttp.readyState==4 && xmlhttp.status==200){
			    query_results = JSON.parse(xmlhttp.responseText);
			    // get intersection of select_results and query_results
			    select_results = select_results.filter(v => tfilter.in_query_array(v));
			    update_display();
			}
		}
	},
	in_query_array : function(elem){
		for (var i = 0;i < query_results.length;i ++){
			if (elem._id == query_results[i]._id){
				return true;
			}
		}
		return false;
	},
	generate_query_str : function(){
		var str = "";
		// filter.state
		if (this.query.state != null) str += 'state=' + this.query.state + '&';
		if (this.query.city != null) str += 'city=' + this.query.city + '&';
		if (this.query.hours != null) str += 'hours=' + this.query.hours + '&';
		if (this.query.stars != null) str += 'stars=' + this.query.stars + '&';
		if (this.query.service != null) str += 'review.service=' + this.query.service + '&';
		if (this.query.environment != null) str += 'review.environment=' + this.query.environment + '&';
		if (this.query.food != null) str += 'review.food=' + this.query.food + '&';
		if (this.query.price != null) str += 'review.price=' + this.query.price + '&';
		if (this.query.parking != null) str += 'attributes.Parking=' + this.query.parking + '&';
		if (this.query.wifi != null) str += 'attributes.Wi-Fi=' + this.query.wifi + '&';
		if (this.query.noise != null) str += 'attributes.Noise-Level=' + this.query.noise + '&';
		if (this.query.HappyHour != null) str += 'attributes.Happy-Hour=' + this.query.HappyHour + '&';
		if (this.query.AcceptsCreditCards != null) str += 'attributes.Accepts-Credit-Cards=' + this.query.AcceptsCreditCards + '&';
		if (this.query.TakeReservations != null) str += 'attributes.Take-Reservations=' + this.query.TakeReservations + '&';
		if (this.query.Open24Hours != null) str += 'attributes.Open-24-Hours=' + this.query.Open24Hours + '&';
		if (this.query.type != null) str += 'attributes.Good-For=' + this.query.type + '&';

		str = str.substring(0, str.length-1);
		// str : "attributes.Good-For:Breakfast&attributes.Good-For:Lunch";
		return str;
	},
};