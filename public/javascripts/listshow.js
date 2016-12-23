// Created by xuziru on 2016/12/20.
// Function: function of list

function update_list() {
    $($('.list')[0]).html('');

    var options = {
        valueNames: [ 'name', 'stars', 'service', 'environment', 'food', 'price', 'count', 'address', 'category', 'business' ],
        item: '<li class="list-group-item">' +
        '<h3 class="name"></h3>' +
        '<div class="list_choose" style="display: none;"><img src="/images/right.png"></div>' +
        '<div class="stars" style="display: none"></div>' +
        '<div class="row"><div class="col-md-12"><input class="input-stars rating-loading" name="input-stars" value="5" data-size="xs"></div></div>' +
        '<div class="row col-md-12"><div class="list_left"><strong><div class="count"></div></strong></div><div class="list_left" style="margin-left: 0.5em;">reviews</div></div>' +
        '<div class="row col-md-12" style="font-size:0.85em; padding-right: 0; margin-top: 5px;">' +
        '<div class="list_left">Service</div><div class="list_left" style="margin-left: 0.25em;"><strong><div class="service"></div></strong></div>' +
        '<div class="list_left" style="margin-left: 0.25em">|<span style="margin-left: 0.25em;"></span>Envrionment</div><div class="list_left" style="margin-left: 0.25em;"><strong><div class="environment"></div></strong></div>' +
        '<div class="list_left" style="margin-left: 0.25em;">|<span style="margin-left: 0.25em;"></span>Food</div><div class="list_left" style="margin-left: 0.25em;"><strong><div class="food"></div></strong></div>' +
        '<div class="list_left" style="margin-left: 0.25em;">|<span style="margin-left: 0.25em;"></span>Price</div><div class="list_left" style="margin-left: 0.25em;"><strong><div class="price"></div></strong></div></div>' +
        '<div class="row col-md-12" style="margin-top: 5px; margin-bottom: 5px; "><strong style="text-decoration: underline;">Food categories</strong><div class="category"></div></div>' +
        '<div><strong style="text-decoration: underline;">Address</strong><div class="address"></div></div>' +
        '<div class="business" style="display: none"></div> ' +
        '</li>'
    };

    var values = [];

    var resList = new List('reslist', options, values);

    var data, stars, business_id;
    for (var i = 0, l = query_results.length; i < l; i++) {
        data = parseData(query_results[i]);
        resList.add(data);
        stars = data.stars;
        ($('.input-stars')[i]).value = stars;
        $($('.input-stars')[i]).rating({displayOnly: true, step: 0.1});
        business_id = query_results[i].business_id;
        if (getObjwithBusinessId(business_id, select_results) != null) {
            $($('.list_choose')[i]).css('display', 'block');
        }
    }

    $('.list-group-item').click(function () {
        var obj = this.children[1];
        var business_id = $(this.children[8]).text();
        var state = $(obj).css('display');
        var select_id;
        if (state == "none") {
            $(obj).css('display', 'block');
            select_id = getObjwithBusinessId(business_id, query_results);
            if (select_id != null) {
                select_results.push(query_results[select_id]);
                update_display();
            }
        }
        else {
            $(obj).css('display', 'none');
            select_id = getObjwithBusinessId(business_id, select_results);
            if (select_id != null) {
                select_results.splice(select_id, 1);
                update_display();
            }
        }
    });
}

function parseData(query) {
    var cateList = query.categories;
    var temp = [];
    var category = '';
    for (var i = 0, l = cateList.length; i < l; i++) {
        if (cateList[i] != "Restaurants") {
            temp.push(cateList[i]);
        }
    }
    for (var j = 0, k = temp.length; j < k; j++) {
        if (j == k - 1) {
            category += temp[j];
        }
        else {
            category += temp[j] + ", ";
        }
    }
    var res = {
        name: query.name,
        stars: query.stars,
        count: query.review_count,
        address: query.full_address,
        category: category,
        service: query.review.service,
        environment: query.review.environment,
        food: query.review.food,
        price: query.review.price,
        business: query.business_id
    };
    return res;
}


function getObjwithBusinessId(id, lst) {
    var business_id;
    for (var i = 0, l = lst.length; i < l; i++) {
        business_id = lst[i].business_id;
        if (id == business_id) {
            return i;
        }
    }
    return null;
}
