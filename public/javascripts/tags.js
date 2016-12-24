var Tags = {
	// 定义变量
	// 定义函数
	update_by_filter : function(filter_id){
		switch (filter_id)
		{
			case "filter-state":
			{
				if (this.fdom.state.val() == ""){
					this.query.state = null;
				}
				else{
					$("#tags input").tagsinput('remove','state:'+filter.state);
					$("#tags input").tagsinput('add','state:'+filter.state);
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
	}
}