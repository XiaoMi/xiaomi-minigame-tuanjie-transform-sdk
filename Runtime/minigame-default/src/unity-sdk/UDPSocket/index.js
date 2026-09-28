import { formatJsonStr, uid, onEventCallback, offEventCallback, getListObject, convertDataToPointer, convertInfoToPointer, formatResponse } from '../utils';
const UDPSocketList = {};
const qgUDPSocketCloseList = {};
const qgUDPSocketErrorList = {};
const qgUDPSocketListeningList = {};
const qgUDPSocketMessageList = {};
const getUDPSocketObject = getListObject(UDPSocketList, 'UDPSocket');
let qgUDPSocketOnMessageCallback;
function QG_CreateUDPSocket() {
    const obj = qg.createUDPSocket();
    const key = uid();
    UDPSocketList[key] = obj;
    return key;
}
function QG_UDPSocketClose(id) {
    const obj = getUDPSocketObject(id);
    if (!obj) {
        return;
    }
    obj.close();
    delete UDPSocketList[id];
}
function QG_UDPSocketConnect(id, option) {
    const obj = getUDPSocketObject(id);
    if (!obj) {
        return;
    }
    obj.connect(formatJsonStr(option));
}
function QG_UDPSocketOffClose(id) {
    const obj = getUDPSocketObject(id);
    if (!obj) {
        return;
    }
    offEventCallback(qgUDPSocketCloseList, (v) => {
        obj.offClose(v);
    }, id);
}
function QG_UDPSocketOffError(id) {
    const obj = getUDPSocketObject(id);
    if (!obj) {
        return;
    }
    offEventCallback(qgUDPSocketErrorList, (v) => {
        obj.offError(v);
    }, id);
}
function QG_UDPSocketOffListening(id) {
    const obj = getUDPSocketObject(id);
    if (!obj) {
        return;
    }
    offEventCallback(qgUDPSocketListeningList, (v) => {
        obj.offListening(v);
    }, id);
}
function QG_UDPSocketOffMessage(id) {
    const obj = getUDPSocketObject(id);
    if (!obj) {
        return;
    }
    offEventCallback(qgUDPSocketMessageList, (v) => {
        obj.offMessage(v);
    }, id);
}
function QG_UDPSocketOnClose(id) {
    const obj = getUDPSocketObject(id);
    if (!obj) {
        return;
    }
    const callback = onEventCallback(qgUDPSocketCloseList, '_UDPSocketOnCloseCallback', id, id);
    obj.onClose(callback);
}
function QG_UDPSocketOnError(id) {
    const obj = getUDPSocketObject(id);
    if (!obj) {
        return;
    }
    const callback = onEventCallback(qgUDPSocketErrorList, '_UDPSocketOnErrorCallback', id, id);
    obj.onError(callback);
}
function QG_UDPSocketOnListening(id) {
    const obj = getUDPSocketObject(id);
    if (!obj) {
        return;
    }
    const callback = onEventCallback(qgUDPSocketListeningList, '_UDPSocketOnListeningCallback', id, id);
    obj.onListening(callback);
}
function QG_UDPSocketOnMessage(id, needInfo) {
    const obj = getUDPSocketObject(id);
    if (!obj) {
        return;
    }
    if (!qgUDPSocketMessageList[id]) {
        qgUDPSocketMessageList[id] = [];
    }
    const callback = (res) => {
        formatResponse('UDPSocketOnMessageListenerResult', res);
        const idPtr = convertDataToPointer(id);
        const messagePtr = convertDataToPointer(res.message);
        if (needInfo) {
            const localInfoPtr = convertInfoToPointer(res.localInfo);
            const remoteInfoPtr = convertInfoToPointer(res.remoteInfo);
            GameGlobal.Module.dynCall_viiiii(qgUDPSocketOnMessageCallback, idPtr, messagePtr, res.message.length || res.message.byteLength, localInfoPtr, remoteInfoPtr);
            GameGlobal.Module._free(localInfoPtr);
            GameGlobal.Module._free(remoteInfoPtr);
        }
        else {
            GameGlobal.Module.dynCall_viiiii(qgUDPSocketOnMessageCallback, idPtr, messagePtr, res.message.length || res.message.byteLength, 0, 0);
        }
        GameGlobal.Module._free(idPtr);
        GameGlobal.Module._free(messagePtr);
    };
    qgUDPSocketMessageList[id].push(callback);
    obj.onMessage(callback);
}
function QG_UDPSocketSendString(id, data, param) {
    const obj = getUDPSocketObject(id);
    if (!obj) {
        return;
    }
    const config = formatJsonStr(param);
    obj.send({
        address: config.address,
        message: data,
        port: config.port,
        setBroadcast: config.setBroadcast,
    });
}
function QG_UDPSocketSendBuffer(id, dataPtr, dataLength, param) {
    const obj = getUDPSocketObject(id);
    if (!obj) {
        return;
    }
    const config = formatJsonStr(param);
    obj.send({
        address: config.address,
        message: GameGlobal.Module.HEAPU8.buffer.slice(dataPtr, dataPtr + dataLength),
        port: config.port,
        length: config.length,
        offset: config.offset,
        setBroadcast: config.setBroadcast,
    });
}
function QG_UDPSocketSetTTL(id, ttl) {
    const obj = getUDPSocketObject(id);
    if (!obj) {
        return;
    }
    obj.setTTL(ttl);
}
function QG_UDPSocketWriteString(id, data, param) {
    const obj = getUDPSocketObject(id);
    if (!obj) {
        return;
    }
    const config = formatJsonStr(param);
    obj.write({
        address: config.address,
        message: data,
        port: config.port,
        setBroadcast: config.setBroadcast,
    });
}
function QG_UDPSocketWriteBuffer(id, dataPtr, dataLength, param) {
    const obj = getUDPSocketObject(id);
    if (!obj) {
        return;
    }
    const config = formatJsonStr(param);
    obj.write({
        address: config.address,
        message: GameGlobal.Module.HEAPU8.buffer.slice(dataPtr, dataPtr + dataLength),
        port: config.port,
        length: config.length,
        offset: config.offset,
        setBroadcast: config.setBroadcast,
    });
}
function QG_UDPSocketBind(id, param) {
    const obj = getUDPSocketObject(id);
    if (!obj) {
        return 0;
    }
    const config = formatJsonStr(param);
    return obj.bind(config.port);
}
function QG_RegisterUDPSocketOnMessageCallback(callback) {
    qgUDPSocketOnMessageCallback = callback;
}
export default {
    QG_CreateUDPSocket,
    QG_UDPSocketBind,
    QG_UDPSocketClose,
    QG_UDPSocketConnect,
    QG_UDPSocketOffClose,
    QG_UDPSocketOffError,
    QG_UDPSocketOffListening,
    QG_UDPSocketOffMessage,
    QG_UDPSocketOnClose,
    QG_UDPSocketOnError,
    QG_UDPSocketOnListening,
    QG_UDPSocketOnMessage,
    QG_UDPSocketSendString,
    QG_UDPSocketSendBuffer,
    QG_UDPSocketSetTTL,
    QG_UDPSocketWriteString,
    QG_UDPSocketWriteBuffer,
    QG_RegisterUDPSocketOnMessageCallback,
};
