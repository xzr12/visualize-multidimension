// Created by xuziru on 2016/12/18.
// Function: search database tool for generate json

function jsonGenerate(query) {
    var jsonRes;
    for (var key in query) {
        if (query[key] != 'null') {
            console.log(key);
            console.log(request[key]);
        }
        console.log(key.substr(0,4));
    }
    return jsonRes;
}

module.exports = jsonGenerate;