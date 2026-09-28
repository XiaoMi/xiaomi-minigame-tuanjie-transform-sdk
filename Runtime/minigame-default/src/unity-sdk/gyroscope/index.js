import { formatJsonStr, formatResponse, convertDataToPointer } from '../utils';
let qgStartGyroscopeCallback;
let qgStopGyroscopeCallback;
let qgOnGyroscopeChangeCallback;
const OnGyroscopeChange = (res) => {
    formatResponse('OnGyroscopeChangeListenerResult', res);
    const xPtr = convertDataToPointer(res.x);
    const yPtr = convertDataToPointer(res.y);
    const zPtr = convertDataToPointer(res.z);
    if(qgOnGyroscopeChangeCallback){
        GameGlobal.Module.dynCall_viii(qgOnGyroscopeChangeCallback, xPtr, yPtr, zPtr);
    }
    GameGlobal.Module._free(xPtr);
    GameGlobal.Module._free(yPtr);
    GameGlobal.Module._free(zPtr);
};
function handleCallback(callback, id, callbackType, res) {
    formatResponse('GeneralCallbackResult', res);
    const idPtr = convertDataToPointer(id);
    const msgPtr = convertDataToPointer(res.errMsg);
    GameGlobal.Module.dynCall_viii(callback, idPtr, callbackType, msgPtr);
    GameGlobal.Module._free(idPtr);
    GameGlobal.Module._free(msgPtr);
}
function QG_StartGyroscope(id, conf) {
    const config = formatJsonStr(conf);
    qg.startGyroscope({
        ...config,
        success(res) {
            handleCallback(qgStartGyroscopeCallback, id, 2, res);
        },
        fail(res) {
            handleCallback(qgStartGyroscopeCallback, id, 1, res);
        },
        complete(res) {
            handleCallback(qgStartGyroscopeCallback, id, 0, res);
        },
    });
}
function QG_StopGyroscope(id, conf) {
    const config = formatJsonStr(conf);
    qg.stopGyroscope({
        ...config,
        success(res) {
            handleCallback(qgStopGyroscopeCallback, id, 2, res);
        },
        fail(res) {
            handleCallback(qgStopGyroscopeCallback, id, 1, res);
        },
        complete(res) {
            handleCallback(qgStopGyroscopeCallback, id, 0, res);
        },
    });
}
function QG_OnGyroscopeChange() {
    qg.onGyroscopeChange(OnGyroscopeChange);
}
function QG_OffGyroscopeChange() {
    qg.offGyroscopeChange();
}
function QG_RegisterStartGyroscopeCallback(callback) {
    qgStartGyroscopeCallback = callback;
}
function QG_RegisterStopGyroscopeCallback(callback) {
    qgStopGyroscopeCallback = callback;
}
function QG_RegisterOnGyroscopeChangeCallback(callback) {
    qgOnGyroscopeChangeCallback = callback;
}
export default {
    QG_StartGyroscope,
    QG_StopGyroscope,
    QG_OnGyroscopeChange,
    QG_OffGyroscopeChange,
    QG_RegisterStartGyroscopeCallback,
    QG_RegisterStopGyroscopeCallback,
    QG_RegisterOnGyroscopeChangeCallback,
};
