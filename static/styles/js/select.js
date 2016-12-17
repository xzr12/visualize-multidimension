//生成所有选择框
function generate_all_query(){
	// select-state
	var select_state = $("#select-state select");
	add_option(select_state, "不限");
	add_option(select_state, "Alabama");
	add_option(select_state, "Alaska");
	add_option(select_state, "Arizona");
	add_option(select_state, "Arkansas");
	add_option(select_state, "California");
	add_option(select_state, "Colorado");
	add_option(select_state, "Connecticut");
	add_option(select_state, "Delaware");
	add_option(select_state, "Florida");
	add_option(select_state, "Georgia");
	add_option(select_state, "Hawaii");
	add_option(select_state, "Idaho");
	add_option(select_state, "Illinois");
	add_option(select_state, "Indiana");
	add_option(select_state, "Iowa");
	add_option(select_state, "Kansas");
	add_option(select_state, "Kentucky");
	add_option(select_state, "Louisiana");
	add_option(select_state, "Maine");
	add_option(select_state, "Maryland");
	add_option(select_state, "Massachusetts");
	add_option(select_state, "Michigan");
	add_option(select_state, "Minnesota");
	add_option(select_state, "Mississippi");
	add_option(select_state, "Missouri");
	add_option(select_state, "Montana");
	add_option(select_state, "Nebraska");
	add_option(select_state, "Nevada");
	add_option(select_state, "New Hampshire");
	add_option(select_state, "New Jersey");
	add_option(select_state, "New Mexico");
	add_option(select_state, "New York");
	add_option(select_state, "North Carolina");
	add_option(select_state, " North Dakota");
	add_option(select_state, "Ohio");
	add_option(select_state, "Oklahoma");
	add_option(select_state, "Oregon");
	add_option(select_state, "Pennsylvania");
	add_option(select_state, "Rhode Island");
	add_option(select_state, "South Carolina");
	add_option(select_state, "South Dakota");
	add_option(select_state, "Tennessee");
	add_option(select_state, "Texas");
	add_option(select_state, "Utah");
	add_option(select_state, "Vermont");
	add_option(select_state, "Virginia");
	add_option(select_state, "Washington");
	add_option(select_state, "West Virginia");
	add_option(select_state, "Wisconsin");
	add_option(select_state, "Wyoming");
	
	//select-time
	var select_time = $("#select-time select");
	add_option(select_time, "不限");
	add_option(select_time, "Weekday");
	add_option(select_time, "Weekend");
	add_option(select_time, "Monday");	
	add_option(select_time, "Tuesday");	
	add_option(select_time, "Wednesday");	
	add_option(select_time, "Thursday");	
	add_option(select_time, "Friday");	
	add_option(select_time, "Saturday");	
	add_option(select_time, "Sunday");
}
function add_option(dst, content){
	var select = $(dst);
	var option = $("<option></option");
	option.text(content);
	select.append(option);
}

//select选择响应
function get_city_list(){
	var state = $("#select-state select").val();
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
		        var select_city = $("#select-city select");
		        for (var i = 0;i < data.cities.length;i ++)
		        {
		        	add_option(select_city, data.cities[i]);
		        }
		    }
		}
		$("#select-city").css("display", "block");
	}
	else
	{
		$("#select-city").css("display", "none");
	}
}
function select_other_query(){

}


// to do
generate_all_query();
$('#select-state select').change(get_city_list);