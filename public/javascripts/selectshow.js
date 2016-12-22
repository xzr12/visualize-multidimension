// Created by xuziru on 2016/12/22.
// Function: show results of select_results

function update_select () {
    var select_info = '';
    for (var i = 0, l = select_results.length; i < l; i++) {
        select_info += '<div class="select_one"><div class="select_del" style="display: none;">' +
            '<img src="/images/del.png" style="height: 100%;">' +
            '<div class="select_id" style="display: none;">' + select_results[i].business_id + '</div></div>' +
            '<div class="select_name"><strong>' + select_results[i].name + '</strong></div></div>';
    }
    $($('#select_results')[0]).html(select_info);

    $('.select_del').click(function () {
        var businessid = $(this.children[1]).text();
        var index = getObjwithBusinessId(businessid, select_results);
        if (index != null) {
            select_results.splice(index, 1);
            update_display();
        }
    });

    $('.select_one').hover(function () {
        $(this.children[0]).css('display', 'block');
    }, function () {
        $(this.children[0]).css('display', 'none');
    });
}


