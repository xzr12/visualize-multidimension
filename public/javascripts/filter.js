 Filter = {
	//定义变量
	query : new Object(),
	fdom : {
		state      : $("#filter-state select"),
		city       : $("#filter-city select"),
		time       : $("#filter-time select"),
		type       : $("#filter-type select"),
		parking    : $("#filter-attr-parking select"),
		wifi       : $("#filter-attr-wifi select"),
		noiselevel : $("#filter-attr-noiselevel select"),
	},
	
	// 定义函数
	init : function(){
		// 初始化query
		this.query.review = new Object();
		this.query.attr = new Object();

		this.query.state = null;
		this.query.city = null;
		this.query.hours = null;
		this.query.attr.GoodFor = null;
		this.query.attr.Parking = null;
		this.query.attr.WiFi = null;
		this.query.attr.NoiseLevel = null;

		this.query.stars = null;
		this.query.review.service = null;
		this.query.review.environment = null;
		this.query.review.food = null;
		this.query.review.price = null;

		this.query.attr.AcceptsCreditCards = null;
		this.query.attr.HappyHour = null;
		this.query.attr.TakeReservations = null;
		this.query.attr.Open24Hours = null;

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
		this.fdom.noiselevel.select2({
		  placeholder: "Accepted noise level",
		  allowClear: true
		});
	},
	// 选择响应
	changed : function(id){
		// change query condition
		this.update_query(id);
		// abled filter-city
		if (id == "filter-state")
		{
			this.update_city_dom();
		}
		this.send_query_conditions();
	},
	update_query : function(id){
		switch (id)
		{
			case "filter-state":
			{
				if ($("#filter-state select").val() == ""){
					// $("#tags input").tagsinput('remove','state:'+filter.state);
					this.query.state = null;
				}
				else{
					// $("#tags input").tagsinput('remove','state:'+filter.state);
					this.query.state = $("#filter-state select").val();
					// $("#tags input").tagsinput('add','state:'+filter.state);
				}
				break;
			}
			case "filter-city":
			{
				this.query.city = $("#filter-city select").val();
				if (this.query.city == "")
					this.query.city = null;
				break;
			}
			case "filter-time":
			{
				this.query.hours = $("#filter-time select").val();
				break;
			}
			case "filter-type":
			{
				this.query.attr.GoodFor = $("#filter-type select").val();
				break;
			}
			case "filter-attr-parking":
			{
				this.query.attr.Parking = $("#filter-attr-parking select").val();
				break;
			}
			case "filter-attr-wifi":
			{
				this.query.attr.WiFi = $("#filter-attr-wifi select").val();
				break;
			}
			case "filter-attr-noiselevel":
			{
				this.query.attr.NoiseLevel = $("#filter-attr-noiselevel select").val();
				break;
			}
			case "filter-star":
			{
				this.query.stars = $("#filter-star input").val();
				break;
			}
			case "filter-review-service":
			{
				this.query.review.service = $("#filter-review-service input").val();
				break;
			}
			case "filter-review-environment":
			{
				this.query.review.environment = $("#filter-review-environment input").val();
				break;
			}
			case "filter-review-food":
			{
				this.query.review.food = $("#filter-review-food input").val();
				break;
			}
			case "filter-review-price":
			{
				this.query.review.price = $("#filter-review-price input").val();
				break;
			}
			case "filter-attr-AcceptsCreditCards":
			{
				if ($("#filter-attr-AcceptsCreditCards input").is(':checked'))
					this.query.attr.AcceptsCreditCards = true;
				else
					this.query.attr.AcceptsCreditCards = null;
				break;
			}
			case "filter-attr-TakeReservations":
			{
				if ($("#filter-attr-TakeReservations input").is(':checked'))
					this.query.attr.TakeReservations = true;
				else
					this.query.attr.TakeReservations = null;
				break;
			}
			case "filter-attr-Open24Hours":
			{
				if ($("#filter-attr-Open24Hours input").is(':checked'))
					this.query.attr.Open24Hours = true;
				else
					this.query.attr.Open24Hours = null;
				break;
			}
			case "filter-attr-HappyHour":
			{
				if ($("#filter-attr-HappyHour input").is(':checked'))
					this.query.attr.HappyHour = true;
				else
					this.query.attr.HappyHour = null;
				break;
			}
			default:
			{
			}
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
			xmlhttp.onreadystatechange = function(){tfilter.add_city_options_by_response(xmlhttp)};
		}
		else
		{
			this.fdom.city.prop("disabled", true);
			this.query.city = null;
		}
	},
	add_city_options_by_response : function(xmlhttp){
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
	    {
	        var data = JSON.parse(xmlhttp.responseText)[0];
	        // console.log(data);
	        this.fdom.city.append($("<option></option").text(""));
	        for (var i = 0;i < data.city.length;i ++)
	        {
	        	this.fdom.city.append($("<option></option").text(data.city[i]));
	        }
	        this.fdom.city.prop("disabled", false);
	    }
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
		xmlhttp.open("GET",("/query/filter_result.json?"+str_filter),true);
		xmlhttp.send();
		xmlhttp.onreadystatechange=function()
		{
			if (xmlhttp.readyState==4 && xmlhttp.status==200){
			    query_results = JSON.parse(xmlhttp.responseText);
			    // get intersection of select_results and query_results
			    select_results = select_results.filter(v => in_query_array(v));
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
		 str = "";
		// filter.state
		if (this.query.state != null) str += 'state=' + this.query.state + '&';
		if (this.query.city != null) str += 'city=' + this.query.city + '&';
		if (this.query.hours != null) str += 'hours=' + this.query.hours + '&';
		if (this.query.stars != null) str += 'stars=' + this.query.stars + '&';
		if (this.query.review.service != null) str += 'review.service=' + this.query.review.service + '&';
		if (this.query.review.environment != null) str += 'review.environment=' + this.query.review.environment + '&';
		if (this.query.review.food != null) str += 'review.food=' + this.query.review.food + '&';
		if (this.query.review.price != null) str += 'review.price=' + this.query.review.price + '&';
		if (this.query.attr.Parking != null) str += 'attributes.Parking=' + this.query.attr.Parking + '&';
		if (this.query.attr.WiFi != null) str += 'attributes.Wi-Fi=' + this.query.attr.WiFi + '&';
		if (this.query.attr.NoiseLevel != null) str += 'attributes.Noise-Level=' + this.query.attr.NoiseLevel + '&';
		if (this.query.attr.HappyHour != null) str += 'attributes.Happy-Hour=' + this.query.attr.HappyHour + '&';
		if (this.query.attr.AcceptsCreditCards != null) str += 'attributes.Accepts-Credit-Cards=' + this.query.attr.AcceptsCreditCards + '&';
		if (this.query.attr.TakeReservations != null) str += 'attributes.Take-Reservations=' + this.query.attr.TakeReservations + '&';
		if (this.query.attr.Open24Hours != null) str += 'attributes.Open-24-Hours=' + this.query.attr.Open24Hours + '&';
		if (this.query.attr.GoodFor != null) str += 'attributes.Good-For=' + this.query.attr.GoodFor + '&';

		str = str.substring(0, str.length-1);
		// str : "attributes.Good-For:Breakfast&attributes.Good-For:Lunch";
		return str;
	},
};