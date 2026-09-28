import { formatTouchEvent, convertOnTouchStartListenerResultToPointer } from '../utils';
let qgOnTouchCancelCallback;
let qgOnTouchEndCallback;
let qgOnTouchMoveCallback;
let qgOnTouchStartCallback;
function handleTouchEvent(res, callback) {
    const dataPtr = convertOnTouchStartListenerResultToPointer({
        touches: res.touches.map(v => formatTouchEvent(v, res.type)),
        changedTouches: res.changedTouches.map(v => formatTouchEvent(v, res.type, 1)),
        timeStamp: parseInt(res.timeStamp.toString(), 10),
    });
    GameGlobal.Module.dynCall_viii(callback, dataPtr, res.touches.length, res.changedTouches.length);
    GameGlobal.Module._free(dataPtr);
}
const OnTouchCancel = (res) => {
    handleTouchEvent(res, qgOnTouchCancelCallback);
};
const OnTouchEnd = (res) => {
    handleTouchEvent(res, qgOnTouchEndCallback);
};
const OnTouchMove = (res) => {
    handleTouchEvent(res, qgOnTouchMoveCallback);
};
const OnTouchStart = (res) => {
    handleTouchEvent(res, qgOnTouchStartCallback);
};
function QG_OnTouchCancel() {
    qg.onTouchCancel(OnTouchCancel);
}
function QG_OffTouchCancel() {
    qg.offTouchCancel(OnTouchCancel);
}
function QG_OnTouchEnd() {
    qg.onTouchEnd(OnTouchEnd);
}
function QG_OffTouchEnd() {
    qg.offTouchEnd(OnTouchEnd);
}
function QG_OnTouchMove() {
    qg.onTouchMove(OnTouchMove);
}
function QG_OffTouchMove() {
    qg.offTouchMove(OnTouchMove);
}
function QG_OnTouchStart() {
    qg.onTouchStart(OnTouchStart);
}
function QG_OffTouchStart() {
    qg.offTouchStart(OnTouchStart);
}
function QG_RegisterOnTouchCancelCallback(callback) {
    qgOnTouchCancelCallback = callback;
}
function QG_RegisterOnTouchEndCallback(callback) {
    qgOnTouchEndCallback = callback;
}
function QG_RegisterOnTouchMoveCallback(callback) {
    qgOnTouchMoveCallback = callback;
}
function QG_RegisterOnTouchStartCallback(callback) {
    qgOnTouchStartCallback = callback;
}
export default {
    QG_OnTouchCancel,
    QG_OffTouchCancel,
    QG_OnTouchEnd,
    QG_OffTouchEnd,
    QG_OnTouchMove,
    QG_OffTouchMove,
    QG_OnTouchStart,
    QG_OffTouchStart,
    QG_RegisterOnTouchCancelCallback,
    QG_RegisterOnTouchEndCallback,
    QG_RegisterOnTouchMoveCallback,
    QG_RegisterOnTouchStartCallback,
};
