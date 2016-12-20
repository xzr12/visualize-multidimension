// Created by xuziru on 2016/12/20.
// Function: objInList judge tool

function objInList (obj, l) {
    for (var i = 0, le = l.length; i < le; i++) {
        if(obj == l[i]) {
            return true;
        }
    }
    return false;
}

module.exports = objInList;