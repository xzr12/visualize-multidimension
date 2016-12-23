// 地图变量
map = null;

// 图标列表
var markerList = new Array();
// marker选中的Icon
var selectedIcon =  {
    url: '/images/selected.png',
    size: new google.maps.Size(30, 30),
    scaledSize: new google.maps.Size(30, 30),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(0, 32)
};

// marker没有选中时的Icon
var unselectedIcon =  {
    url: '/images/unselected.png',
    size: new google.maps.Size(30, 30),
    scaledSize: new google.maps.Size(30, 30),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(0, 32)
};

// 用户绘制的圆数组
var circleList = new Array();

// 用户绘制的矩形数组

var rectList = new Array();

// 初始化地图
function initialize()
{
    var mapProp = {
        center: new google.maps.LatLng(40.508742,-79.120850),
        zoom: 5,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map"),mapProp);
    var drawingManager = new google.maps.drawing.DrawingManager({
        drawingControl: true,
        drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [
            google.maps.drawing.OverlayType.CIRCLE,
            google.maps.drawing.OverlayType.RECTANGLE]
        }
    });
    drawingManager.setMap(map);

    // 监听绘制圆形完成事件
    google.maps.event.addListener(drawingManager, 'circlecomplete', function(circle) {
        circleList.push(circle);
    });

    // 监听绘制正方形完成事件
    google.maps.event.addListener(drawingManager, 'rectanglecomplete', function(rectangle){
        rectList.push(rectangle);
    });

    // Create the DIV to hold the control and call the CustomControl() constructor passing in this DIV.
    var selectControlDiv = document.createElement('div');
    var selectControl = new SelectControl(selectControlDiv, map, '选中');
    selectControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(selectControlDiv);

    var unselectedControlDiv = document.createElement('div');
    var unselectControl = new SelectControl(unselectedControlDiv, map, '取消选中');
    unselectedControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(unselectedControlDiv);

    var removeControlDiv = document.createElement('div');
    var removeControl = new SelectControl(removeControlDiv, map, '清除');
    removeControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(removeControlDiv);

    // showRestInfo(testList);
}
function SelectControl(controlDiv, map, text) {

    // Set CSS for the control border
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#ffffff';
    controlUI.style.borderStyle = 'solid';
    controlUI.style.borderWidth = '1px';
    controlUI.style.borderColor = '#ccc';
    controlUI.style.height = '25px';
    controlUI.style.marginTop = '5px';
    controlUI.style.marginLeft = '-2px';
    controlUI.style.paddingTop = '1px';
    controlUI.style.cursor = 'pointer';
    controlUI.style.textAlign = 'center';
    controlUI.title = text;
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior
    var controlText = document.createElement('div');
    controlText.style.fontFamily = 'Arial,sans-serif';
    controlText.style.fontSize = '10px';
    controlText.style.paddingLeft = '4px';
    controlText.style.paddingRight = '4px';
    controlText.style.marginTop = '2px';
    controlText.innerHTML = text;
    controlUI.appendChild(controlText);

    // Setup the click event listeners
    if (text == '选中') {
        google.maps.event.addDomListener(controlUI, 'click', function() {
            // 循环餐厅，检查每个餐厅是否在所画区域内
            var len = query_results.length;
            for (var i = 0; i < query_results.length; i++) {
                // 如果已在选中列表内，返回
                 if ((pos = select_results.indexOf(query_results[i])) != -1) {
                    continue;
                }
                var j;
                for (j = 0, l = circleList.length; j < l; j++) {
                    var isIn = isInCircle(circleList[j], query_results[i]);
                    if (isIn) {
                        select_results.push(query_results[i]);
                        markerList[i].setIcon(selectedIcon);
                        break
                    }
                }
                if (j < circleList.length) {
                    continue;
                }
                for (j = 0; j < rectList.length; j++) {
                    if (isInRectangle(rectList[j], query_results[i])) {
                        select_results.push(query_results[i]);
                        markerList[i].setIcon(selectedIcon);
                        break;
                    }
                }

            }
            removeShape();
            update_display('select');
        });
    } else if (text == '取消选中') {
        google.maps.event.addDomListener(controlUI, 'click', function() {
            // 循环餐厅，检查每个餐厅是否在所画区域内
            var len = query_results.length;
            for (var i = 0; i < query_results.length; i++) {
                // 如果不在选中列表内，返回
                 if ((pos = select_results.indexOf(query_results[i])) == -1) {
                    continue;
                }
                var j;
                for (j = 0, l = circleList.length; j < l; j++) {
                    var isIn = isInCircle(circleList[j], query_results[i]);
                    if (isIn) {
                        var pos = select_results.indexOf(query_results[i]);
                        select_results.splice(pos, 1);
                        markerList[i].setIcon(unselectedIcon);
                        break;
                    }
                }
                if (j < circleList.length) {
                    continue;
                }

                for (j = 0; j < rectList.length; j++) {
                    if (isInRectangle(rectList[j], query_results[i])) {
                        var pos = select_results.indexOf(query_results[i]);
                        select_results.splice(pos, 1);
                        markerList[i].setIcon(unselectedIcon);
                        break;
                    }
                }

            }
            removeShape();
            update_display('select');
        });
    } else {
        google.maps.event.addDomListener(controlUI, 'click', function() {
            removeShape();
        });
    }

}

function showSelect() {
    // body...
    for (var i = 0; i < select_results.length; i++) {
        console.log(select_results[i]);
    }
}

google.maps.event.addDomListener(window, 'load', initialize);

// 清除地图上的图形

function removeShape(){
    for (var i = 0, l = circleList.length; i < l; i++) {
        circleList[i].setMap(null);
    }
    circleList = new Array();
    for (var i = 0, l = rectList.length; i < l; i++) {
        rectList[i].setMap(null);
    }
    rectList = new Array();
}

function removeMarker() {
    // body...
    for (var i = 0; i < markerList.length; i++) {
        markerList[i].setMap(null);
    }
    markerList = new Array();
}

// 判断一个餐馆是否在一个圆形区域内
function isInCircle(circle, rest){
    if (google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng({lat: rest.latitude, lng: rest.longitude}), circle.getCenter()) <= circle.getRadius()) {
        return true;
    } else {
        return false;
    }
}

// 判断一个餐馆是否在长方形内
function isInRectangle(rectangle, rest){
    var position = new google.maps.LatLng({lat: rest.latitude, lng: rest.longitude});
    if (rectangle.getBounds().contains(position)) {
        return true;
    }
    return false;
}

function update_map(type) {
    // body...
    if (type == 'select') {
        for (var i = 0; i < query_results.length; i++) {
            if (isInSelectList(query_results[i]) != -1) {
                markerList[i].setIcon(selectedIcon);
            } else {
                markerList[i].setIcon(unselectedIcon);
            }
        }
        return;
    }
    removeMarker();
    removeShape();
    if (query_results == null || query_results.length == 0) {
        return;
    }
    showRestInfo(query_results);
}

function isInSelectList(rest){
    for (var i = 0, l = select_results.length; i < l; i++) {
        if (rest.business_id == select_results[i].business_id) {
            return i;
        }
    }
    return -1;
}

// 显示餐馆信息，参数是json 数组, 调用的函数
function showRestInfo() {
    var len = query_results.length;
    query_results.forEach(function(rest, index, all){
        var infowindow = new google.maps.InfoWindow({
            content: rest.name + "</br>" + getStarRatingFieldset(rest.stars)
        });
        var place = new google.maps.LatLng(rest.latitude, rest.longitude);
        // market样式
        var marker = new google.maps.Marker({
                    position: place,
                    icon: unselectedIcon
                });
        if (isInSelectList(rest) != -1) {
            marker.setIcon(selectedIcon);
        }
        marker.setMap(map);

        // 鼠标移动到marker时显示餐馆信息
        google.maps.event.addListener(marker, 'mouseover', function() {
            infowindow.open(map, marker);
        });
        // 鼠标移动到marker外时餐馆信息不显示
        google.maps.event.addListener(marker, 'mouseout', function() {
            infowindow.close();
        });
        // marker点击事件，选中或者不选中状态切换
        google.maps.event.addListener(marker, 'click', function(){
            if ((pos = isInSelectList(rest)) != -1) {
                select_results.splice(pos, 1);
                marker.setIcon(unselectedIcon);
            } else {
                select_results.push(rest);
                marker.setIcon(selectedIcon);
            }
            update_display('select');
        });
        markerList.push(marker);
    });

    changeCenter();
}

//按照餐厅的经纬度进行地图缩放
function changeCenter() {
    var latlngbounds = new google.maps.LatLngBounds();
    var len = query_results.length;
    for (var i = 0; i < query_results.length; i++) {
        latlngbounds.extend(new google.maps.LatLng(query_results[i].latitude, query_results[i].longitude));
    }
    map.fitBounds(latlngbounds);
}

// 根据星级获取star rating
function getStarRatingFieldset(stars) {
    var num = Math.floor(stars);
    var dot = stars - num;
    var starhalf = new Array(5);
    var star = new Array(5);
    for (var i = 0; i < num; i++) {
        star[i] = 'yellow';
        starhalf[i] = 'yellow';
    }
    if (dot > 0.5) {
        star[num] = 'yellow';
        starhalf[num] = 'yellow';
    } else if (dot > 0) {
        starhalf[num] = 'yellow';
    }
    var starsRating = '<fieldset class="rating"> '+
        '<input type="radio" id="star5" name="rating" value="5" /><label class = "full ' + star[4] + '" for="star5" title="Awesome - 5 stars"></label>'+
        '<input type="radio" id="star4half" name="rating" value="4 and a half" /><label class="half ' + starhalf[4] + '" for="star4half" title="Pretty good - 4.5 stars"></label>'+
        '<input type="radio" id="star4" name="rating" value="4" /><label class = "full  ' + star[3] + '" for="star4" title="Pretty good - 4 stars"></label>'+
        '<input type="radio" id="star3half" name="rating" value="3 and a half" /><label class="half ' + starhalf[3] + '" for="star3half" title="Meh - 3.5 stars"></label>'+
        '<input type="radio" id="star3" name="rating" value="3" /><label class = "full  ' + star[2] + '" for="star3" title="Meh - 3 stars"></label>'+
        '<input type="radio" id="star2half" name="rating" value="2 and a half" /><label class="half ' + starhalf[2] + '" for="star2half" title="Kinda bad - 2.5 stars"></label>'+
        '<input type="radio" id="star2" name="rating" value="2" /><label class = "full  ' + star[1] + '" for="star2" title="Kinda bad - 2 stars"></label>'+
        '<input type="radio" id="star1half" name="rating" value="1 and a half" /><label class="half ' + starhalf[1] + '" for="star1half" title="Meh - 1.5 stars"></label>'+
        '<input type="radio" id="star1" name="rating" value="1" /><label class = "full ' + star[0] + '" for="star1" title="Sucks big time - 1 star"></label>'+
        '<input type="radio" id="starhalf" name="rating" value="half" /><label class="half ' + starhalf[0] + '" for="starhalf" title="Sucks big time - 0.5 stars"></label>'+
    '</fieldset>';
    return starsRating;
}
