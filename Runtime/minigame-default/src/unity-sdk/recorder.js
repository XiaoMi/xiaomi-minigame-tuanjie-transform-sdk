import moduleHelper from './module-helper';
import { formatJsonStr, cacheArrayBuffer, getListObject, uid } from './utils';
const recorderManagerList = {};
const getObject = getListObject(recorderManagerList, 'video');
export default {
    QG_GetRecorderManager() {
        const id = uid();
        recorderManagerList[id] = qg.getRecorderManager();
        return id;
    },
    QG_OnRecorderError(id) {
        const obj = getObject(id);
        if (!obj) {
            return;
        }
        const callback = (res) => {
            const resStr = JSON.stringify({
                callbackId: id,
                res: JSON.stringify(res),
            });
            moduleHelper.send('_OnRecorderErrorCallback', resStr);
        };
        obj.onError(callback);
    },
    QG_OnRecorderFrameRecorded(id) {
        const obj = getObject(id);
        if (!obj) {
            return;
        }
        const callback = (res) => {
            cacheArrayBuffer(id, res.frameBuffer);
            const resStr = JSON.stringify({
                callbackId: id,
                res: JSON.stringify({
                    frameBufferLength: res.frameBuffer.byteLength,
                    isLastFrame: res.isLastFrame,
                }),
            });
            moduleHelper.send('_OnRecorderFrameRecordedCallback', resStr);
        };
        obj.onFrameRecorded(callback);
    },
    QG_OnRecorderInterruptionBegin(id) {
        const obj = getObject(id);
        if (!obj) {
            return;
        }
        const callback = (res) => {
            const resStr = JSON.stringify({
                callbackId: id,
                res: JSON.stringify(res),
            });
            moduleHelper.send('_OnRecorderInterruptionBeginCallback', resStr);
        };
        obj.onInterruptionBegin(callback);
    },
    QG_OnRecorderInterruptionEnd(id) {
        const obj = getObject(id);
        if (!obj) {
            return;
        }
        const callback = (res) => {
            const resStr = JSON.stringify({
                callbackId: id,
                res: JSON.stringify(res),
            });
            moduleHelper.send('_OnRecorderInterruptionEndCallback', resStr);
        };
        obj.onInterruptionEnd(callback);
    },
    QG_OnRecorderPause(id) {
        const obj = getObject(id);
        if (!obj) {
            return;
        }
        const callback = (res) => {
            const resStr = JSON.stringify({
                callbackId: id,
                res: JSON.stringify(res),
            });
            moduleHelper.send('_OnRecorderPauseCallback', resStr);
        };
        obj.onPause(callback);
    },
    QG_OnRecorderResume(id) {
        const obj = getObject(id);
        if (!obj) {
            return;
        }
        const callback = (res) => {
            const resStr = JSON.stringify({
                callbackId: id,
                res: JSON.stringify(res),
            });
            moduleHelper.send('_OnRecorderResumeCallback', resStr);
        };
        obj.onResume(callback);
    },
    QG_OnRecorderStart(id) {
        const obj = getObject(id);
        if (!obj) {
            return;
        }
        const callback = (res) => {
            const resStr = JSON.stringify({
                callbackId: id,
                res: JSON.stringify(res),
            });
            moduleHelper.send('_OnRecorderStartCallback', resStr);
        };
        obj.onStart(callback);
    },
    QG_OnRecorderStop(id) {
        const obj = getObject(id);
        if (!obj) {
            return;
        }
        const callback = (res) => {
            const resStr = JSON.stringify({
                callbackId: id,
                res: JSON.stringify(res),
            });
            moduleHelper.send('_OnRecorderStopCallback', resStr);
        };
        obj.onStop(callback);
    },
    QG_RecorderPause(id) {
        const obj = getObject(id);
        if (!obj) {
            return;
        }
        obj.pause();
    },
    QG_RecorderResume(id) {
        const obj = getObject(id);
        if (!obj) {
            return;
        }
        obj.resume();
    },
    QG_RecorderStart(id, option) {
        const obj = getObject(id);
        if (!obj) {
            return;
        }
        const conf = formatJsonStr(option);
        obj.start(conf);
    },
    QG_RecorderStop(id) {
        const obj = getObject(id);
        if (!obj) {
            return;
        }
        obj.stop();
    },
};
