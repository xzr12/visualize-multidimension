// Created by xuziru on 2016/12/13.
// Function: some tools to show process of data mining

function printSpeedInfo (counter, startTime) {
    var t = msToS(getSpentTime(startTime));
    var s = counter / t;
    if (!isFinite(s)) s = counter;
    console.log('read %s lines, speed: %sL/S', counter, s.toFixed(0));
}

function msToS (v) {
    return parseInt(v / 1000, 10);
}

function getSpentTime (startTime) {
    return Date.now() - startTime;
}

module.exports = printSpeedInfo;