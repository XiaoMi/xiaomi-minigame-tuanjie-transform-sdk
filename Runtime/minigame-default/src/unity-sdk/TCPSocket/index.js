import { formatJsonStr, uid, onEventCallback, offEventCallback, getListObject, convertInfoToPointer, formatResponse, convertDataToPointer } from '../utils';
const TCPSocketList = {};
const qgTCPSocketBindWifiList = {};
const qgTCPSocketCloseList = {};
const qgTCPSocketConnectList = {};
const qgTCPSocketErrorList = {};
const qgTCPSocketMessageList = {};
const getTCPSocketObject = getListObject(TCPSocketList, 'TCPSocket');
let qgTCPSocketOnMessageCallback;
function QG_CreateTCPSocket() {
    const obj = qg.createTCPSocket();
    const key = uid();
    TCPSocketList[key] = obj;
    return key;
}
function QG_TCPSocketBindWifi(id, option) {
    const obj = getTCPSocketObject(id);
    if (!obj) {
        return;
    }
    obj.bindWifi(formatJsonStr(option));
}
function QG_TCPSocketClose(id) {
    const obj = getTCPSocketObject(id);
    if (!obj) {
        return;
    }
    obj.close();
    delete TCPSocketList[id];
}
function QG_TCPSocketConnect(id, option) {
    const obj = getTCPSocketObject(id);
    if (!obj) {
        return;
    }
    obj.connect(formatJsonStr(option));
}
function QG_TCPSocketWriteString(id, data) {
    const obj = getTCPSocketObject(id);
    if (!obj) {
        return;
    }
    obj.write(data);
}
function QG_TCPSocketWriteBuffer(id, dataPtr, dataLength) {
    const obj = getTCPSocketObject(id);
    if (!obj) {
        return;
    }
    obj.write(GameGlobal.Module.HEAPU8.buffer.slice(dataPtr, dataPtr + dataLength));
}
function QG_TCPSocketOffBindWifi(id) {
    const obj = getTCPSocketObject(id);
    if (!obj) {
        return;
    }
    offEventCallback(qgTCPSocketBindWifiList, (v) => {
        obj.offBindWifi(v);
    }, id);
}
function QG_TCPSocketOffClose(id) {
    const obj = getTCPSocketObject(id);
    if (!obj) {
        return;
    }
    offEventCallback(qgTCPSocketCloseList, (v) => {
        obj.offClose(v);
    }, id);
}
function QG_TCPSocketOffConnect(id) {
    const obj = getTCPSocketObject(id);
    if (!obj) {
        return;
    }
    offEventCallback(qgTCPSocketConnectList, (v) => {
        obj.offConnect(v);
    }, id);
}
function QG_TCPSocketOffError(id) {
    const obj = getTCPSocketObject(id);
    if (!obj) {
        return;
    }
    offEventCallback(qgTCPSocketErrorList, (v) => {
        obj.offError(v);
    }, id);
}
function QG_TCPSocketOffMessage(id) {
    const obj = getTCPSocketObject(id);
    if (!obj) {
        return;
    }
    offEventCallback(qgTCPSocketMessageList, (v) => {
        obj.offMessage(v);
    }, id);
}
function QG_TCPSocketOnBindWifi(id) {
    const obj = getTCPSocketObject(id);
    if (!obj) {
        return;
    }
    const callback = onEventCallback(qgTCPSocketBindWifiList, '_TCPSocketOnBindWifiCallback', id, id);
    obj.onBindWifi(callback);
}
function QG_TCPSocketOnClose(id) {
    const obj = getTCPSocketObject(id);
    if (!obj) {
        return;
    }
    const callback = onEventCallback(qgTCPSocketCloseList, '_TCPSocketOnCloseCallback', id, id);
    obj.onClose(callback);
}
function QG_TCPSocketOnConnect(id) {
    const obj = getTCPSocketObject(id);
    if (!obj) {
        return;
    }
    const callback = onEventCallback(qgTCPSocketConnectList, '_TCPSocketOnConnectCallback', id, id);
    obj.onConnect(callback);
}
function QG_TCPSocketOnError(id) {
    const obj = getTCPSocketObject(id);
    if (!obj) {
        return;
    }
    const callback = onEventCallback(qgTCPSocketErrorList, '_TCPSocketOnErrorCallback', id, id);
    obj.onError(callback);
}
function QG_TCPSocketOnMessage(id, needInfo) {
    const obj = getTCPSocketObject(id);
    if (!obj) {
        return;
    }
    if (!qgTCPSocketMessageList[id]) {
        qgTCPSocketMessageList[id] = [];
    }
    const callback = (res) => {
        formatResponse('TCPSocketOnMessageListenerResult', res);
        const idPtr = convertDataToPointer(id);
        const messagePtr = convertDataToPointer(res.message);
        if (needInfo) {
            const localInfoPtr = convertInfoToPointer(res.localInfo);
            const remoteInfoPtr = convertInfoToPointer(res.remoteInfo);
            GameGlobal.Module.dynCall_viiiii(qgTCPSocketOnMessageCallback, idPtr, messagePtr, res.message.length || res.message.byteLength, localInfoPtr, remoteInfoPtr);
            GameGlobal.Module._free(localInfoPtr);
            GameGlobal.Module._free(remoteInfoPtr);
        }
        else {
            GameGlobal.Module.dynCall_viiiii(qgTCPSocketOnMessageCallback, idPtr, messagePtr, res.message.length || res.message.byteLength, 0, 0);
        }
        GameGlobal.Module._free(idPtr);
        GameGlobal.Module._free(messagePtr);
    };
    qgTCPSocketMessageList[id].push(callback);
    obj.onMessage(callback);
}
function QG_RegisterTCPSocketOnMessageCallback(callback) {
    qgTCPSocketOnMessageCallback = callback;
}
export default {
    QG_CreateTCPSocket,
    QG_TCPSocketBindWifi,
    QG_TCPSocketClose,
    QG_TCPSocketConnect,
    QG_TCPSocketWriteString,
    QG_TCPSocketWriteBuffer,
    QG_TCPSocketOffBindWifi,
    QG_TCPSocketOffClose,
    QG_TCPSocketOffConnect,
    QG_TCPSocketOffError,
    QG_TCPSocketOffMessage,
    QG_TCPSocketOnBindWifi,
    QG_TCPSocketOnClose,
    QG_TCPSocketOnConnect,
    QG_TCPSocketOnError,
    QG_TCPSocketOnMessage,
    QG_RegisterTCPSocketOnMessageCallback,
};
