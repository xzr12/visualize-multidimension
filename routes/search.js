// Created by xuziru on 2016/12/18.
// Function: search database tool for generate json

function jsonGenerate(query) {
    var jsonRes = {}, jsonHour = {}, jsonPark = {}, jsonGoodFor = {};
    var listOr, tempJson;
    for (var key in query) {
        if (query[key] == "null") {
            continue;
        }
        var i, l, name;
        switch (key.substr(0,4)) {
            case "hour":
                listOr = [];
                var hourList = query[key].split(",");
                for (i = 0, l = hourList.length; i < l; i++) {
                    name = key + "." + hourList[i] + ".open";
                    tempJson = {};
                    tempJson[name] = {"$exists": true};
                    listOr.push(tempJson);
                }
                jsonHour['$or'] = listOr;
                break;
            case "star":
            case "revi":
                jsonRes[key] = {"$gte": Number(query[key])};
                break;
            case "attr":
                switch (key.substr(11, 4)) {
                    case "Park":
                        listOr = [];
                        var parkList = query[key].split(",");
                        for (i = 0, l = parkList.length; i < l; i++) {
                            name = key + "." + parkList[i];
                            tempJson = {};
                            tempJson[name] = true;
                            listOr.push(tempJson);
                        }
                        jsonPark["$or"] = listOr;
                        break;
                    case "Good":
                        listOr = [];
                        var goodList = query[key].split(",");
                        for (i = 0, l = goodList.length; i < l; i++) {
                            name = key + "." + goodList[i];
                            tempJson = {};
                            tempJson[name] = true;
                            listOr.push(tempJson);
                        }
                        jsonGoodFor["$or"] = listOr;
                        break;
                    case "Wi-F":
                    case "Nois":
                        var wnList = query[key].split(",");
                        jsonRes[key] = {"$in": wnList};
                        break;
                    default:
                        jsonRes[key] = Boolean(query[key]);
                }
                break;
            default:
                jsonRes[key] = query[key];
        }
    }
    return {"jsonRes": jsonRes, "jsonHour": jsonHour, "jsonPark": jsonPark, "jsonGoodFor": jsonGoodFor};
}

module.exports = jsonGenerate;