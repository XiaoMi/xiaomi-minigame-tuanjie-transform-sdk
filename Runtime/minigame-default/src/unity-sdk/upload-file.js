import moduleHelper from './module-helper';
import { formatJsonStr, getListObject, offEventCallback, onEventCallback } from './utils';
const uploadTaskList = {};
const qgUpdateTaskOnProgressList = {};
const qgUpdateTaskOnHeadersList = {};
const getObject = getListObject(uploadTaskList, 'uploadTask');
export default {
    QG_UploadFile(option, callbackId) {
        const conf = formatJsonStr(option);
        const obj = qg.uploadFile({
            ...conf,
            success: (res) => {
                moduleHelper.send('UploadFileCallback', JSON.stringify({
                    callbackId,
                    type: 'success',
                    res: JSON.stringify(res),
                }));
            },
            fail: (res) => {
                moduleHelper.send('UploadFileCallback', JSON.stringify({
                    callbackId,
                    type: 'fail',
                    res: JSON.stringify(res),
                }));
            },
            complete: (res) => {
                moduleHelper.send('UploadFileCallback', JSON.stringify({
                    callbackId,
                    type: 'complete',
                    res: JSON.stringify(res),
                }));
                setTimeout(() => {
                    if (uploadTaskList) {
                        delete uploadTaskList[callbackId];
                    }
                }, 0);
            },
        });
        uploadTaskList[callbackId] = obj;
    },
    QGUploadTaskAbort(id) {
        const obj = getObject(id);
        if (!obj) {
            return;
        }
        obj.abort();
    },
    QGUploadTaskOffHeadersReceived(id) {
        const obj = getObject(id);
        if (!obj) {
            return;
        }
        offEventCallback(qgUpdateTaskOnHeadersList, (v) => {
            obj.offHeadersReceived(v);
        }, id);
    },
    QGUploadTaskOffProgressUpdate(id) {
        const obj = getObject(id);
        if (!obj) {
            return;
        }
        offEventCallback(qgUpdateTaskOnProgressList, (v) => {
            obj.offProgressUpdate(v);
        }, id);
    },
    QGUploadTaskOnHeadersReceived(id) {
        const obj = getObject(id);
        if (!obj) {
            return;
        }
        const callback = onEventCallback(qgUpdateTaskOnHeadersList, '_OnHeadersReceivedCallback', id);
        obj.onHeadersReceived(callback);
    },
    QGUploadTaskOnProgressUpdate(id) {
        const obj = getObject(id);
        if (!obj) {
            return;
        }
        const callback = onEventCallback(qgUpdateTaskOnProgressList, '_OnProgressUpdateCallback', id);
        obj.onProgressUpdate(callback);
    },
};
