import moduleHelper from './module-helper';
import { formatJsonStr, getListObject, uid } from './utils';
const gameRecorderList = {};
let qgGameRecorderList;
const getObject = getListObject(gameRecorderList, 'gameRecorder');
export default {
    QG_GetGameRecorder() {
        const id = uid();
        gameRecorderList[id] = qg.getGameRecorder();
        return id;
    },
    QG_GameRecorderOff(id, eventType) {
        const obj = getObject(id);
        if (!obj) {
            return;
        }
        if (!obj || typeof qgGameRecorderList === 'undefined' || typeof qgGameRecorderList[eventType] === 'undefined') {
            return;
        }
        
        for (const key in Object.keys(qgGameRecorderList[eventType])) {
            const callback = qgGameRecorderList[eventType][key];
            if (callback) {
                obj.off(eventType, callback);
            }
        }
        qgGameRecorderList[eventType] = {};
    },
    QG_GameRecorderOn(id, eventType) {
        const obj = getObject(id);
        if (!obj) {
            return;
        }
        if (!qgGameRecorderList) {
            qgGameRecorderList = {
                start: {},
                stop: {},
                pause: {},
                resume: {},
                abort: {},
                timeUpdate: {},
                error: {},
            };
        }
        const callbackId = uid();
        const callback = (res) => {
            let result = '';
            if (res) {
                result = JSON.stringify(res);
            }
            const resStr = JSON.stringify({
                id,
                res: JSON.stringify({
                    eventType,
                    result,
                }),
            });
            moduleHelper.send('_OnGameRecorderCallback', resStr);
        };
        if (qgGameRecorderList[eventType]) {
            qgGameRecorderList[eventType][callbackId] = callback;
            obj.on(eventType, callback);
            return callbackId;
        }
        return '';
    },
    QG_GameRecorderStart(id, option) {
        const obj = getObject(id);
        if (!obj) {
            return;
        }
        const data = formatJsonStr(option);
        obj.start(data);
    },
    QG_GameRecorderAbort(id) {
        const obj = getObject(id);
        if (!obj) {
            return;
        }
        obj.abort();
    },
    QG_GameRecorderPause(id) {
        const obj = getObject(id);
        if (!obj) {
            return;
        }
        obj.pause();
    },
    QG_GameRecorderResume(id) {
        const obj = getObject(id);
        if (!obj) {
            return;
        }
        obj.resume();
    },
    QG_GameRecorderStop(id) {
        const obj = getObject(id);
        if (!obj) {
            return;
        }
        obj.stop();
    },
    QG_OperateGameRecorderVideo(option) {
        if (typeof qg.operateGameRecorderVideo !== 'undefined') {
            const data = formatJsonStr(option);
            data.fail = (res) => {
                console.error(res);
            };
            qg.operateGameRecorderVideo(data);
        }
    },
};
