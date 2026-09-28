import moduleHelper from './module-helper';
import { formatJsonStr, getListObject, uid } from './utils';
const videoList = {};
const getObject = getListObject(videoList, 'video');
export default {
    QGCreateVideo(conf) {
        const id = uid();
        const params = formatJsonStr(conf);
        
        if (params.underGameView) {
            GameGlobal.enableTransparentCanvas = true;
        }
        videoList[id] = qg.createVideo(params);
        return id;
    },
    QGVideoSetProperty(id, key, value) {
        const obj = getObject(id);
        if (!obj) {
            return;
        }
        if (key === 'x' || key === 'y' || key === 'width' || key === 'height') {
            obj[key] = +value;
        }
        else if (key === 'src' || key === 'poster') {
            obj[key] = value;
        }
    },
    QGVideoPlay(id) {
        const obj = getObject(id);
        if (!obj) {
            return;
        }
        obj.play();
    },
    QGVideoAddListener(id, key) {
        const obj = getObject(id);
        if (!obj) {
            return;
        }
        obj[key]((e) => {
            moduleHelper.send('OnVideoCallback', JSON.stringify({
                callbackId: id,
                errMsg: key,
                position: e && e.position,
                buffered: e && e.buffered,
                duration: e && e.duration,
            }));
            if (key === 'onError') {
                GameGlobal.enableTransparentCanvas = false;
                console.error(e);
            }
        });
    },
    QGVideoDestroy(id) {
        const obj = getObject(id);
        if (!obj) {
            return;
        }
        obj.destroy();
        GameGlobal.enableTransparentCanvas = false;
    },
    QGVideoExitFullScreen(id) {
        const obj = getObject(id);
        if (!obj) {
            return;
        }
        obj.exitFullScreen();
    },
    QGVideoPause(id) {
        const obj = getObject(id);
        if (!obj) {
            return;
        }
        obj.pause();
    },
    QGVideoRequestFullScreen(id, direction) {
        const obj = getObject(id);
        if (!obj) {
            return;
        }
        obj.requestFullScreen(direction);
    },
    QGVideoSeek(id, time) {
        const obj = getObject(id);
        if (!obj) {
            return;
        }
        obj.seek(time);
    },
    QGVideoStop(id) {
        const obj = getObject(id);
        if (!obj) {
            return;
        }
        obj.stop();
    },
    QGVideoRemoveListener(id, key) {
        const obj = getObject(id);
        if (!obj) {
            return;
        }
        obj[key]();
    },
};
